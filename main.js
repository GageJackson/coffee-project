/*
//////////////////////////////////////////////////////////////////////////////////////
This section Composes the Coffee Tile Html for the Front and Back Side of the Coffee Tile
//////////////////////////////////////////////////////////////////////////////////////
 */
function composeCoffeeTileCollectionHtml(coffees, frontSideOfTile) {
    let html = '';
    for(let i = coffees.length- 1 ; i >= 0; i--) {
        if(frontSideOfTile){
            html += composeCoffeeTileFrontHtml(coffees[i]);
        } else {
            html += composeCoffeeTileBackHtml(coffees[i]);
        }
    }
    return html;
}
function flipCoffeeTile(e){
    console.log("click");
    console.log(e.target.id);
    if(frontSideOfTile === true){
        frontSideOfTile = false;
    } else {
        frontSideOfTile = true;
    }
    updateCoffeeTilesInnerHtml();
    updateInfoButtons();
}
function flipCoffeeTile2(e){
    //button-coffee-more-info-front-04
    let clickedButton = e.target.id;
    if (frontSideTiles.includes(clickedButton)){
        frontSideTiles.remove(clickedButton);
        backSideTiles.push(clickedButton);
    } else if(backSideTiles.includes(clickedButton)) {
        backSideTiles.remove(clickedButton);
        frontSideTiles.push(clickedButton);
    }
}

function initializeTilesToFront(){

}

function composeCoffeeTileFrontHtml(coffee) {
    let html = '<div class="coffee-tile-front coffee-tile">'
    html += '<section class="coffee-tile-head">'
    html += '<p class="coffee-label-head">' + coffee.id + '</p>';
    html += '<p class="coffee-name">' + capitalizeStrings(coffee.name) + '</p>';
    html += '<p class="coffee-label-head">' + capitalizeStrings(coffee.country) + '</p>';html += '</ul>'
    html += '</section>'

    html += '<section class="coffee-tile-body">'
    html += '<div>';
    html += '<p class="coffee-label-body"> ROAST PROFILE </p>';
    html += '<p class="coffee-properties-body">' + capitalizeStrings(coffee.roastProfile) + '</p>';
    html += '</div>'
    html += '<div>';
    html += '<p class="coffee-label-body"> FLAVOR NOTES </p>';
    html += '<ul>'
    html += '<li class="coffee-properties-body">' + capitalizeStrings(coffee.flavorNotes[0]) + '</li>';
    html += '<li class="coffee-properties-body">' + capitalizeStrings(coffee.flavorNotes[1]) + '</li>';
    html += '<li class="coffee-properties-body">' + capitalizeStrings(coffee.flavorNotes[2]) + '</li>';
    html += '<li class="coffee-properties-body">' + capitalizeStrings(coffee.flavorNotes[3]) + '</li>';
    html += '</ul>';
    html += '</div>';
    //html += '<button id="button-coffee-more-info-front">More Info</button>';
    html += '<button id=' + coffee.buttons[0] + ' class="button-coffee-more-info-front">More Info</button>';
    //console.log("Front Test" + '<button id="button-coffee-more-info-front' + number + '">Other Side</button>');
    html += '</section>';

    html += '</div>';
    return html;
}
function composeCoffeeTileBackHtml(coffee){
    let html = '<div class="coffee-tile-back coffee-tile">';
    html += '<section class="coffee-tile-back-info">'
    html += '<p class="coffee-label-body"> REGION </p>';
    html += '<p class="coffee-properties-body">' + capitalizeStrings(coffee.region) + '</p>';
    html += '<p class="coffee-label-body"> PRODUCER </p>';
    html += '<p class="coffee-properties-body">' + capitalizeStrings(coffee.producer) + '</p>';
    html += '<p class="coffee-label-body"> PROCESS </p>';
    html += '<p class="coffee-properties-body">' + capitalizeStrings(coffee.process) + '</p>';
    html += '<p class="coffee-label-body"> VARIETAL </p>';
    html += '<p class="coffee-properties-body">' + capitalizeStrings(coffee.variety) + '</p>';
    html += '<p class="coffee-label-body"> ELEVATION </p>';
    html += '<p class="coffee-properties-body">' + capitalizeStrings(coffee.elevation) + '</p>';
    html += '</section>'
    html += '<button id=' + coffee.buttons[1] + ' class="button-coffee-more-info-back">More Info</button>';
    //html += '<button id="button-coffee-more-info-back">Other Side</button>';
    //html += '<button id="button-coffee-more-info-back' + number + '" class="button-coffee-more-info-front">Other Side</button>';
    //console.log("Back Test" + '<button id="button-coffee-more-info' + number + '">Other Side</button>');
    html += '</div>';
    return html;
}

