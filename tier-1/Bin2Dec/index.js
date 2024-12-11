//Assigning elements to variables
const inputBox = document.querySelector("#input");
const outputBox = document.querySelector("#output");
const clearButton = document.querySelector("#clearButton");
const convertButton = document.querySelector("#convertButton");
const errorTag = document.querySelector("#errorTag");

//Input validation
inputBox.addEventListener("input", validateData);

function validateData(e) {
    inputData = e.target.value;

    if (inputData.match(/[^10]/g) !== null && inputData.match(/[^10]/g).length > 0) {
        errorTag.style.visibility = "visible";
        convertButton.disabled = true;
    } else {
        errorTag.style.visibility = "hidden";
        convertButton.disabled = false;
    }
}

//Adding button events
clearButton.addEventListener("click", clearForms);
convertButton.addEventListener("click", convertText);

function clearForms(e) {
    inputBox.parentElement.reset();
    outputBox.parentElement.reset();
    errorTag.style.visibility = "hidden";
}

function convertText(e) {
    inputText = inputBox.value;
    num = 0;

    for (let i = inputText.length - 1; i > -1; i--) {
        num += inputText.charAt(i) * (2 ** (inputText.length - (i + 1)));
    }

    outputBox.value = num;
}