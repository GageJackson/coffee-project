//this function writes the html script for each individual coffee tile
//ARGUMENTS: coffee- A "coffee" object from filteredCoffees[]
//RETURNS: html- Html text for each coffee in filteredCoffees[]
function renderCoffeeTile(coffee, number) {
    let html = '<div class="coffee-tile">'
    html += '<section class="coffee-main">'
    html += '<p class="coffee-id">' + coffee.id + '</p>';
    html += '<p class="coffee-name">' + coffee.name + '</p>';
    html += '<p class="coffee-id">' + coffee.country + '</p>';html += '</ul>'
    html += '</section>'

    html += '<section class="coffee-info">'
    html += '<p class="coffee-label"> ROAST PROFILE </p>';
    html += '<p>' + coffee.roastProfile + '</p>';
    html += '<p class="coffee-label"> FLAVOR NOTES </p>';
    html += '<ul>'
    html += '<li>' + coffee.flavorNotes[0] + '</li>';
    html += '<li>' + coffee.flavorNotes[1] + '</li>';
    html += '<li>' + coffee.flavorNotes[2] + '</li>';
    html += '<li>' + coffee.flavorNotes[3] + '</li>';
    html += '</ul>'
    html += '</section>'
    html += '</div>';
    return html;
}
function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffeeTile(coffees[i], i);
    }
    return html;
}
function sortCoffees(){
    filteredCoffees = [];
    let selectedRoast = roastSelection.value;
    let selectedCountry = countrySelection.value;
    let selectedFlavor = flavorSelection.value;
    coffeeOfferings.forEach(function(coffee) {
        if ((coffee.roastProfile === selectedRoast || selectedRoast === "Roast Profile") && (coffee.country === selectedCountry || selectedCountry === "Coffee Origin") && (coffee.flavorNotes.includes(selectedFlavor) || selectedFlavor === "Flavor Note")) {
            if(!filteredCoffees.includes(coffee)){
                filteredCoffees.push(coffee);
            }
        }
    });
    coffeeTiles.innerHTML = renderCoffees(filteredCoffees);
}

function searchCoffees(){
    filteredCoffees = []
    coffeeOfferings.forEach(function (coffee){
        let namePiece = searchedCoffee.value.toLowerCase().split(" ");
        let comparePiece = coffee.name.toLowerCase().split(" ");
        let myOutput = comparePiece.filter(function (obj){
            return namePiece.indexOf(obj) !== -1;
        })
        if(myOutput.join(" ") === namePiece.join(" ")){
            filteredCoffees.push(coffee);
        } else {
        }
        coffeeTiles.innerHTML = renderCoffees(filteredCoffees);
    })
}

function resetCoffees(){
    filteredCoffees = [];
    document.getElementById("selector-roast-profile").selectedIndex = 0;
    document.getElementById("selector-coffee-origin").selectedIndex = 0;
    document.getElementById("selector-flavor-note").selectedIndex = 0;
    sortCoffees();
}

function gatherFlavorNotes(){
    coffeeOfferings.forEach(function(coffee){
        for (let i = 0; i < coffee.flavorNotes.length; i++){
            if(!flavorNotes.includes(coffee.flavorNotes[i])){
                flavorNotes.push(coffee.flavorNotes[i][0].toUpperCase() + coffee.flavorNotes[i].substring(1));
            }
        }
    })
    flavorNotes.sort();

}
function gatherCountries(){
    coffeeOfferings.forEach(function(coffee){
        if(!countries.includes(coffee.country)){
            countries.push(coffee.country);
            countries.sort();
        }
    })
}function gatherCoffeeProperties(){
    gatherFlavorNotes();
    gatherCountries()
    initializeSelectors();
}

