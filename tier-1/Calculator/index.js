//Get HTML elements into variables
let display = document.querySelector("#display-text");
let buttons = document.querySelectorAll(".row button");

let memoryStack = [];

//Verify display text isn't longer than 8 numbers
function verifyDisplay() {
    if (display.textContent.length >= 8) {
        return false;
    }

    return true;
}

function evaluateStack() {
    let firstNum = Number(memoryStack[0]);
    let operation = memoryStack[1];
    let secondNum = Number(memoryStack[2]);
    let finalVal = 0;

    if (operation === "%") {
        finalVal = firstNum % secondNum;
    } else if (operation === "/") {
        finalVal = firstNum / secondNum;
    } else if (operation === "x") {
        finalVal = firstNum * secondNum;
    } else if (operation === "-") {
        finalVal = firstNum - secondNum;
    } else if (operation === "+") {
        finalVal = firstNum + secondNum;
    }

    
    display.textContent = finalVal;
    memoryStack = [];
}

//Handler for number buttons
function numberHandler(e) {
    let buttonText = e.target.textContent;
    
    if (verifyDisplay() === false) {
        return;
    }

    if (buttonText === "+/-" && display.textContent !== "0" && display.textContent !== "") {
        display.textContent *= -1;
        return;
    }

    if (display.textContent === "0") {
        display.textContent = buttonText;
    } else {
        display.textContent += buttonText;
    }
}

//Handler for math operations
function mathOperationHandler(e) {
    let buttonText = e.target.textContent;
    let displayText = display.textContent;

    if (memoryStack.length === 0 && buttonText !== "=") {
        memoryStack.push(displayText);
        memoryStack.push(buttonText);
        display.textContent = "";
        console.log(memoryStack.length);
    } else if (memoryStack.length === 2 && buttonText === "=") {
        memoryStack.push(displayText);
        evaluateStack();
    } else if (memoryStack.length === 2) {
        memoryStack.push(displayText);
        evaluateStack();
        memoryStack.push(display.textContent);
        memoryStack.push(buttonText);
        display.textContent = "";
    }
}

function memoryOperationHandler(e) {
    let buttonText = e.target.textContent;
    let displayText = display.textContent;
    
    if (buttonText === "C" && displayText === "" && memoryStack.length === 2) {
        display.textContent = memoryStack[0];
        memoryStack = [];
    } else if (buttonText === "C") {
        display.textContent = "";
    } else if (buttonText === "AC") {
        display.textContent = "0";
        memoryStack = [];
    }
}

for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent.match(/[1-9]|\+\/-/) !== null) {
        buttons[i].addEventListener("click", numberHandler);
    } else if (buttons[i].textContent.match(/[%/x\-+=]/) !== null) {
        buttons[i].addEventListener("click", mathOperationHandler);
    } else if (buttons[i].textContent.match(/AC|C/) !== null) {
        buttons[i].addEventListener("click", memoryOperationHandler);
    }
}