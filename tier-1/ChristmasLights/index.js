//Declare row element variables and make HTML output row range values
let rowRange = document.querySelector("#row-input");
let rowOutput = document.querySelector("#row-value")
let rows = rowRange.value;

rowOutput.textContent = rowRange.value;
rowRange.addEventListener("input", (e) => {
    rows = Number(e.target.value);
    rowOutput.textContent = rows;
    changeRows();
});

//Declare interval element variables and make HTML output interval range values
let intervalRange = document.querySelector("#interval-input");
let intervalOutput = document.querySelector("#interval-value")
let interval = intervalRange.value;

intervalOutput.textContent = intervalRange.value;
intervalRange.addEventListener("input", (e) => {
    interval = Number(e.target.value);
    intervalOutput.textContent = interval;
});

function changeRows() {
    let currentRowAmount = document.querySelectorAll(".row").length;
    let difference = rows - currentRowAmount

    //If the row interval is greater than amount of rows: add rows
    if (difference > 0) {
        for (let i = 0; i < difference; i++) {
            createRow();
        }
    } else { //If the row interval is less than amount of rows: delete rows
        for (let i = 0; i < difference * -1; i++) {
            deleteRow();
        }
    }
}

//Create a new row and add it to the DOM
function createRow() {
    let newRow = document.createElement("div");
    newRow.className = "row"

    for (let i = 0; i < 5; i++) {
        let newLight = document.createElement("button");
        newLight.className = "light";
        newRow.appendChild(newLight);
    }

    document.querySelector("#christmas-lights").appendChild(newRow);
}

//Delete a row from the DOM
function deleteRow() {
    let rowArray = document.querySelectorAll(".row");
    rowArray[rowArray.length - 1].remove();
}