// Function to retrieve data from URL parameters
function getDataFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var data = urlParams.get('data');
    return JSON.parse(decodeURIComponent(data));
}

// Function to update table with form data
function updateTable() {
    var formData = getDataFromURL();
    var table = document.querySelector(".student-list");
    
    //creating row of table
    var row = table.insertRow(-1);

    //creating cells of row
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    cell1.innerHTML = formData.name;
    cell1.classList.add("table-cell");

    cell2.innerHTML = formData.Id;
    cell2.classList.add("table-cell");

    cell3.innerHTML = formData.class;
    cell3.classList.add("table-cell");

    cell4.innerHTML = formData.email;
    cell4.classList.add("table-cell");

    cell5.innerHTML = formData.contact;
    cell5.classList.add("table-cell");
    
    //creating edit button
    const edit_btn = document.createElement("button");
    edit_btn.innerHTML = '<img src ="icons8-edit-50.png" width="30px">';
    edit_btn.classList.add("edit-del-btn");
    edit_btn.addEventListener("click", function() {
        enableEditing(row);
    });
    cell6.appendChild(edit_btn);
    
    //creating delete button
    const del_btn = document.createElement("button");
    del_btn.innerHTML = '<img src ="icons8-trash-30.png" width="30px">';
    del_btn.classList.add("edit-del-btn");
    del_btn.addEventListener("click", function() {
        deleteRow(row);
    });
    cell7.appendChild(del_btn);

    updateLocalStorage(); // Save to local storage when new data is added
}

// Function to enable editing for a row
function enableEditing(row) {
    for (var i = 0; i < row.cells.length - 2; i++) {
        var cell = row.cells[i];
        var text = cell.innerText;
        var input = document.createElement('input');
        input.value = text;
        cell.innerHTML = '';
        cell.appendChild(input);

        input.addEventListener("keydown", function(event) {
            if (event.keyCode === 13) {   //press enter to save data
                var newText = this.value.trim();
                if (newText !== '') {    //writing if-else condition for not saving empty cell
                    var cell = this.parentNode;
                    cell.innerText = newText;
                    updateLocalStorage();
                } else {
                    alert("Field cannot be empty!");
                }
            }
        });
    }
}

// Function to delete a row
function deleteRow(row) {
    var rowIndex = row.rowIndex;
    row.parentNode.deleteRow(rowIndex);
    updateLocalStorage();
}

// Function to update local storage data
function updateLocalStorage() {
    var table = document.querySelector(".student-list");
    var data = [];
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var formData = {
            name: row.cells[0].innerText,
            Id: row.cells[1].innerText,
            class: row.cells[2].innerText,
            email: row.cells[3].innerText,
            contact: row.cells[4].innerText
        };
        data.push(formData);
    }
    localStorage.setItem("tableData", JSON.stringify(data));
}

// Function to render table from local storage
function renderTableFromStorage() {
    var table = document.querySelector(".student-list");
    var localStorageData = JSON.parse(localStorage.getItem("tableData")) || [];

    localStorageData.forEach(function(formData) {

        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);

        cell1.innerHTML = formData.name;
        cell1.classList.add("table-cell");

        cell2.innerHTML = formData.Id;
        cell2.classList.add("table-cell");

        cell3.innerHTML = formData.class;
        cell3.classList.add("table-cell");

        cell4.innerHTML = formData.email;
        cell4.classList.add("table-cell");

        cell5.innerHTML = formData.contact;
        cell5.classList.add("table-cell");

        const edit_btn = document.createElement("button");
        edit_btn.innerHTML = '<img src ="icons8-edit-50.png" width="30px">';
        edit_btn.classList.add("edit-del-btn");
        edit_btn.addEventListener("click", function() {
            enableEditing(row);
        });
        cell6.appendChild(edit_btn);

        const del_btn = document.createElement("button");
        del_btn.innerHTML = '<img src ="icons8-trash-30.png" width="30px">';
        del_btn.classList.add("edit-del-btn");
        del_btn.addEventListener("click", function() {
            deleteRow(row);
        });
        cell7.appendChild(del_btn);
    });
}

// Call function to render table from local storage when page loads
window.onload = function() {
    renderTableFromStorage();
    updateTable(); // Add initial form data to the table
};