function capitalizeStrings(oldString){
    let newString = "";
    let newStringArray = [];
    let oldStringArray = [];
    if (oldString.length <= 1){
        return "No Input";
    } else {
        oldStringArray = oldString.split(" ");
        oldStringArray.forEach(function (word){
            let fixedString = word[0].toUpperCase() + word.substring(1).toLowerCase();
            newStringArray.push(fixedString);
        })
        newString = newStringArray.join(" ");
        return newString;
    }
}
/*
//////////////////////////////////////////////////////////////////////////////////////
This section Composes Selector Html
//////////////////////////////////////////////////////////////////////////////////////
 */
function initializeSelectors(){
    createSelectorHtml(flavorNotes, flavorSelection, "Flavor Note", true);
    createSelectorHtml(roastProfiles, roastSelection, "Roast Profile", false);
    createSelectorHtml(roastProfiles, addRoastSelection, "Roast Profile", false);
    createSelectorHtml(countries, countrySelection, "Origin", true);
    createSelectorHtml(allCountries, addCountrySelection, "Origin", true);
}

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
//////////////////////////////////////////////////////////////////////////////////////
This section Searches through the Coffee Object's properties in the
Coffee Offering Array and displays Coffee tiles with user-input
//////////////////////////////////////////////////////////////////////////////////////
 */
function searchCoffeeTiles(){
    filteredCoffees = []
    let numberOfCoffeeProperties = 11;
    coffeeOfferings.forEach(function (coffee){
        let userSearchInput = searchedCoffee.value.toLowerCase().split(" ");
        for(let i = 1; i < numberOfCoffeeProperties; i++){
            let databaseSearchComparison = cycleThroughCoffeeProperties(coffee, i);
            let userSearchMatches = databaseSearchComparison.filter(function (obj){
                return userSearchInput.indexOf(obj) !== -1;
            })
            if(userSearchMatches.join(" ") === userSearchInput.join(" ")){
                filteredCoffees.push(coffee);
            } else {
            }
        }
        filteredCoffees = filteredCoffees.sort((a,b) => a.id < b.id ? 1 : -1);
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
    }
}

/*
//////////////////////////////////////////////////////////////////////////////////////
This section adds a new coffee object to the coffee offering array using search bar
//////////////////////////////////////////////////////////////////////////////////////
 */
function addNewCoffee(){
    let newCoffee ={id:"", name:"", country:"", roastProfile:"", flavorNotes:[]};

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
        capitalizedFlavor = capitalizeStrings(flavor);
        newCoffeeFlavors.push(capitalizedFlavor);
    })

    newCoffee.id = updateNextCoffeeId();
    newCoffee.name = newCoffeeName;
    newCoffee.producer = newCoffeeProducer
    newCoffee.country = newCoffeeCountry;
    newCoffee.roastProfile = newCoffeeRoast;
    newCoffee.region = newCoffeeRegion;
    newCoffee.flavorNotes = newCoffeeFlavors;
    newCoffee.variety = newCoffeeVarietal;
    newCoffee.elevation = newCoffeeAltitude;
    newCoffee.process = newCoffeeProcessingMethod;

    coffeeOfferings.push(newCoffee);
    clearAddCoffeeFields();
    updateTiles();
}

/*
//////////////////////////////////////////////////////////////////////////////////////
This section adds a new coffee object to the coffee offering array using sort selectors
//////////////////////////////////////////////////////////////////////////////////////
 */
