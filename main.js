//this function writes the html script for each individual coffee tile
//ARGUMENTS: coffee- A "coffee" object from filteredCoffees[]
//RETURNS: html- Html text for each coffee in filteredCoffees[]
function renderCoffeeTile(coffee, number) {
    //var html = '<article class="coffee coffee' + number + '">'
    var html = '<article class="coffee">'
    html += '<section class="coffee-main">'
    html += '<ul>'
    html += '<li class="coffee-id">' + coffee.id + '</li>';
    html += '<li class="coffee-name">' + coffee.name + '</li>';
    html += '<li class="coffee-id">' + coffee.country + '</li>';
    html += '</ul>'
    html += '</section>'

    html += '<section class="coffee-info">'
    html += '<ul>'
    html += '<li class="coffee-label"> ROAST PROFILE </li>';
    html += '<li>' + coffee.roast + '</li>';
    html += '<li class="coffee-label"> FLAVOR NOTES </li>';
    html += '<li>' + coffee.flavorNotes[0] + '</li>';
    html += '<li>' + coffee.flavorNotes[1] + '</li>';
    html += '<li>' + coffee.flavorNotes[2] + '</li>';
    html += '<li>' + coffee.flavorNotes[3] + '</li>';
    html += '</ul>'
    html += '</section>'
    html += '</article>';
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
    let selectedRoast = roastSelection.value;
    let selectedCountry = countrySelection.value;
    let selectedFlavor = flavorSelection.value;
    coffeeOfferings.forEach(function(coffee) {
        if ((coffee.roast === selectedRoast || selectedRoast === "--Select--") && (coffee.country === selectedCountry || selectedCountry === "--Select--")) {
            console.log(coffee);
            filteredCoffees.push(coffee);
        }
    });
    //"<div id='coffeetile" + i + "'>" + html + "</div>"
    coffeeTiles.innerHTML = renderCoffees(filteredCoffees);
}

function resetCoffees(){
    filteredCoffees = [];
    document.getElementById("roast-selection").selectedIndex = 0;
    document.getElementById("country-selection").selectedIndex = 0;
    document.getElementById("flavor-selection").selectedIndex = 0;
    sortCoffees();
}

var coffeeOfferings = [
    {id: "0001", name: "Finca La Fazenda Farms", country: "Brazil", region: "Carmo de Minas" , producer: "Ibraim Chaib De Souza", roast: "Medium", flavorNotes: ["Fig", "Fruit Cake", "Mint", "Orange"], process: "Pulped Natural", variety: "Yellow Catuai", elevation:"1050 MASL"},
    {id: "0002", name: "Sitio Baixado", country: "Brazil", region: "Cristina" , producer: "Helisson Afonso Da Silva", roast: "Medium Dark", flavorNotes: ["Caramel","Chocolate","Mango", "Pineapple"], process: "Pulped Natural", variety: "Yellow Catuai", elevation:"1300 MASL"},
    {id: "0003", name: "El Alirio", country: "Colombia", region: "Huila" , producer: "John Fredy Chaguala", roast: "Medium Light", flavorNotes: ["Banana", "Grapefruit", "Orange", "Tropical Fruit"], process: "Honey", variety: "Pink Bourbon", elevation:"1620 MASL"},
    {id: "0004", name: "Santa Isabel", country: "Colombia", region: "Antioquia" , producer: "Don Fernando Echavarria", roast: "Light", flavorNotes: ["Banana", "Concord Grape", "Sweet", "White Wine"], process: "Pulped Natural", variety: "Castillo", elevation:"1850 MASL"},
    {id: "0005", name: "Guji Hambela", country: "Ethiopia", region: "Oromia" , producer: "Various Smallholders", roast: "Medium Light", flavorNotes: ["Apricot", "Blackberry Jelly", "Cashew", "Chocolate"], process: "Pulped Natural", variety: "Heirloom", elevation:"1650 MASL"},
    {id: "0006", name: "Finca Pojoptetac", country: "Guatemala", region: "Huehuetenango" , producer: "Walter Francisco Garcia", roast: "Medium", flavorNotes: ["Almond", "Cherry","Honey","Malty"], process: "Washed", variety: "Bourbon, Caturra, Pache", elevation:"1600 MASL"},
    {id: "0007", name: "Finca San Jose del Lago", country: "Guatemala", region: "Lake Atitlan" , producer: "Eduardo Cabera", roast: "Medium", flavorNotes: ["Buttery", "Cake Batter", "Cocoa Nibs", "Orange"], process: "Washed", variety: "Caturra, Typica, Bourbon", elevation:"1820 MASL"},
    {id: "0008", name: "Las Guacamayas", country: "Guatemala", region: "Jutiapa" , producer: "Amilcar Romero", roast: "Dark", flavorNotes: ["Chocolate", "Pineapple", "Plum", "Concord Grape"], process: "Natural Anerobic Fermentation", variety: "Orange Bourbon", elevation:"1650 MASL"},
    {id: "0009", name: "Red Dalia", country: "Mexico", region: "Chiapas" , producer: "Finca Monte Azul", roast: "Medium Dark", flavorNotes: ["Caramel", "Miso", "Nectarine", "Raisin"], process: "Washed", variety: "Caturra, Typica", elevation:"1250 MASL"},
    {id: "0010", name: "Finca El Bosque", country: "Nicaragua", region: "Nueva Segovia" , producer: "Julio Peralta", roast: "Light", flavorNotes: ["Banana", "Blueberry", "Chocolate", "Nougat"], process: "Natural Anerobic Fermentation", variety: "Yellow Catuai", elevation:"1350 MASL"},
    {id: "0011", name: "Finca Santa Maria de Lourdes", country: "Nicaragua", region: "Nueva Segovia" , producer: "Octavio Peralta", roast: "Light", flavorNotes: ["Apple", "Black Tea", "Cocoa Nibs", "Mango"], process: "Natural Anerobic Fermentation", variety: "Caturra, Typica, Bourbon", elevation:"1050 MASL"},
    {id: "0012", name: "Finca Borbollon", country: "Nicaragua", region: "Esteli" , producer: "Norman Canales", roast: "Medium Light", flavorNotes: ["Black Tea", "Chocolate", "Lemonade", "Vanilla"], process: "Washed", variety: "Caturra, Typica, Bourbon", elevation:"1350 MASL"},
    {id: "0013", name: "Kerinci Highlands", country: "Sumatra", region: "Mount Kerinci Highlands" , producer: "Various Smallholders", roast: "Dark", flavorNotes: ["Anise", "Ginger", "Guava", "Pineapple"], process: "Honey", variety: "Andung Sari, Tim-Tim, Bor-Bor", elevation:"1300 MASL"},
    {id: "0014", name: "Gayo Highlands", country: "Sumatra", region: "Central Aceh Regency" , producer: "Various Smallholders", roast: "Medium Dark", flavorNotes: ["Clove", "Mango", "Papaya", "White Pepper"], process: "Wet-Hulled", variety: "Ateng P88, Tim-Tim", elevation:"1450 MASL"},
];

var filteredCoffees = [];
var coffeeTiles = document.querySelector('#coffee-tiles');

const submitButton = document.querySelector('#button-submit');
const resetButton = document.querySelector('#button-reset');

var roastSelection = document.querySelector('#roast-selection');
var countrySelection = document.querySelector('#country-selection');
var flavorSelection = document.querySelector('#flavor-selection');

coffeeTiles.innerHTML = renderCoffees(coffeeOfferings);

submitButton.addEventListener('click', sortCoffees);
resetButton.addEventListener('click', resetCoffees);
