function removeRow(row) {
    var table = row.parentNode;
    table.removeChild(row);
}

function showRootsPanel() {
    var rootsPanel = document.getElementById("current-roots-panel");
    rootsPanel.style.display = "block";
}

function showTablePanel() {
    var tablePanel = document.getElementById("history-table-div");
    tablePanel.style.display = "block";
}

function hideTablePanel() {
    var tablePanel = document.getElementById("history-table-div");
    tablePanel.style.display = "none";
}

function removeRootLabels(rootsPanel) {
    var rootLabels = rootsPanel.getElementsByClassName("root");
    Array.from(rootLabels).forEach(function(r) {
        rootsPanel.removeChild(r);
    });
}

function findRoots() {
    // send ajax request
    var a = 1, b = 2, c = 3;
    var root1 = 1.0625;
    var root2 = 2.2378;

    var rootsPanel = document.getElementById("current-roots-panel");
    removeRootLabels(rootsPanel);
    var rootLabel = document.createElement("span");
    rootLabel.className = "root";
    rootLabel.innerHTML = root1;//'True for all real numbers';//'There are no solutions in real numbers';
    rootsPanel.appendChild(rootLabel);

    rootLabel = document.createElement("span");
    rootLabel.className = "root";
    rootLabel.innerHTML = root2;
    rootsPanel.appendChild(rootLabel);
    showRootsPanel();

    var table = document.getElementById("history-table");
    var row = document.createElement("tr");
    var cell = row.insertCell(0);
    cell.innerHTML = a;
    cell = row.insertCell(1);
    cell.innerHTML = b;
    cell = row.insertCell(2);
    cell.innerHTML = c;
    cell = row.insertCell(3);
    // cell.colSpan = 2;
    cell.innerHTML = root1;
    cell = row.insertCell(4);
    cell.innerHTML = root2;
    row.onclick = function() {
        if (table.rows.length == 2) {
            hideTablePanel();
            console.log(2);
        }
        console.log("not two");
        removeRow(row);
    };
    table.appendChild(row);
    showTablePanel();
}