function sortCoffeeTiles(){
    filteredCoffees = [];
    let selectedRoast = roastSelection.value;
    let selectedCountry = countrySelection.value;
    let selectedFlavor = flavorSelection.value;
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
function updateTiles(){
    updateFlavorNotes();
    updateCountries()
    initializeSelectors();
    sortCoffeeTiles();
}
function updateCoffeeTilesInnerHtml(){
    //TODO: composeCoffeeTileCollectionHtml(filteredCoffees,frontSideOfTile);
    coffeeTiles.innerHTML = composeCoffeeTileCollectionHtml(filteredCoffees, frontSideOfTile);
}
function updateFlavorNotes(){
    coffeeOfferings.forEach(function(coffee){
        for (let i = 0; i < coffee.flavorNotes.length; i++){
            if(!flavorNotes.includes(coffee.flavorNotes[i])){
                flavorNotes.push(capitalizeStrings(coffee.flavorNotes[i]));
            }
        }
    })
    flavorNotes.sort();
}
function updateCountries(){
    coffeeOfferings.forEach(function(coffee){
        if(!countries.includes(coffee.country)){
            countries.push(coffee.country);
        }
    })
    countries.sort();
}
function updateNextCoffeeId(){
    nextCoffeeId = "";
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
    //console.log("called");
    //console.log(nextCoffeeId);
    infoButtons = [];
    //console.log("filtered: " + filteredCoffees);
        filteredCoffees.forEach(function (coffee){
            //console.log(coffee.tileFront);
            if(coffee.tileFront){
                infoButtons.push(coffee.buttons[0]);
                //console.log("front: " + infoButtons);
            } else {
                infoButtons.push(coffee.buttons[1]);
                //console.log("back: " + infoButtons);
            }
        })
     // frontSideOfTile
    //console.log("after: " + infoButtons);

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
    {id: "0001", name: "Finca La Fazenda Farms", country: "Brazil", region: "Carmo de Minas" , producer: "Ibraim Chaib De Souza", roastProfile: "Medium", flavorNotes: ["Dried Fruit", "Sweet", "Floral", "Citrus"], process: "Pulped Natural", variety: "Yellow Catuai", elevation:"1050 MASL", buttons: ["button-coffee-more-info-front-01","button-coffee-more-info-back-01"], tileFront:true},
    {id: "0002", name: "Sitio Baixado", country: "Brazil", region: "Cristina" , producer: "Helisson Afonso Da Silva", roastProfile: "Medium Dark", flavorNotes: ["Caramel","Chocolate","Tropical Fruit", "Orange"], process: "Pulped Natural", variety: "Yellow Catuai", elevation:"1300 MASL", buttons: ["button-coffee-more-info-front-02","button-coffee-more-info-back-02"], tileFront:true},
    {id: "0003", name: "El Alirio", country: "Colombia", region: "Huila" , producer: "John Fredy Chaguala", roastProfile: "Medium Light", flavorNotes: ["Banana", "Citrus", "Orange", "Tropical Fruit"], process: "Honey", variety: "Pink Bourbon", elevation:"1620 MASL", buttons: ["button-coffee-more-info-front-03","button-coffee-more-info-back-03"], tileFront:true},
    {id: "0004", name: "Santa Isabel", country: "Colombia", region: "Antioquia" , producer: "Don Fernando Echavarria", roastProfile: "Light", flavorNotes: ["Banana", "Grape", "Sweet", "White Wine"], process: "Pulped Natural", variety: "Castillo", elevation:"1850 MASL", buttons: ["button-coffee-more-info-front-04","button-coffee-more-info-back-04"], tileFront:true},
    {id: "0005", name: "Guji Hambela", country: "Ethiopia", region: "Oromia" , producer: "Various Smallholders", roastProfile: "Medium Light", flavorNotes: ["Stone Fruit", "Berry", "Nut", "Chocolate"], process: "Pulped Natural", variety: "Heirloom", elevation:"1650 MASL", buttons: ["button-coffee-more-info-front-05","button-coffee-more-info-back-05"], tileFront:true},
    {id: "0006", name: "Finca Pojoptetac", country: "Guatemala", region: "Huehuetenango" , producer: "Walter Francisco Garcia", roastProfile: "Medium", flavorNotes: ["Nut", "Berry","Honey","Malty"], process: "Washed", variety: "Bourbon, Caturra, Pache", elevation:"1600 MASL", buttons: ["button-coffee-more-info-front-06","button-coffee-more-info-back-06"], tileFront:true},
    {id: "0007", name: "Finca San Jose del Lago", country: "Guatemala", region: "Lake Atitlan" , producer: "Eduardo Cabera", roastProfile: "Medium", flavorNotes: ["Nut", "Sweet", "Chocolate", "Orange"], process: "Washed", variety: "Caturra, Typica, Bourbon", elevation:"1820 MASL", buttons: ["button-coffee-more-info-front-07","button-coffee-more-info-back-07"], tileFront:true},
    {id: "0008", name: "Las Guacamayas", country: "Guatemala", region: "Jutiapa" , producer: "Amilcar Romero", roastProfile: "Dark", flavorNotes: ["Chocolate", "Tropical Fruit", "Berry", "Grape"], process: "Natural Anerobic Fermentation", variety: "Orange Bourbon", elevation:"1650 MASL", buttons: ["button-coffee-more-info-front-08","button-coffee-more-info-back-08"], tileFront:true},
    {id: "0009", name: "Red Dalia", country: "Mexico", region: "Chiapas" , producer: "Finca Monte Azul", roastProfile: "Medium Dark", flavorNotes: ["Caramel", "Sweet", "Tropical Fruit", "Dried Fruit"], process: "Washed", variety: "Caturra, Typica", elevation:"1250 MASL", buttons: ["button-coffee-more-info-front-09","button-coffee-more-info-back-09"], tileFront:true},
    {id: "0010", name: "Finca El Bosque", country: "Nicaragua", region: "Nueva Segovia" , producer: "Julio Peralta", roastProfile: "Light", flavorNotes: ["Banana", "Berry", "Chocolate", "Caramel"], process: "Natural Anerobic Fermentation", variety: "Yellow Catuai", elevation:"1350 MASL", buttons: ["button-coffee-more-info-front-10","button-coffee-more-info-back-10"], tileFront:true},
    {id: "0011", name: "Finca Santa Maria de Lourdes", country: "Nicaragua", region: "Nueva Segovia" , producer: "Octavio Peralta", roastProfile: "Light", flavorNotes: ["Apple", "Floral", "Chocolate", "Tropical Fruit"], process: "Natural Anerobic Fermentation", variety: "Caturra, Typica, Bourbon", elevation:"1050 MASL", buttons: ["button-coffee-more-info-front-11","button-coffee-more-info-back-11"], tileFront:true},
    {id: "0012", name: "Finca Borbollon", country: "Nicaragua", region: "Esteli" , producer: "Norman Canales", roastProfile: "Medium Light", flavorNotes: ["Floral", "Chocolate", "Citrus", "Sweet"], process: "Washed", variety: "Caturra, Typica, Bourbon", elevation:"1350 MASL", buttons: ["button-coffee-more-info-front-12","button-coffee-more-info-back-12"], tileFront:true},
    {id: "0013", name: "Kerinci Highlands", country: "Sumatra", region: "Mount Kerinci Highlands" , producer: "Various Smallholders", roastProfile: "Dark", flavorNotes: ["Herbal", "Floral", "Citrus", "Tropical Fruit"], process: "Honey", variety: "Andung Sari, Tim-Tim, Bor-Bor", elevation:"1300 MASL", buttons: ["button-coffee-more-info-front-13","button-coffee-more-info-back-13"], tileFront:true},
    {id: "0014", name: "Gayo Highlands", country: "Sumatra", region: "Central Aceh Regency" , producer: "Various Smallholders", roastProfile: "Medium Dark", flavorNotes: ["Herbal", "Tropical Fruit", "Orange", "Floral"], process: "Wet-Hulled", variety: "Ateng P88, Tim-Tim", elevation:"1450 MASL", buttons: ["button-coffee-more-info-front-14","button-coffee-more-info-back-14"], tileFront:true},
];
let nextCoffeeId = "";
let flavorNotes = [];
let countries = [];
let filteredCoffees = [];
let infoButtons = [];
let frontSideTiles = [];
let backSideTiles = [];
let frontSideOfTile = true;
let coffeeTiles = document.querySelector('#tile-collection');
let searchedCoffee = document.querySelector('#input-search')

const allCountries = [
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
const roastProfiles = [
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

let roastSelection = document.querySelector('#selector-roast-profile');
let countrySelection = document.querySelector('#selector-coffee-origin');
let flavorSelection = document.querySelector('#selector-flavor-note');
let addRoastSelection = document.querySelector('#selector-add-coffee-roast-profile');
let addCountrySelection = document.querySelector('#selector-add-coffee-origin');

submitButton.addEventListener('click', sortCoffeeTiles);
resetButton.addEventListener('click', clearBrowseCoffeeFields);
searchButton.addEventListener('click', searchCoffeeTiles);
addCoffeeButton.addEventListener('click', addNewCoffee);

updateTiles();
updateNextCoffeeId();
updateInfoButtons()