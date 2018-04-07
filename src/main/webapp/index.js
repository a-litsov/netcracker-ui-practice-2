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

function remakeRootsPanel(rootsPanel, roots) {
    removeRootLabels(rootsPanel);
    for (var i = 0; i < roots.length; i++) {
        addRootLabel(rootsPanel, roots[i]);
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

function addRow(table, coeffs, roots) {
    var row = table.insertRow(1);
    for (var i = 0; i < coeffs.length; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = coeffs[i];
    }
    // cell.colSpan = 2;
    for (i = 0; i < roots.length; i++) {
        cell = row.insertCell(3 + i);
        cell.innerHTML = roots[i];
    }

    row.onclick = function() {
        if (table.rows.length == 2) {
            hideTable();
        }
        removeRow(row);
    };
}

function findRoots() {
    // send ajax request
    var roots = [1.0625, 2.2378];

    var rootsPanel = document.getElementById("current-roots-panel");
    remakeRootsPanel(rootsPanel, roots);
    showRootsPanel(rootsPanel);

    var coeffs = getCoeffs();
    var table = document.getElementById("history-table");
    addRow(table, coeffs, roots);

    showTable();
}
