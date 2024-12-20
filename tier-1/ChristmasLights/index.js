//Light class to hold information for individual lights
class Light {
    #currentIntensity = 0;

    constructor(buttonElement, color = "red", size = 50, maxIntensity = 25) {
        this.buttonElement = buttonElement;
        this.color = color;
        this.size = size;
        this.maxIntensity = maxIntensity;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
    }

    getMaxIntensity() {
        return this.maxIntensity;
    }

    setMaxIntensity(maxIntensity) {
        this.maxIntensity = maxIntensity;
    }

    //Method to slowly increase the intensity and set box-shadow styling
    increaseIntensity() {
        currentIntensity += maxIntensity / interval;
        this.buttonElement.style.setProperty("box-shadow", "0px 0px 75px " + currentIntensity);
    }
}

//Create the array that holds light classes
//and create classes for already existing light elements in DOM
let lightArray = [];
let currLights = document.querySelectorAll(".light");

for (let i = 0; i < currLights.length; i++) {
    lightArray.push(new Light(currLights[i]));
}

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
        lightArray.push(newLight);
    }

    document.querySelector("#christmas-lights").appendChild(newRow);
}

//Delete a row from the DOM
function deleteRow() {
    let rowArray = document.querySelectorAll(".row");
    rowArray[rowArray.length - 1].remove();

    for (let i = 0; i < 5; i++) {
        lightArray.pop();
    }
}
