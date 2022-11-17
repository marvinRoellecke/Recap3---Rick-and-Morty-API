export function createCharacterCard(dataCharacter) {
  const li = document.createElement("li");
  li.classList.add("card");
  li.innerHTML = `  <div class="card__image-container">
  <img
    class="card__image"
    src="${dataCharacter.image}"
    alt="${dataCharacter.name}"
  />
  <div class="card__image-gradient"></div>
</div>
<div class="card__content">
  <h2 class="card__title">${dataCharacter.name}</h2>
  <dl class="card__info">
    <dt class="card__info-title">Status</dt>
    <dd class="card__info-description">${dataCharacter.status}</dd>
    <dt class="card__info-title">Type</dt>
    <dd class="card__info-description">${dataCharacter.type}</dd>
    <dt class="card__info-title">Occurrences</dt>
    <dd class="card__info-description">${dataCharacter.episode.length}</dd>
  </dl>
</div>`;

  return li;
}
