// Função para buscar pokemon
function searchPokemon() {
  let valueInput = inputSearch.value.toLowerCase();
  const typeFilter = document.querySelectorAll(".type-filter");

  typeFilter.forEach((type) => {
    type.classList.remove("active");
  });

  axios({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${valueInput}`,
  })
    .then((response) => {
      areaPokemons.innerHTML = "";
      btnLoadMore.style.display = "none";
      countPokemons.textContent = 1;

      const { name, id, sprites, types } = response.data;
      const infoCard = {
        code: id,
        name: name,
        type: types[0].type.name,
        image: sprites.other.dream_world.front_default,
      };

      if (infoCard.image) {
        createCardPokemon(
          infoCard.code,
          infoCard.name,
          infoCard.type,
          infoCard.image
        );
      }

      const cardPokemon = document.querySelectorAll(".js-open-details-pokemon");

      cardPokemon.forEach((card) => {
        if (card) {
          card.addEventListener("click", openDetailsPokemon);
        }
      });
    })
    .catch((err) => {
      if (err.response) {
        areaPokemons.innerHTML = "";
        btnLoadMore.style.display = "none";
        countPokemons.textContent = 0;
        alert("Não foi encontrado!");
      }
    });
}

function clickEnter(event) {
  if (event.code === "Enter") {
    searchPokemon();
  }
}

const inputSearch = document.getElementById("js-input-search");
const btnSearch = document.getElementById("js-btn-search");

if (btnSearch) {
  btnSearch.addEventListener("click", searchPokemon);
}

if (inputSearch) {
  inputSearch.addEventListener("keyup", clickEnter);
}
