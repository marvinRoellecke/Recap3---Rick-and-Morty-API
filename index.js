import { createCharacterCard } from "./components/card/card.js";

console.clear();

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

const dataCharacters = await fetchCharacters();
dataCharacters.forEach((dataCharacter) => {
  cardContainer.append(createCharacterCard(dataCharacter));
});

async function fetchCharacters(pageIndex) {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character?page=" + pageIndex
  );
  const data = await response.json();

  return data.results;
}

//Next und Previous Button
let currentPage = 1;
nextButton.addEventListener("click", async () => {
  cardContainer.innerHTML = "";
  currentPage++;
  const dataCharacters = await fetchCharacters(currentPage);
  dataCharacters.forEach((dataCharacter) => {
    cardContainer.append(createCharacterCard(dataCharacter));
  });
});

prevButton.addEventListener("click", async () => {
  cardContainer.innerHTML = "";
  currentPage--;
  const dataCharacters = await fetchCharacters(currentPage);
  dataCharacters.forEach((dataCharacter) => {
    cardContainer.append(createCharacterCard(dataCharacter));
  });
});
