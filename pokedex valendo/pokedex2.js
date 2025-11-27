const container = document.getElementById("pokemon-container");
const search = document.getElementById("search");

// Carrega os 150 Pokémons
async function loadPokemons() {
    for (let i = 1; i <= 150; i++) {
        await fetchPokemon(i);
    }
}

async function fetchPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    createCard(data);
}

function createCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${pokemon.sprites.other['official-artwork'].front_default}">
        <h3>${pokemon.name.toUpperCase()}</h3>
        <p>#${pokemon.id.toString().padStart(3, "0")}</p>
    `;

    container.appendChild(card);
}

// FILTRO DE BUSCA
search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(value) ? "block" : "none";
    });
});

loadPokemons();
