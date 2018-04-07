// call it also before ajax query!
function checkInput() {
    var isValid = true;
    var fields = document.getElementsByClassName("coef");
    Array.from(fields).forEach(function(field) {
        isValid = isValid && field.validity.valid;
    });

    document.getElementById("find-btn").disabled = !isValid;
    return isValid
}

function showRootsPanel(rootsPanel) {
    rootsPanel.style.display = "block";
}

function showTable() {
    var tablePanel = document.getElementById("history-table-div");
    tablePanel.style.display = "block";
}

function hideTable() {
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
    rootLabel.innerHTML = root;//'True for all real numbers';//'There are no solutions in real numbers';
    rootsPanel.appendChild(rootLabel);
}

function remakeRootsPanel(rootsPanel, solution) {
    removeRootLabels(rootsPanel);
    var status = solution.status;
    if (status == "ALL_REAL_NUMBERS") {
        addRootLabel(rootsPanel, "True for all real numbers");
    } else {
        if (status == "NO_ROOTS_IN_REAL_NUMBERS") {
            addRootLabel(rootsPanel, "There are no solutions in real numbers");
        } else {
            for (i = 0; i < solution.roots.length; i++) {
                addRootLabel(rootsPanel, solution.roots[i]);
            }
        }
    }
}

function getCoeffs() {
    var coeffs = [];
    var fields = document.getElementsByClassName("coef");
    Array.from(fields).forEach(function(c) {
        coeffs.push(parseFloat(c.value));
    });
    return coeffs;
}

function removeRow(row) {
    var table = row.parentNode;
    table.removeChild(row);
}

function addRow(table, coeffs, solution) {
    var row = table.insertRow(1);
    for (var i = 0; i < coeffs.length; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = coeffs[i];
    }
    // cell.colSpan = 2;
    var status = solution.status;
    if (status == "ALL_REAL_NUMBERS") {
        cell = row.insertCell(3);
        cell.innerHTML = "True for all real numbers";
        cell.colSpan = 2;
    } else {
        if (status == "NO_ROOTS_IN_REAL_NUMBERS") {
            cell = row.insertCell(3);
            cell.innerHTML = "There are no solutions in real numbers";
            cell.colSpan = 2;
        } else {
            var colspan = 1;
            if (solution.roots.length == 1) {
                colspan = 2;
            }
            for (i = 0; i < solution.roots.length; i++) {
                cell = row.insertCell(3 + i);
                cell.innerHTML = solution.roots[i];
                cell.colSpan = colspan;
            }
        }
    }

    row.onclick = function() {
        if (table.rows.length == 2) {
            hideTable();
        }
        removeRow(row);
    };
}

function getCoeffsObj() {
    var obj = {};
    var fields = document.getElementsByClassName("coef");
    obj.a = fields[0].value;
    obj.b = fields[1].value;
    obj.c = fields[2].value;
    return obj;
}


function findRoots() {
    // send ajax request
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var params = JSON.stringify(getCoeffsObj());
    console.log(params);
    var url = "http://localhost:8080/ui-practice-2/quadratic-equations-solver";
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) {
            var solution =  JSON.parse(xhr.responseText);//[1.0625, 2.2378];

            var rootsPanel = document.getElementById("current-roots-panel");
            remakeRootsPanel(rootsPanel, solution);
            showRootsPanel(rootsPanel);

            var coeffs = getCoeffs();
            var table = document.getElementById("history-table");
            addRow(table, coeffs, solution);

            showTable();
        }
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("coeffs=" + params);
}
