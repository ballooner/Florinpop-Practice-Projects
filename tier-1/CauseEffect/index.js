const people = [
    {name: "John Doe", street: "Apple Street", city: "Midland", state: "Michigan", country: "United States", telephone: "(989)123-4567", birthday: "2/05/2004"},
    {name: "Rebecca Smith", street: "Rogue Street", city: "Houston", state: "Texas", country: "United States", telephone: "(239)345-4877", birthday: "3/02/2001"},
    {name: "Jacob Schmidt", street: "Pine Road", city: "Midland", state: "Texas", country: "United States", telephone: "(549)126-4234", birthday: "1/18/1993"}
]

let peopleList = document.querySelector("#people-list");

//Clear the list
function clearList() {
    while (peopleList.firstChild) {
        peopleList.removeChild(peopleList.lastChild);
    }
}

//Add everyone from the people array to the list
function createList() {
    clearList();

    for (let i = 0; i < people.length; i++) {
        let newEntry = document.createElement("li");
        newEntry.classList.add("list-item");
        let newButton = document.createElement("button");
        newButton.classList.add("person");
        newButton.textContent = people[i].name;
        newButton.addEventListener("click", activateButton);

        newEntry.appendChild(newButton);
        peopleList.appendChild(newEntry);
    }
}

//Create the list
createList();

//Function to change the information according to what button was pressed
function activateButton(e) {
    let personName = e.target.textContent;
    let personObject = null;

    //Get person
    for (let i = 0; i < people.length; i++) {
        if (people[i].name === personName) {
            personObject = people[i];
            break;
        }
    }

    //Change the name labels
    let nameLabels = document.querySelectorAll(".name");

    for (let i = 0; i < nameLabels.length; i++) {
        nameLabels[i].textContent = personName;
    }

    //Change information labels
    let addressLabel = document.querySelector("#address");
    let phoneNumberLabel = document.querySelector("#phone-number");
    let birthdayLabel = document.querySelector("#birthday");

    addressLabel.textContent = `${personObject.street}, ${personObject.city}, ${personObject.state}, ${personObject.country}`;
    phoneNumberLabel.textContent = personObject.telephone;
    birthdayLabel.textContent = personObject.birthday;

    //Remove other active stlying if there is one
    if (document.querySelector(".active") !== null) {
        document.querySelector(".active").classList.remove("active");
    }

    //Change button to active
    e.target.classList.add("active");
}