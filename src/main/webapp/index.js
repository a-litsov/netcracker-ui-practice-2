var allNumbersTitle = "True for all real numbers";
var noRootsTitle = "There are no solutions in real numbers";
var precision = 2;

// call it also before ajax query!
function checkInput() {
    var isValid = true;
    forEachCoefField(function(field) {
        isValid = isValid && field.validity.valid;
    });
    document.getElementById("find-btn").disabled = !isValid;
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
    Array.from(rootLabels).forEach(function(r) {
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
    if (status === "ALL_REAL_NUMBERS") {
        addRootLabel(rootsPanel, allNumbersTitle);
    } else {
        if (status === "NO_ROOTS_IN_REAL_NUMBERS") {
            addRootLabel(rootsPanel, noRootsTitle);
        } else {
            for (i = 0; i < solution.roots.length; i++) {
                addRootLabel(rootsPanel, solution.roots[i]);
            }
        }
    }
}

function removeHistTableRow(row) {
    var table = row.parentNode;
    table.removeChild(row);
}

function addHistTableRow(table, solution) {
    var row = table.insertRow(1);
    var cell;
    forEachCoefField(function(field) {
        cell = row.insertCell(-1);
        cell.innerHTML = parseFloat(field.value).toFixed(precision);
    });

    if (solution.status !== "TWO_ROOTS") {
        cell = row.insertCell(-1);
        cell.colSpan = 2;
        switch (solution.status) {
            case "ALL_REAL_NUMBERS":
                cell.innerHTML = "True for all real numbers";
                break;
            case "NO_ROOTS_IN_REAL_NUMBERS":
                cell.innerHTML = "There are no solutions in real numbers";
                break;
            case "SINGLE_ROOT":
                cell.innerHTML = solution.roots[0].toPrecision(precision);
                break;
        }
    } else {
        for (i = 0; i < 2; i++) {
            cell = row.insertCell(-1);
            cell.innerHTML = solution.roots[i].toPrecision(precision);
        }
    }

    row.onclick = function() {
        if (table.rows.length === 2) {
            hideHistTableDiv();
        }
        removeHistTableRow(row);
    };
}

function getCoeffs() {
    var coeffs = {};
    forEachCoefField(function(field) {
        coeffs[field.id.charAt(0)] = parseFloat(field.value).toFixed(precision);
    });
    return coeffs;
}

function forEachCoefField(action) {
    var fields = document.getElementsByClassName("coef");
    Array.from(fields).forEach(action);
}


function findRoots() {
    var historyTable = document.getElementById("history-table");
    var rootsPanel = document.getElementById("current-roots-panel");

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var url = window.location.href + "/quadratic-equations-solver";
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status === 200) {
            var solution =  JSON.parse(xhr.responseText);

            remakeRootsPanel(rootsPanel, solution);
            showRootsPanel(rootsPanel);

            addHistTableRow(historyTable, solution);
            showHistTableDiv();
        }
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("coeffs=" + JSON.stringify(getCoeffs()));
}