function initializeSelectors(){
    inputSelectors(flavorNotes, flavorSelection, "Flavor Note");
    inputSelectors(roastProfiles, roastSelection, "Roast Profile");
    inputSelectors(roastProfiles, addRoastSelection, "Roast Profile");
    inputSelectors(countries, countrySelection, "Coffee Origin");
    inputSelectors(allCountries, addCountrySelection, "Coffee Origin");
}

function inputSelectors(selectorArray, selectorHTML, selectedSelector){
    selectorArray.sort();
    selectorHTML.innerHTML = '';
    selectorHTML.innerHTML = '<option selected>' + selectedSelector + '</option>';
    selectorArray.forEach(function (option) {
        let html = '<option>' + option + '</option>';
        selectorHTML.innerHTML += html;
    })
}

function addNewCoffee(){
    console.log("test");
    let newCoffeeName = "";
    let newCoffeeCountry = "";
    let newCoffeeRoast = "";
    let newCoffeeFlavors = [];
    let newCoffee ={id:"", name:"", country:"", roastProfile:"", flavorNotes:[]};

    newCoffeeName = document.getElementById("input-add-coffee").value;
    newCoffeeCountry = document.getElementById("add-coffee-origin-selection").value;
    newCoffeeRoast = document.getElementById("selector-add-coffee-roast-profile").value;
    let newCoffeeFlavorsString = document.getElementById("input-add-coffee-flavor-notes").value;

    newCoffeeFlavorsString = newCoffeeFlavorsString.replaceAll(" ", "");
    newCoffeeFlavors = newCoffeeFlavorsString.split(",");
    console.log(newCoffeeFlavors);

    newCoffee.id = "0000";
    newCoffee.name = newCoffeeName;
    newCoffee.country = newCoffeeCountry;
    newCoffee.roastProfile = newCoffeeRoast;
    newCoffee.flavorNotes = newCoffeeFlavors;

    console.log(newCoffee.flavorNotes);

    coffeeOfferings.push(newCoffee);

    gatherCoffeeProperties();
    sortCoffees();
}

