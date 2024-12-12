const displayBox = document.querySelector("#display-box");
const elements = Array.from(document.querySelectorAll(".controller"));

function parseElements(controllerArray) {
    let borderString = "";

    for (let i = 0; i < controllerArray.length; i++) {
        borderString += controllerArray[i].value + "% ";
    }

    return borderString;
}

function controllerHandler(e) {
    displayBox.style.borderRadius = parseElements(elements);
    console.log("ran");
}

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("input", controllerHandler);
}