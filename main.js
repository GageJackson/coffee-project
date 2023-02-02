/*
updateCoffeeTilesInnerHtml
Function: Replaces coffee tiles html with updated information
    -Sorts filtered coffees by their ID
    -Runs through each coffee in the filtered coffee array
    -If the coffee tile isTileFrontFacing, generates an html string for that side.
    -Assigns gathered html into the coffee tiles html
 */
function updateCoffeeTilesInnerHtml(){
    let html = '';
    sortFilteredCoffeesNumerically();
    filteredCoffees.forEach(coffee => {
        if(coffee.isTileFrontFacing){
            html += composeCoffeeTileFrontHtml(coffee);
        } else {
            html += composeCoffeeTileBackHtml(coffee);
        }
    })
    coffeeTilesHtml.innerHTML = html;
}
/*
flipCoffeeTile
Parameter: click event from the "button-coffee-more-info-front/back" button
Function: Runs through each coffee in the filtered coffee array
    -Checks for the button clicked within that array
    -If the coffee tile isTileFrontFacing, flips it to other side.
    -Calls function to update the coffee tiles inner html
    -Calls function to update the coffee tiles' button
 */
function flipCoffeeTile(e){
    //console.log(e.target.id);
    filteredCoffees.forEach(coffee => {
        if(coffee.buttons[0] === e.target.id){
            coffee.isTileFrontFacing = false;
        }else{
            coffee.isTileFrontFacing = true;
        }
    })
    updateCoffeeTilesInnerHtml();
    updateInfoButtons();
}
/*
composeCoffeeTileFrontHtml
Parameter: Takes in a coffee object from the filtered coffees array
Function: Composes the html required for the front side of 1 coffee tile
Returns: The composed html string for the front side of a coffee tile
 */
function composeCoffeeTileFrontHtml(coffee) {
    let html = '<div class="coffee-tile-front coffee-tile">'
    html += '<section class="coffee-tile-head">'
    html += '<p class="coffee-label-head">' + coffee.id + '</p>';
    html += '<p class="coffee-name">' + formatStrings(coffee.name) + '</p>';
    html += '<p class="coffee-label-head">' + formatStrings(coffee.country) + '</p>';html += '</ul>'
    html += '</section>'

    html += '<section class="coffee-tile-body">'
    html += '<div>';
    html += '<p class="coffee-label-body"> ROAST PROFILE </p>';
    html += '<p class="coffee-properties-body">' + formatStrings(coffee.roastProfile) + '</p>';
    html += '</div>'
    html += '<div>';
    html += '<p class="coffee-label-body"> FLAVOR NOTES </p>';
    html += '<ul>'
    html += '<li class="coffee-properties-body">' + formatStrings(coffee.flavorNotes[0]) + '</li>';
    html += '<li class="coffee-properties-body">' + formatStrings(coffee.flavorNotes[1]) + '</li>';
    html += '<li class="coffee-properties-body">' + formatStrings(coffee.flavorNotes[2]) + '</li>';
    html += '<li class="coffee-properties-body">' + formatStrings(coffee.flavorNotes[3]) + '</li>';
    html += '</ul>';
    html += '</div>';
    html += '<button id=' + coffee.buttons[0] + ' class="button-coffee-more-info-front">More Info</button>';
    html += '</section>';

    html += '</div>';
    return html;
}
/*
composeCoffeeTileBackHtml
Parameter: Takes in a coffee object from the filtered coffees array
Function: Composes the html required for the back side of 1 coffee tile
Returns: The composed html string for the back side of a coffee tile
 */
