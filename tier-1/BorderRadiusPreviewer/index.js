const displayBox = document.querySelector("#display-box");
const elements = Array.from(document.querySelectorAll(".controller"));
const copyButton = document.querySelector("#copy-button");

//Turn the input's into a string
function parseElements(controllerArray) {
    let borderString = "";

    for (let i = 0; i < controllerArray.length; i++) {
        borderString += controllerArray[i].value + "% ";
    }

    return borderString;
}

//Change the style of the box
function controllerHandler(e) {
    displayBox.style.borderRadius = parseElements(elements);
    console.log("ran");
}

function copyCSS(e) {
    navigator.clipboard.writeText("border-radius: " + parseElements(elements));
}

//Add events to the inputs
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("input", controllerHandler);
}

copyButton.addEventListener("click", copyCSS);