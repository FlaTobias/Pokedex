//Modal
function openDetailsPokemon() {
  document.documentElement.classList.add("open-modal");

  let codePokemon = this.getAttribute("code-pokemon");
  let imagePokemon = this.querySelector(".thumb-img");
  let iconPokemon = this.querySelector(".info .icon img");
  let namePokemon = this.querySelector(".info h3").textContent;
  let codeStringPokemon = this.querySelector(".info span").textContent;

  let iconTypePokemonModal = document.getElementById("js-image-type-modal");
  const imgPokemonModal = document.getElementById("js-image-pokemon-modal");
  const modalDetails = document.getElementById("js-modal-details");
  const namePokemonModal = document.getElementById("js-name-pokemon-modal");
  const codePokemonModal = document.getElementById("js-code-pokemon-modal");

  const heightPokemonModal = document.getElementById("js-height-pokemon");
  const weightPokemonModal = document.getElementById("js-weight-pokemon");
  const abilitiesPokemonModal = document.getElementById("js-abilities-pokemon");

  imgPokemonModal.setAttribute("src", imagePokemon.getAttribute("src"));
  modalDetails.setAttribute("typePokemonModal", this.classList[2]);
  iconTypePokemonModal.setAttribute("src", iconPokemon.getAttribute("src"));

  namePokemonModal.textContent = namePokemon;
  codePokemonModal.textContent = codeStringPokemon;

  axios({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`,
  }).then((response) => {
    let data = response.data;

    let infoPokemon = {
      mainAbilities: primeiraLetraM(data.abilities[0].ability.name),
      types: data.types,
      weight: data.weight,
      height: data.height,
      abilities: data.abilities,
      stats: data.stats,
      urlType: data.types[0].type.url,
    };

    function listingTypesPokemon() {
      const areaTypesModal = document.getElementById("js-type-pokemon");
      areaTypesModal.innerHTML = "";

      let arrayTypes = infoPokemon.types;

      arrayTypes.forEach((itemType) => {
        let textoType = itemType.type.name;
        let itemList = document.createElement("li");
        areaTypesModal.appendChild(itemList);

        let spanList = document.createElement("span");
        spanList.classList = `tag-type ${textoType}`;
        spanList.textContent = primeiraLetraM(textoType);
        itemList.appendChild(spanList);
      });
    }

    function listingWeakness() {
      const areaWeakModal = document.getElementById("js-area-weak");
      areaWeakModal.innerHTML = "";

      axios({
        method: "GET",
        url: `${infoPokemon.urlType}`,
      }).then((response) => {
        let weaknessess = response.data.damage_relations.double_damage_from;

        weaknessess.forEach((itemType) => {
          let textoType = itemType.name;
          let itemListWeak = document.createElement("li");
          areaWeakModal.appendChild(itemListWeak);

          let spanList = document.createElement("span");
          spanList.classList = `tag-type ${textoType}`;
          spanList.textContent = primeiraLetraM(textoType);
          itemListWeak.appendChild(spanList);
        });
      });
    }

    heightPokemonModal.textContent = `${infoPokemon.height / 10} m`;
    weightPokemonModal.textContent = `${infoPokemon.weight / 10} kg`;
    abilitiesPokemonModal.textContent = infoPokemon.mainAbilities;

    const statsHp = document.getElementById("js-stats-hp");
    const statsAttack = document.getElementById("js-stats-attack");
    const statsDefense = document.getElementById("js-stats-defense");
    const statsSpAttack = document.getElementById("js-stats-sp-attack");
    const statsSpDefense = document.getElementById("js-stats-sp-defense");
    const statsSpeed = document.getElementById("js-stats-speed");

    statsHp.style.width = `${infoPokemon.stats[0].base_stat}%`;
    statsAttack.style.width = `${infoPokemon.stats[1].base_stat}%`;
    statsDefense.style.width = `${infoPokemon.stats[2].base_stat}%`;
    statsSpAttack.style.width = `${infoPokemon.stats[3].base_stat}%`;
    statsSpDefense.style.width = `${infoPokemon.stats[4].base_stat}%`;
    statsSpeed.style.width = `${infoPokemon.stats[5].base_stat}%`;

    listingTypesPokemon();
    listingWeakness();
  });
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove("open-modal");
}

const cardPokemon = document.querySelectorAll(".js-open-details-pokemon");
const closeModal = document.getElementById("js-close-modal-details-pokemon");
const overlayModal = document.getElementById("js-overlay-modal");

cardPokemon.forEach((item) => {
  item.addEventListener("click", openDetailsPokemon);
});

if (closeModal) {
  closeModal.addEventListener("click", closeDetailsPokemon);
}

if (overlayModal) {
  overlayModal.addEventListener("click", closeDetailsPokemon);
}