function composeCoffeeTileBackHtml(coffee){
    let html = '<div class="coffee-tile-back coffee-tile">';
    html += '<section class="coffee-tile-back-info">'
    html += '<p class="coffee-label-body"> REGION </p>';
    html += '<p class="coffee-properties-body">' + formatStrings(coffee.region) + '</p>';
    html += '<p class="coffee-label-body"> PRODUCER </p>';
    html += '<p class="coffee-properties-body">' + formatStrings(coffee.producer) + '</p>';
    html += '<p class="coffee-label-body"> PROCESS </p>';
    html += '<p class="coffee-properties-body">' + formatStrings(coffee.process) + '</p>';
    html += '<p class="coffee-label-body"> VARIETAL </p>';
    html += '<p class="coffee-properties-body">' + formatStrings(coffee.variety) + '</p>';
    html += '<p class="coffee-label-body"> ELEVATION </p>';
    html += '<p class="coffee-properties-body">' + formatStrings(coffee.elevation) + '</p>';
    html += '</section>'
    html += '<button id=' + coffee.buttons[1] + ' class="button-coffee-more-info-back">Other Side</button>';
    html += '</div>';
    return html;
}
/*
formatStrings
Parameter: Takes in a string
Function: Runs through every word in a string and capitalizes the first letter and makes the rest lowercase
    - if the oldString is a char or less, returns "No input" to handle empty strings
    - otherwise it breaks up every word, splits it into an array
    -runs through every string in the new array and changes the string to desired format
    -pushes those strings into a new array
    -joins the array together to make a new string
Returns: A newly formatted string
 */
function formatStrings(oldString){
    let newString = "";
    let newStringArray = [];
    let oldStringArray = [];
    if (oldString.length <= 1){
        return "No Input";
    } else {
        oldStringArray = oldString.split(" ");
        oldStringArray.forEach(word => {
            let fixedString = word[0].toUpperCase() + word.substring(1).toLowerCase();
            newStringArray.push(fixedString);
        })
        newString = newStringArray.join(" ");
        return newString;
    }
}
/*
updateSelectors
Function: Runs the function to create all the selectors used in side-bar
 */
function updateSelectors(){
    createSelectorHtml(flavorNotesInSelector, flavorNoteSelection, "Flavor Note", true);
    createSelectorHtml(roastProfilesInSelector, roastProfileSelection, "Roast Profile", false);
    createSelectorHtml(roastProfilesInSelector, addToRoastProfileSelection, "Roast Profile", false);
    createSelectorHtml(coffeeOriginsInSelector, coffeeOriginSelection, "Origin", true);
    createSelectorHtml(allAddableCountriesInSelector, addToCoffeeOriginSelection, "Origin", true);
}
/*
createSelectorHtml
Parameters: Arguments for each individual selector in the side-bar
    -Takes in the selector's array
    -Takes in the variable that stores the selectors' html string
    -Takes in a string to be used to add the default selected option for the selector
    -Takes in a boolean to decide if the array for the selector should be sorted
Function: Creates the html string for the selector
    - if the selector needs to be sorted, sorts the array in alphabetical order using filter function
    - first part of string is to add the default selected option
    -runs through every option in its array and adds it to its html
 */
function createSelectorHtml(selectorArray, selectorHTML, selectedSelector, sortSelectorArray){
    if(sortSelectorArray){
        selectorArray = selectorArray.filter((item, index)=>selectorArray.indexOf(item)===index);
        selectorArray.sort();
    }
    selectorHTML.innerHTML = '';
    selectorHTML.innerHTML = '<option selected>' + selectedSelector + '</option>';
    selectorArray.forEach(function (option) {
        let html = '<option>' + option + '</option>';
        selectorHTML.innerHTML += html;
    })
}

/*
searchCoffeeTiles
Function: Searches all coffee properties and returns a matching coffee tile if user search matches 1 or more words
    - Runs through every coffee object in the coffeeOfferings array
        -breaks the users search into separate words into an array userSearchInput
        -loops through every property in the coffee object and compares userSearchInput to every word in the coffee object
        -then uses filter function to determine matching strings in the arrays
        -the 2 arrays are combined into strings and compared to each other, if equal, will add coffee tile to filtered coffees
    -updates the coffee tiles html and their more info buttons

 */
