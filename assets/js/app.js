// Pokebox Search Input, Poke Button and Poke-wrapper div
const pokeInput = document.querySelector(".poke-input")
const searchBtn = document.querySelector(".poke-btn")
const pokeWrapper = document.querySelector(".poke-wrapper .row")

// the number of pokemon we want to print
const pokeCount = 20

// Background colors according to Pokemon types
const pokeColors = {
    fire:"#fddfdf",
    grass:"#defde0",
    electric:"#fcf7de",
    water:"#def3fd",
    ground:"#f4e7da",
    rock:"#d5d5d4",
    fairy:"#fceaff",
    poison:"#d6b3ff",
    bug:"#f8d5a3",
    dragon:"#97b3e6",
    psychic:"#eaeda1",
    flying:"#f5f5f5",
    fighting:"#e6e0d4",
    normal:"#f5f5f5",
    ice:"#e0f5ff",
}

//a piece of code that allows us to call async according to the pokemon count
const initPokemon = async () => {
    for (let i = 1; i <= pokeCount; i++) {
        await getPokemon(i)
    }
}

//a piece of code that allows us to call pokemon data as api and process it as json
const getPokemon = async (id) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`
    let res = await fetch(url)
    let data = await res.json()
    createPokemonBox(data)
}


const createPokemonBox = (pokemon) => {
    //code that magnifies the first letter of pokemon names
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

    //code that converts the incoming pokemon id to string data and adds two zeros at the beginning
    const id = pokemon.id.toString().padStart(3,'0')

    //code to select the pokemon type on the data we receive
    const type = pokemon.types[0].type.name
    const color = pokeColors[type]
    const weight = pokemon.weight
    
    const pokeBoxEl = document.createElement('div')
    pokeBoxEl.classList.add('col-lg-3')
    pokeBoxEl.innerHTML = ` 
        <div class="poke-item text-center" style="background-color:${color}">
            <div class="poke-img">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image">
            </div>
            <div class="poke-name">${name}</div>
            <div class="poke-id">#${id}</div>
            <div class="poke-weight">${weight} KG</div>
            <div class="poke-type">Type: ${type}</div>
        </div> 
    `
    pokeWrapper.appendChild(pokeBoxEl)
}

initPokemon()

pokeInput.addEventListener('input', function(e) {
    const search = pokeInput.value.toLowerCase();
    const pokeNames = document.querySelectorAll('.poke-name');
    const types = document.querySelectorAll('.poke-type');

    // Check Pokemon names and types
    pokeNames.forEach((pokeName, index) => {
        const type = types[index].textContent.toLowerCase();
        if (!pokeName.innerHTML.toLowerCase().includes(search) && !type.includes(search)) {
            pokeName.parentElement.parentElement.style.display = 'none';
        } else {
            pokeName.parentElement.parentElement.style.display = 'block';
        }
    });
});