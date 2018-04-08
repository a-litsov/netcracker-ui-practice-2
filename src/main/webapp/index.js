const HAS_ROOTS_CASE = "HAS_ROOTS";
const SPECIAL_ROOTS_CASES = Object.freeze({
    "ALL_REAL_NUMBERS": "True for all real numbers",
    "NO_ROOTS_IN_REAL_NUMBERS": "There are no solutions in real numbers"
});
const PRECISIONS = Object.freeze({
    "coeff": 2,
    "root": 4
});

function checkInput() {
    var isValid = true;
    forEachCoefField(function (field) {
        isValid = isValid && field.validity.valid;
    });
    document.getElementById("find-btn").disabled = !isValid;
    return isValid;
}

function showRootsPanel(rootsPanel) {
    rootsPanel.style.display = "block";
}

function showHistTableDiv() {
    var tablePanel = document.getElementById("history-table-div");
    tablePanel.style.display = "block";
}

function hideHistTableDiv() {
    var tablePanel = document.getElementById("history-table-div");
    tablePanel.style.display = "none";
}

function removeRootLabels(rootsPanel) {
    var rootLabels = rootsPanel.getElementsByClassName("root");
    Array.from(rootLabels).forEach(function (r) {
        rootsPanel.removeChild(r);
    });
}

function addRootLabel(rootsPanel, root) {
    var rootLabel = document.createElement("span");
    rootLabel.className = "root";
    rootLabel.innerHTML = root;
    rootsPanel.appendChild(rootLabel);
}

function remakeRootsPanel(rootsPanel, solution) {
    removeRootLabels(rootsPanel);
    var status = solution.status;
    if (status === HAS_ROOTS_CASE) {
        for (i = 0; i < solution.roots.length; i++) {
            addRootLabel(rootsPanel, solution.roots[i]);
        }
    } else {
        addRootLabel(rootsPanel, SPECIAL_ROOTS_CASES[status]);
    }
}

function removeHistTableRow(row) {
    var table = row.parentNode;
    table.removeChild(row);
}

function addHistTableRow(table, solution) {
    var row = table.insertRow(1);
    var columnsCount = table.rows[0].cells.length;
    var coeffsCount = 0;
    var cell;

    forEachCoefField(function (field) {
        cell = row.insertCell(-1);
        cell.innerHTML = parseFloat(field.value).toFixed(PRECISIONS["coeff"]);
        coeffsCount++;
    });

    if (solution.status === HAS_ROOTS_CASE) {
        var colSpan = (columnsCount - coeffsCount) / solution.roots.length;
        for (var i = 0; i < solution.roots.length; i++) {
            cell = row.insertCell(-1);
            cell.innerHTML = solution.roots[i].toFixed(PRECISIONS["root"]);
            cell.colSpan = (i === 0) ? Math.ceil(colSpan) : Math.floor(colSpan);
        }
    } else {
        cell = row.insertCell(-1);
        cell.colSpan = columnsCount - coeffsCount;
        cell.innerHTML = SPECIAL_ROOTS_CASES[solution.status];
        cell.style.textAlign = "center";
    }

    row.onclick = function () {
        if (table.rows.length === 2) {
            hideHistTableDiv();
        }
        removeHistTableRow(row);
    };
}

function getCoeffsAsObj() {
    var coeffs = {};
    forEachCoefField(function (field) {
        coeffs[field.id.charAt(0)] = parseFloat(field.value);
    });
    return coeffs;
}

function forEachCoefField(action) {
    var fields = document.getElementsByClassName("coeff");
    Array.from(fields).forEach(action);
}


function findRoots() {
    if (!checkInput()) {
        return;
    }
    var historyTable = document.getElementById("history-table");
    var rootsPanel = document.getElementById("current-roots-panel");

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var url = window.location.href + "/quadratic-equations-solver";
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status === 200) {
            var solution = JSON.parse(xhr.responseText);

            remakeRootsPanel(rootsPanel, solution);
            showRootsPanel(rootsPanel);

            addHistTableRow(historyTable, solution);
            showHistTableDiv();
        }
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("coeffs=" + JSON.stringify(getCoeffsAsObj()));
}