function searchCoffeeTiles(){
    filteredCoffees = []
    let numberOfCoffeeProperties = 12;
    coffeeOfferings.forEach(coffee => {
        let userSearchInput = searchedCoffeeWord.value.toLowerCase().split(" ");
        for(let i = 1; i < numberOfCoffeeProperties; i++){
            let databaseSearchComparison = cycleThroughCoffeeProperties(coffee, i);
            let userSearchMatches = databaseSearchComparison.filter(property =>{
                return userSearchInput.indexOf(property) !== -1;
            })
            if(userSearchMatches.join(" ") === userSearchInput.join(" ")){
                filteredCoffees.push(coffee);
            } else {
            }
        }
        updateCoffeeTilesInnerHtml();
    })
    updateInfoButtons();
}
function cycleThroughCoffeeProperties(coffee, number){
    switch(number){
        case 1:
            return coffee.id.toLowerCase().split(" ");
        case 2:
            return coffee.name.toLowerCase().split(" ");
        case 3:
            return coffee.country.toLowerCase().split(" ");
        case 4:
            return coffee.region.toLowerCase().split(" ");
        case 5:
            return coffee.producer.toLowerCase().split(" ");
        case 6:
            return coffee.roastProfile.toLowerCase().split(" ");
        case 7:
            return coffee.process.toLowerCase().split(" ");
        case 8:
            return coffee.variety.toLowerCase().split(" ");
        case 9:
            return coffee.elevation.toLowerCase().split(" ");
        case 10:
            let lowercaseArray = [];
            for(let i = 0; i < coffee.flavorNotes.length; i++){
                lowercaseArray.push(coffee.flavorNotes[i].toLowerCase());
            }
            return lowercaseArray;
        case 11:
            return coffee.id.toLowerCase().split(" ");
        case 12:
            return coffee.id.toLowerCase().split(" ");
        default:
    }
}

/*
//////////////////////////////////////////////////////////////////////////////////////
This section adds a new coffee object to the coffee offering array using search bar
//////////////////////////////////////////////////////////////////////////////////////
 */
function addNewCoffee(){
    let newCoffee ={id:"", name:"", country:"", roastProfile:"", flavorNotes:[], variety:"", elevation: "", process:"", buttons: [], isTileFrontFacing: true};

    let newCoffeeName = document.getElementById("input-add-coffee").value;
    let newCoffeeProducer = document.getElementById("input-add-coffee-producer").value;
    let newCoffeeCountry = document.getElementById("selector-add-coffee-origin").value;
    let newCoffeeRoast = document.getElementById("selector-add-coffee-roast-profile").value;
    let newCoffeeRegion = document.getElementById("input-add-coffee-region").value;
    let newCoffeeFlavorsString = document.getElementById("input-add-coffee-flavor-notes").value;
    let newCoffeeVarietal = document.getElementById("input-add-coffee-varietal").value;
    let newCoffeeAltitude = document.getElementById("input-add-coffee-altitude").value;
    let newCoffeeProcessingMethod = document.getElementById("input-add-coffee-processing-method").value;

    newCoffeeFlavorsString = newCoffeeFlavorsString.replaceAll(" ", "");
    let newCoffeeFlavorsSplitString = newCoffeeFlavorsString.split(",");
    let newCoffeeFlavors = [];

    newCoffeeFlavorsSplitString.forEach(function(flavor){
        let capitalizedFlavor = "";
        capitalizedFlavor = formatStrings(flavor);
        newCoffeeFlavors.push(capitalizedFlavor);
    })
    let nextId = updateNextCoffeeId()
    newCoffee.id = nextId;
    newCoffee.name = newCoffeeName;
    newCoffee.producer = newCoffeeProducer
    newCoffee.country = newCoffeeCountry;
    newCoffee.roastProfile = newCoffeeRoast;
    newCoffee.region = newCoffeeRegion;
    newCoffee.flavorNotes = newCoffeeFlavors;
    newCoffee.variety = newCoffeeVarietal;
    newCoffee.elevation = newCoffeeAltitude;
    newCoffee.process = newCoffeeProcessingMethod;
    newCoffee.buttons[0] = "button-coffee-more-info-front-" + nextId;
    newCoffee.buttons[1] = "button-coffee-more-info-back-" + nextId;

    coffeeOfferings.push(newCoffee);
    window.localStorage.setItem("coffeeOfferings", JSON.stringify(coffeeOfferings));
    updateFlavorNotes();
    updateCountries();
    updateTiles();
}

/*
//////////////////////////////////////////////////////////////////////////////////////
This section adds a new coffee object to the coffee offering array using sort selectors
//////////////////////////////////////////////////////////////////////////////////////
 */
