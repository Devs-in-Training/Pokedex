const container = document.getElementById("pokemon-container");
const search = document.getElementById("search");

// Carrega os 151 Pokémons
async function loadPokemons() {
    for (let i = 1; i <= 151; i++) {
        await fetchPokemon(i);
    }
}

async function fetchPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    createCard(data);
}

// Função única createCard
function createCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("card");

    const types = pokemon.types.map(t => t.type.name);

    const primaryType = types[0];
card.classList.add(primaryType);



    if (types.length > 1) {
        card.style.background = `linear-gradient(45deg, ${getTypeColor(types[0])}, ${getTypeColor(types[1])})`;
    } else {
        card.style.background = getTypeColor(types[0]);
    }
    card.style.color = "white";


    const typeIcons = types
        .map(type => `<img src="tipos/${type}.png" alt="${type}" class="type-icon">`)
        .join("");

    card.innerHTML = `
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name.toUpperCase()}</h3>
        <p>#${pokemon.id.toString().padStart(3, "0")}</p>
        <div class="types">${typeIcons}</div>
    `;

    container.appendChild(card);
}

function getTypeColor(type) {
    const colors = {
        grass: "#77c450ff",
        fire: "#a81b1bff",
        water: "#7498ecff",
        electric: "#e6ca5aff",
        ice: "#bbfcfcff",
        fighting: "#b6660aff",
        poison: "#6b18b8ff",
        ground: "#69510dff",
        flying: "#bccbecff",
        psychic: "#e45f87ff",
        bug: "#8f9b24ff",
        rock: "#B8A038",
        ghost: "#19063bff",
        dark: "#705848",
        dragon: "#7e5ec9ff",
        steel: "#61759bff",
        fairy: "#da2fd1ff",
        normal: "#8b8b8bff"
    };
    return colors[type] || "#51009cff";
}

search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const id = card.querySelector("p").textContent;
        card.style.display = name.includes(value) || id.includes(value) ? "block" : "none";
    });
});

loadPokemons();