var coffeeOfferings = [
    {id: "0001", name: "Finca La Fazenda Farms", country: "Brazil", region: "Carmo de Minas" , producer: "Ibraim Chaib De Souza", roastProfile: "Medium", flavorNotes: ["Dried Fruit", "Sweet", "Floral", "Citrus"], process: "Pulped Natural", variety: "Yellow Catuai", elevation:"1050 MASL"},
    {id: "0002", name: "Sitio Baixado", country: "Brazil", region: "Cristina" , producer: "Helisson Afonso Da Silva", roastProfile: "Medium Dark", flavorNotes: ["Caramel","Chocolate","Tropical Fruit", "Orange"], process: "Pulped Natural", variety: "Yellow Catuai", elevation:"1300 MASL"},
    {id: "0003", name: "El Alirio", country: "Colombia", region: "Huila" , producer: "John Fredy Chaguala", roastProfile: "Medium Light", flavorNotes: ["Banana", "Citrus", "Orange", "Tropical Fruit"], process: "Honey", variety: "Pink Bourbon", elevation:"1620 MASL"},
    {id: "0004", name: "Santa Isabel", country: "Colombia", region: "Antioquia" , producer: "Don Fernando Echavarria", roastProfile: "Light", flavorNotes: ["Banana", "Grape", "Sweet", "White Wine"], process: "Pulped Natural", variety: "Castillo", elevation:"1850 MASL"},
    {id: "0005", name: "Guji Hambela", country: "Ethiopia", region: "Oromia" , producer: "Various Smallholders", roastProfile: "Medium Light", flavorNotes: ["Stone Fruit", "Berry", "Nut", "Chocolate"], process: "Pulped Natural", variety: "Heirloom", elevation:"1650 MASL"},
    {id: "0006", name: "Finca Pojoptetac", country: "Guatemala", region: "Huehuetenango" , producer: "Walter Francisco Garcia", roastProfile: "Medium", flavorNotes: ["Nut", "Berry","Honey","Malty"], process: "Washed", variety: "Bourbon, Caturra, Pache", elevation:"1600 MASL"},
    {id: "0007", name: "Finca San Jose del Lago", country: "Guatemala", region: "Lake Atitlan" , producer: "Eduardo Cabera", roastProfile: "Medium", flavorNotes: ["Nut", "Sweet", "Chocolate", "Orange"], process: "Washed", variety: "Caturra, Typica, Bourbon", elevation:"1820 MASL"},
    {id: "0008", name: "Las Guacamayas", country: "Guatemala", region: "Jutiapa" , producer: "Amilcar Romero", roastProfile: "Dark", flavorNotes: ["Chocolate", "Tropical Fruit", "Berry", "Grape"], process: "Natural Anerobic Fermentation", variety: "Orange Bourbon", elevation:"1650 MASL"},
    {id: "0009", name: "Red Dalia", country: "Mexico", region: "Chiapas" , producer: "Finca Monte Azul", roastProfile: "Medium Dark", flavorNotes: ["Caramel", "Sweet", "Tropical Fruit", "Dried Fruit"], process: "Washed", variety: "Caturra, Typica", elevation:"1250 MASL"},
    {id: "0010", name: "Finca El Bosque", country: "Nicaragua", region: "Nueva Segovia" , producer: "Julio Peralta", roastProfile: "Light", flavorNotes: ["Banana", "Berry", "Chocolate", "Caramel"], process: "Natural Anerobic Fermentation", variety: "Yellow Catuai", elevation:"1350 MASL"},
    {id: "0011", name: "Finca Santa Maria de Lourdes", country: "Nicaragua", region: "Nueva Segovia" , producer: "Octavio Peralta", roastProfile: "Light", flavorNotes: ["Apple", "Floral", "Chocolate", "Tropical Fruit"], process: "Natural Anerobic Fermentation", variety: "Caturra, Typica, Bourbon", elevation:"1050 MASL"},
    {id: "0012", name: "Finca Borbollon", country: "Nicaragua", region: "Esteli" , producer: "Norman Canales", roastProfile: "Medium Light", flavorNotes: ["Floral", "Chocolate", "Citrus", "Sweet"], process: "Washed", variety: "Caturra, Typica, Bourbon", elevation:"1350 MASL"},
    {id: "0013", name: "Kerinci Highlands", country: "Sumatra", region: "Mount Kerinci Highlands" , producer: "Various Smallholders", roastProfile: "Dark", flavorNotes: ["Herbal", "Floral", "Citrus", "Tropical Fruit"], process: "Honey", variety: "Andung Sari, Tim-Tim, Bor-Bor", elevation:"1300 MASL"},
    {id: "0014", name: "Gayo Highlands", country: "Sumatra", region: "Central Aceh Regency" , producer: "Various Smallholders", roastProfile: "Medium Dark", flavorNotes: ["Herbal", "Tropical Fruit", "Orange", "Floral"], process: "Wet-Hulled", variety: "Ateng P88, Tim-Tim", elevation:"1450 MASL"},
];
var flavorNotes = [];
var countries = [];
var filteredCoffees = [];
var coffeeTiles = document.querySelector('#tile-collection');
var searchedCoffee = document.querySelector('#input-search')
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


var roastSelection = document.querySelector('#selector-roast-profile');
var countrySelection = document.querySelector('#selector-coffee-origin');
var flavorSelection = document.querySelector('#selector-flavor-note');
var addRoastSelection = document.querySelector('#selector-add-coffee-roast-profile');
var addCountrySelection = document.querySelector('#add-coffee-origin-selection');

coffeeTiles.innerHTML = renderCoffees(coffeeOfferings);

submitButton.addEventListener('click', sortCoffees);
resetButton.addEventListener('click', resetCoffees);
searchButton.addEventListener('click', searchCoffees);
addCoffeeButton.addEventListener('click', addNewCoffee);


gatherCoffeeProperties();
initializeSelectors();