function sortCoffeeTiles(){
    filteredCoffees = [];
    let selectedRoast = roastProfileSelection.value;
    let selectedCountry = coffeeOriginSelection.value;
    let selectedFlavor = flavorNoteSelection.value;
    coffeeOfferings.forEach(function(coffee) {
        if ((coffee.roastProfile.toLowerCase() === selectedRoast.toLowerCase() || selectedRoast === "Roast Profile") && (coffee.country.toLowerCase() === selectedCountry.toLowerCase() || selectedCountry === "Origin") && (coffee.flavorNotes.includes(selectedFlavor) || selectedFlavor === "Flavor Note")) {
            if(!filteredCoffees.includes(coffee)){
                filteredCoffees.push(coffee);
            }
        }
    });
    filteredCoffees = filteredCoffees.sort((a,b) => a.id < b.id ? 1 : -1);
    document.getElementById("input-search").value = "";
    updateCoffeeTilesInnerHtml();
    updateInfoButtons();
}

function sortFilteredCoffeesNumerically(){
    filteredCoffees.sort(
        (a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : (parseInt(a.id) < parseInt(b.id) ? -1 : 0)
    );
    console.log(filteredCoffees);
}
/*
//////////////////////////////////////////////////////////////////////////////////////
This section clears the fields in the sidebar
//////////////////////////////////////////////////////////////////////////////////////
 */
function clearBrowseCoffeeFields(){
    filteredCoffees = [];
    document.getElementById("input-search").value = "";
    document.getElementById("selector-roast-profile").selectedIndex = 0;
    document.getElementById("selector-coffee-origin").selectedIndex = 0;
    document.getElementById("selector-flavor-note").selectedIndex = 0;
    updateTiles();
}
function clearAddCoffeeFields(){
    document.getElementById("input-add-coffee").value = "";
    document.getElementById("input-add-coffee-producer").value = "";
    document.getElementById("selector-add-coffee-origin").value = "";
    document.getElementById("selector-add-coffee-roast-profile").value = "";
    document.getElementById("input-add-coffee-region").value = "";
    document.getElementById("input-add-coffee-flavor-notes").value = "";
    document.getElementById("input-add-coffee-varietal").value = "";
    document.getElementById("input-add-coffee-altitude").value = "";
    document.getElementById("input-add-coffee-processing-method").value = "";
}

/*
//////////////////////////////////////////////////////////////////////////////////////
This section updates various part of the js
//////////////////////////////////////////////////////////////////////////////////////
 */
function retrievePreviouslyAddedCoffees(){
    window.localStorage.removeItem("coffeeOfferings");
    const retrievedData = JSON.parse(window.localStorage.getItem("coffeeOfferings"));
    if(retrievedData){
        coffeeOfferings = retrievedData;
    }
    console.log(retrievedData);
}
function initializeTiles(){
    retrievePreviouslyAddedCoffees();
    updateFlavorNotes();
    updateCountries()
    updateTiles();
    updateNextCoffeeId();
    updateInfoButtons();
}
function updateTiles(){
    clearAddCoffeeFields();
    updateSelectors();
    sortCoffeeTiles();
}
function updateFlavorNotes(){
    coffeeOfferings.forEach(function(coffee){
        coffee.flavorNotes.forEach(function (flavor){
            if(!flavorNotesInSelector.includes(flavor)){
                flavorNotesInSelector.push(formatStrings(flavor));
            }
        })
    })
    flavorNotesInSelector.sort();
}
function updateCountries(){
    coffeeOfferings.forEach(function(coffee){
        if(!coffeeOriginsInSelector.includes(coffee.country)){
            coffeeOriginsInSelector.push(coffee.country);
        }
    })
    coffeeOriginsInSelector.sort();
}
function updateNextCoffeeId(){
    let nextCoffeeId = "";
    nextCoffeeId += (parseInt(coffeeOfferings[coffeeOfferings.length-1].id) + 1);
    switch(nextCoffeeId.length){
        case 1:
            return nextCoffeeId = "000" + nextCoffeeId;
        case 2:
            return nextCoffeeId = "00" + nextCoffeeId;
        case 3:
            return nextCoffeeId = "0" + nextCoffeeId;
        case 4:
            return nextCoffeeId = "" + nextCoffeeId;
    }
}

function updateInfoButtons(){
    infoButtons = [];
    filteredCoffees.forEach(function (coffee){
        if(coffee.isTileFrontFacing){
            infoButtons.push(coffee.buttons[0]);
        } else {
            infoButtons.push(coffee.buttons[1]);
        }
    })

    infoButtons.forEach(function (button){
        let newButton = document.querySelector('#' + button);
        newButton.addEventListener("click",flipCoffeeTile);
    })
}
/*
//////////////////////////////////////////////////////////////////////////////////////
This section holds all of my variables
//////////////////////////////////////////////////////////////////////////////////////
 */
let coffeeOfferings = [
    {id: "0001", name: "Finca La Fazenda Farms", country: "Brazil", region: "Carmo de Minas" , producer: "Ibraim Chaib De Souza", roastProfile: "Medium", flavorNotes: ["Dried Fruit", "Sweet", "Floral", "Citrus"], process: "Pulped Natural", variety: "Yellow Catuai", elevation:"1050 MASL", buttons: ["button-coffee-more-info-front-0001","button-coffee-more-info-back-0001"], isTileFrontFacing:true},
    {id: "0002", name: "Sitio Baixado", country: "Brazil", region: "Cristina" , producer: "Helisson Afonso Da Silva", roastProfile: "Medium Dark", flavorNotes: ["Caramel","Chocolate","Tropical Fruit", "Orange"], process: "Pulped Natural", variety: "Yellow Catuai", elevation:"1300 MASL", buttons: ["button-coffee-more-info-front-0002","button-coffee-more-info-back-0002"], isTileFrontFacing:true},
    {id: "0003", name: "El Alirio", country: "Colombia", region: "Huila" , producer: "John Fredy Chaguala", roastProfile: "Medium Light", flavorNotes: ["Banana", "Citrus", "Orange", "Tropical Fruit"], process: "Honey", variety: "Pink Bourbon", elevation:"1620 MASL", buttons: ["button-coffee-more-info-front-0003","button-coffee-more-info-back-0003"], isTileFrontFacing:true},
    {id: "0004", name: "Santa Isabel", country: "Colombia", region: "Antioquia" , producer: "Don Fernando Echavarria", roastProfile: "Light", flavorNotes: ["Banana", "Grape", "Sweet", "White Wine"], process: "Pulped Natural", variety: "Castillo", elevation:"1850 MASL", buttons: ["button-coffee-more-info-front-0004","button-coffee-more-info-back-0004"], isTileFrontFacing:true},
    {id: "0005", name: "Guji Hambela", country: "Ethiopia", region: "Oromia" , producer: "Various Smallholders", roastProfile: "Medium Light", flavorNotes: ["Stone Fruit", "Berry", "Nut", "Chocolate"], process: "Pulped Natural", variety: "Heirloom", elevation:"1650 MASL", buttons: ["button-coffee-more-info-front-0005","button-coffee-more-info-back-0005"], isTileFrontFacing:true},
    {id: "0006", name: "Finca Pojoptetac", country: "Guatemala", region: "Huehuetenango" , producer: "Walter Francisco Garcia", roastProfile: "Medium", flavorNotes: ["Nut", "Berry","Honey","Malty"], process: "Washed", variety: "Bourbon, Caturra, Pache", elevation:"1600 MASL", buttons: ["button-coffee-more-info-front-0006","button-coffee-more-info-back-0006"], isTileFrontFacing:true},
    {id: "0007", name: "Finca San Jose del Lago", country: "Guatemala", region: "Lake Atitlan" , producer: "Eduardo Cabera", roastProfile: "Medium", flavorNotes: ["Nut", "Sweet", "Chocolate", "Orange"], process: "Washed", variety: "Caturra, Typica, Bourbon", elevation:"1820 MASL", buttons: ["button-coffee-more-info-front-0007","button-coffee-more-info-back-0007"], isTileFrontFacing:true},
    {id: "0008", name: "Las Guacamayas", country: "Guatemala", region: "Jutiapa" , producer: "Amilcar Romero", roastProfile: "Dark", flavorNotes: ["Chocolate", "Tropical Fruit", "Berry", "Grape"], process: "Natural Anerobic Fermentation", variety: "Orange Bourbon", elevation:"1650 MASL", buttons: ["button-coffee-more-info-front-0008","button-coffee-more-info-back-0008"], isTileFrontFacing:true},
    {id: "0009", name: "Red Dalia", country: "Mexico", region: "Chiapas" , producer: "Finca Monte Azul", roastProfile: "Medium Dark", flavorNotes: ["Caramel", "Sweet", "Tropical Fruit", "Dried Fruit"], process: "Washed", variety: "Caturra, Typica", elevation:"1250 MASL", buttons: ["button-coffee-more-info-front-0009","button-coffee-more-info-back-0009"], isTileFrontFacing:true},
    {id: "0010", name: "Finca El Bosque", country: "Nicaragua", region: "Nueva Segovia" , producer: "Julio Peralta", roastProfile: "Light", flavorNotes: ["Banana", "Berry", "Chocolate", "Caramel"], process: "Natural Anerobic Fermentation", variety: "Yellow Catuai", elevation:"1350 MASL", buttons: ["button-coffee-more-info-front-0010","button-coffee-more-info-back-0010"], isTileFrontFacing:true},
    {id: "0011", name: "Finca Santa Maria de Lourdes", country: "Nicaragua", region: "Nueva Segovia" , producer: "Octavio Peralta", roastProfile: "Light", flavorNotes: ["Apple", "Floral", "Chocolate", "Tropical Fruit"], process: "Natural Anerobic Fermentation", variety: "Caturra, Typica, Bourbon", elevation:"1050 MASL", buttons: ["button-coffee-more-info-front-0011","button-coffee-more-info-back-0011"], isTileFrontFacing:true},
    {id: "0012", name: "Finca Borbollon", country: "Nicaragua", region: "Esteli" , producer: "Norman Canales", roastProfile: "Medium Light", flavorNotes: ["Floral", "Chocolate", "Citrus", "Sweet"], process: "Washed", variety: "Caturra, Typica, Bourbon", elevation:"1350 MASL", buttons: ["button-coffee-more-info-front-0012","button-coffee-more-info-back-0012"], isTileFrontFacing:true},
    {id: "0013", name: "Kerinci Highlands", country: "Sumatra", region: "Mount Kerinci Highlands" , producer: "Various Smallholders", roastProfile: "Dark", flavorNotes: ["Herbal", "Floral", "Citrus", "Tropical Fruit"], process: "Honey", variety: "Andung Sari, Tim-Tim, Bor-Bor", elevation:"1300 MASL", buttons: ["button-coffee-more-info-front-0013","button-coffee-more-info-back-0013"], isTileFrontFacing:true},
    {id: "0014", name: "Gayo Highlands", country: "Sumatra", region: "Central Aceh Regency" , producer: "Various Smallholders", roastProfile: "Medium Dark", flavorNotes: ["Herbal", "Tropical Fruit", "Orange", "Floral"], process: "Wet-Hulled", variety: "Ateng P88, Tim-Tim", elevation:"1450 MASL", buttons: ["button-coffee-more-info-front-0014","button-coffee-more-info-back-0014"], isTileFrontFacing:true},
];
let flavorNotesInSelector = [];
let coffeeOriginsInSelector = [];
let filteredCoffees = [];
let infoButtons = [];
let coffeeTilesHtml = document.querySelector('#tile-collection');
let searchedCoffeeWord = document.querySelector('#input-search')

const allAddableCountriesInSelector = [
    "Bolivia",
    "Brazil",
    "Burundi",
    "China",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Ecuador",
    "El Salvador",
    "Eritrea",
    "Ethiopia",
    "Ethiopia",
    "Guatemala",
    "Honduras",
    "India",
    "Indonesia",
    "Jamaica",
    "Kenya",
    "Mexico",
    "Nicaragua",
    "Panama",
    "Papua New Guinea",
    "Peru",
    "Rwanda",
    "Sudan",
    "Tanzania",
    "Uganda",
    "Vietnam",
    "Yemen"
];
const roastProfilesInSelector = [
    "Light",
    "Medium Light",
    "Medium",
    "Medium Dark",
    "Dark"
]

const submitButton = document.querySelector('#button-submit');
const resetButton = document.querySelector('#button-reset');
const searchButton = document.querySelector('#button-search');
const addCoffeeButton = document.querySelector('#button-add-coffee');

let roastProfileSelection = document.querySelector('#selector-roast-profile');
let coffeeOriginSelection = document.querySelector('#selector-coffee-origin');
let flavorNoteSelection = document.querySelector('#selector-flavor-note');
let addToRoastProfileSelection = document.querySelector('#selector-add-coffee-roast-profile');
let addToCoffeeOriginSelection = document.querySelector('#selector-add-coffee-origin');

submitButton.addEventListener('click', sortCoffeeTiles);
resetButton.addEventListener('click', clearBrowseCoffeeFields);
searchButton.addEventListener('click', searchCoffeeTiles);
addCoffeeButton.addEventListener('click', addNewCoffee);

initializeTiles();