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
const dataCharacters = await fetchCharacters();
const maxPage = dataCharacters.info.pages; //hier stand eine 1
const page = 1;
const searchQuery = "";
let currentPage = 1;

dataCharacters.results.forEach((dataCharacter) => {
  cardContainer.append(createCharacterCard(dataCharacter));
});

pagination.textContent = `${currentPage} / ${maxPage}`;

async function fetchCharacters(pageIndex) {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character?page=" + pageIndex
  );
  const data = await response.json();
  console.log(data);
  return data; //.results
}

//Next und Previous Button

nextButton.addEventListener("click", async () => {
  if (currentPage >= maxPage) {
    return;
  } else {
    cardContainer.innerHTML = "";
    currentPage++;
    const dataCharacters = await fetchCharacters(currentPage);
    dataCharacters.results.forEach((dataCharacter) => {
      cardContainer.append(createCharacterCard(dataCharacter));
    });
    pagination.textContent = `${currentPage} / ${maxPage}`;
  }
});

prevButton.addEventListener("click", async () => {
  if (currentPage <= 1) {
    return;
  } else {
    cardContainer.innerHTML = "";
    currentPage--;
    const dataCharacters = await fetchCharacters(currentPage);
    dataCharacters.results.forEach((dataCharacter) => {
      cardContainer.append(createCharacterCard(dataCharacter));
    });
    pagination.textContent = `${currentPage} / ${maxPage}`;
  }
});
