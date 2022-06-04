//Filtrar pokemons por tipo

function filterPokemonType() {
  let idPokemon = this.getAttribute("code-type");
  const allTypes = document.querySelectorAll(".type-filter");
  areaPokemons.innerHTML = "";
  btnLoadMore.style.display = "none";

  const sectionPokemons = document.querySelector(".s-all-info-pokemons");
  const topSection = sectionPokemons.offsetTop;
  window.scrollTo({
    top: topSection + 288,
    behavior: "smooth",
  });

  allTypes.forEach((type) => {
    type.classList.remove("active");
  });

  this.classList.add("active");

  if (idPokemon) {
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/type/${idPokemon}`,
    }).then((response) => {
      const { pokemon } = response.data;
      countPokemons.textContent = pokemon.length;

      pokemon.forEach((pok) => {
        const { url } = pok.pokemon;
        axios({
          method: "GET",
          url: `${url}`,
        }).then((response) => {
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

          const cardPokemon = document.querySelectorAll(
            ".js-open-details-pokemon"
          );

          cardPokemon.forEach((card) => {
            if (card) {
              card.addEventListener("click", openDetailsPokemon);
            }
          });
        });
      });
    });
  } else {
    areaPokemons.innerHTML = "";
    listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");
    btnLoadMore.style.display = "block";
  }
}

//Listar filtro de pokemons

const areaTypes = document.getElementById("js-type-area");
const areaTypesMobile = document.querySelector(".dropdown-select");

axios({
  method: "GET",
  url: "https://pokeapi.co/api/v2/type",
}).then((response) => {
  const { results } = response.data;

  results.forEach((type, index) => {
    if (index < 18) {
      let itemType = document.createElement("li");
      areaTypes.appendChild(itemType);

      let buttonType = document.createElement("button");
      buttonType.classList = `type-filter ${type.name}`;
      buttonType.setAttribute("code-type", index + 1);
      itemType.appendChild(buttonType);

      let iconType = document.createElement("div");
      iconType.classList = "icon";
      buttonType.appendChild(iconType);

      let srcType = document.createElement("img");
      srcType.setAttribute("src", `img/icon-types/${type.name}.svg`);
      iconType.appendChild(srcType);

      let nameType = document.createElement("span");
      nameType.textContent = primeiraLetraM(type.name);
      buttonType.appendChild(nameType);

      //Select Mobile
      let itemTypeMobile = document.createElement("li");
      areaTypesMobile.appendChild(itemTypeMobile);

      let buttonTypeMobile = document.createElement("button");
      buttonTypeMobile.classList = `type-filter ${type.name}`;
      buttonTypeMobile.setAttribute("code-type", index + 1);
      itemTypeMobile.appendChild(buttonTypeMobile);

      let iconTypeMobile = document.createElement("div");
      iconTypeMobile.classList = "icon";
      buttonTypeMobile.appendChild(iconTypeMobile);

      let srcTypeMobile = document.createElement("img");
      srcTypeMobile.setAttribute("src", `img/icon-types/${type.name}.svg`);
      iconTypeMobile.appendChild(srcTypeMobile);

      let nameTypeMobile = document.createElement("span");
      nameTypeMobile.textContent = primeiraLetraM(type.name);
      buttonTypeMobile.appendChild(nameTypeMobile);

      const allTypes = document.querySelectorAll(".type-filter");

      allTypes.forEach((btn) => {
        if (btn) {
          btn.addEventListener("click", filterPokemonType);
        }
      });
    }
  });
});
