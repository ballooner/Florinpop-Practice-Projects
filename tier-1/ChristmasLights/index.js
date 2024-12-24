//Light class to hold information for individual lights
class Light {
    #currentIntensity;
    #increasing

    constructor(buttonElement, color = "#FF0000", size = 50, maxIntensity = 25) {
        this.buttonElement = buttonElement;
        this.color = color;
        this.size = size;
        this.maxIntensity = maxIntensity;
        this.currentIntensity = 20;
        this.increasing = true;

        this.buttonElement.addEventListener("click", (e) => {
            updateSelectors(this);
        });
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
        this.buttonElement.style.setProperty("background-color", color);
    }

    getSize() {
        return this.size;
    }

    setSize(size) {
        this.size = size;
        this.buttonElement.style.setProperty("width", size + "px");
        this.buttonElement.style.setProperty("height", size + "px");
    }

    getMaxIntensity() {
        return this.maxIntensity;
    }

    setMaxIntensity(maxIntensity) {
        this.maxIntensity = maxIntensity;
    }

    //Method to slowly increase/decrease the intensity and set box-shadow styling
    changeIntensity() {
        if (this.currentIntensity >= this.maxIntensity) {
            this.increasing = false;
        } else if (this.currentIntensity <= 0) {
            this.increasing = true;
        }
        
        if (this.increasing) {
            this.currentIntensity += this.maxIntensity / interval;
        } else if (!this.increasing) {
            this.currentIntensity -= this.maxIntensity / interval;
        }
        

        this.buttonElement.style.boxShadow = `0px 0px 75px ${this.currentIntensity}px ${this.color}`;
    }
}

//Create the array that holds light objects
//and create objects for already existing light elements in DOM
let lightArray = [];
let currLights = document.querySelectorAll(".light");

for (let i = 0; i < currLights.length; i++) {
    lightArray.push(new Light(currLights[i]));
}

//Row range functionality
let rowRange = document.querySelector("#row-input");
let rowOutput = document.querySelector("#row-value")
let rows = rowRange.value;

rowOutput.textContent = rowRange.value;
rowRange.addEventListener("input", (e) => {
    rows = Number(e.target.value);
    rowOutput.textContent = rows;
    changeRows();
});

//Interval range functionality
let intervalRange = document.querySelector("#interval-input");
let intervalOutput = document.querySelector("#interval-value")
let interval = intervalRange.value;

intervalOutput.textContent = interval;
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

//Functions to create/delete rows of lights
function createRow() {
    let newRow = document.createElement("div");
    newRow.className = "row"

    for (let i = 0; i < 5; i++) {
        let newLight = document.createElement("button");
        newLight.className = "light";
        newRow.appendChild(newLight);
        lightArray.push(new Light(newLight));
    }

    document.querySelector("#christmas-lights").appendChild(newRow);
}

function deleteRow() {
    let rowArray = document.querySelectorAll(".row");
    rowArray[rowArray.length - 1].remove();

    for (let i = 0; i < 5; i++) {
        lightArray.pop();
    }
}

//Timer for increase/decrease of lights
function changeBrightness() {
    for (let i = 0; i < lightArray.length; i++) {
        lightArray[i].changeIntensity();
    }
}

let timer = window.setInterval(changeBrightness, interval * 100);

//Functionality for start/stop button
let toggleButton = document.querySelector("#start-stop");

toggleButton.addEventListener("click", (e) => {
    if (timer != null) {
        clearInterval(timer);
        timer = null;
    } else {
        timer = window.setInterval(changeBrightness, interval * 100);
    }
});

/* Customize specific lights */
let currentLight = null;

let colorSelector = document.querySelector("#color-input");

colorSelector.addEventListener("input", (e) => {
    if (currentLight !== null) {
        currentLight.setColor(e.target.value);
    }
});

let intensitySelector = document.querySelector("#intensity-input");
let intensityOutput = document.querySelector("#intensity-value");

intensitySelector.addEventListener("input", (e) => {
    intensityOutput.value = e.target.value;

    if (currentLight != null) {
        currentLight.setMaxIntensity(e.target.value);
    }
});

let sizeSelector = document.querySelector("#size-input");
let sizeOutput = document.querySelector("#size-value");

sizeSelector.addEventListener("input", (e) => {
    sizeOutput.value = e.target.value;

    if (currentLight != null) {
        currentLight.setSize(e.target.value);
    }
});

//Function to update selectors
function updateSelectors(lightObject) {
    currentLight = lightObject;

    colorSelector.value = lightObject.getColor();

    intensitySelector.value = lightObject.getMaxIntensity();
    intensityOutput.value = lightObject.getMaxIntensity();

    sizeSelector.value = lightObject.getSize();
    sizeOutput.value = lightObject.getSize();
}

