// "characters": "https://rickandmortyapi.com/api/character",
// "locations": "https://rickandmortyapi.com/api/location",
// "episodes": "https://rickandmortyapi.com/api/episode"

const urlBase = 'https://rickandmortyapi.com/api';
const page = 5;

const loadCharacters = async () => {
    const res = await fetch(`${urlBase}/character?page=${page}`);
    const data = await res.json();
    const limitData = data.results.slice(0, 6);
    return {results: limitData};
};

const loadLocations = async () => {
    const res = await fetch(`${urlBase}/location`);
    return await res.json();
};

const loadEpisode = async () => {
    const res = await fetch(`${urlBase}/episode`);
    return await res.json();
};

const loadAllWithPromiseAll = async () => {
    const [characters, locations, episode] = await Promise.all([
        loadCharacters(),
        loadLocations(),
        loadEpisode()
    ]);
    console.log('Character: ', characters.results);
    showCharacter(characters.results);
    console.log('Location: ', locations.results);
    console.log('Episode: ', episode.results);
};

loadAllWithPromiseAll();

function showCharacter(characters){
    const characterContainer = document.getElementById('character-container');
    characters.map((character) =>{
        const divCharacter = document.createElement('div');
        divCharacter.id = `character-${character.id}`;
        divCharacter.innerHTML = `
        <img src="${character.image}" alt="Imagem do personagem">
        <article class="character-info">
            <h3>${character.name}</h3>
            <span class="${character.status}">${character.status} - ${character.species}</span>
            
            <span class="location">Location:</span>
            <a class="character-link" href="${character.location.url}">${character.location.name}</a>
            
            <span class="location">Origin:</span>
            <a class="character-link" href="${character.origin.url}">${character.origin.name}</a>
        </article>
        `;
        divCharacter.classList.add('character-box');
        characterContainer.appendChild(divCharacter);
        divCharacter.addEventListener('click', ()=>{
            characterDetails(character.id);
        });
    });
};

function characterDetails(id){
    console.log(id);
    const idEncrypted = encryptId(id);
    console.log(idEncrypted);
    window.location.href = `./pages/character.html?id=${idEncrypted}`;
};

function encryptId(id){
    return id.toString(36);
}