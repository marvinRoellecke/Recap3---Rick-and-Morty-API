import { createCharacterCard, drawCharacters } from "./components/card/card.js";

console.clear();

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const searchBarInput = document.querySelector('[data-js="search-bar__input"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let searchQuery = "";
let currentPage = 1;
const dataCharacters = await fetchCharacters(currentPage, searchQuery);
let maxPage = dataCharacters.info.pages; //hier stand eine 1
const page = 1;

dataCharacters.results.forEach((dataCharacter) => {
  cardContainer.append(createCharacterCard(dataCharacter));
});

pagination.textContent = `${currentPage} / ${maxPage}`;

async function fetchCharacters(pageIndex, indexQuery) {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character?page=" +
        pageIndex +
        "&name=" +
        indexQuery
    );
    if (!response.ok) {
      console.error("Response failed");
    } else {
      const data = await response.json();
      return data; //.results
    }
  } catch (error) {
    console.error("ERROR: Your Rick and Morty API could not be loaded");
  }
}

//Next und Previous Button

nextButton.addEventListener("click", async () => {
  const dataCharacters = await fetchCharacters(currentPage, searchQuery);
  console.log(dataCharacters.info.pages);
  if (currentPage >= dataCharacters.info.pages) {
    return;
  } else {
    cardContainer.innerHTML = "";
    currentPage++;
    const dataCharacters = await fetchCharacters(currentPage, searchQuery);
    drawCharacters(dataCharacters, cardContainer);
    pagination.textContent = `${currentPage} / ${dataCharacters.info.pages}`;
  }
});

prevButton.addEventListener("click", async () => {
  const dataCharacters = await fetchCharacters(currentPage, searchQuery);
  console.log(dataCharacters.info.pages);
  if (currentPage <= 1) {
    return;
  } else {
    currentPage--;
    const dataCharacters = await fetchCharacters(currentPage, searchQuery);
    cardContainer.innerHTML = "";
    drawCharacters(dataCharacters, cardContainer);
    pagination.textContent = `${currentPage} / ${dataCharacters.info.pages}`;
  }
});

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  searchQuery = searchBarInput.value;
  cardContainer.innerHTML = "";
  //currentPage = "";
  const dataCharacters = await fetchCharacters(currentPage, searchQuery);
  drawCharacters(dataCharacters, cardContainer);

  pagination.textContent = `${currentPage} / ${dataCharacters.info.pages}`;
});
