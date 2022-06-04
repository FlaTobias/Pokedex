//API
const countPokemons = document.getElementById("js-count-pokemons");
const areaPokemons = document.getElementById("js-list-pokemons");
function createCardPokemon(code, name, type, imagePok) {
  let card = document.createElement("button");
  card.classList = `card-pokemon js-open-details-pokemon ${type}`;
  card.setAttribute("code-pokemon", code);
  areaPokemons.appendChild(card);

  let image = document.createElement("div");
  image.classList = "image";
  card.appendChild(image);

  let imageSrc = document.createElement("img");
  imageSrc.classList = "thumb-img";
  imageSrc.setAttribute("src", imagePok);
  image.appendChild(imageSrc);

  let infoCardPokemon = document.createElement("div");
  infoCardPokemon.classList = "info";
  card.appendChild(infoCardPokemon);

  let infoTextPokemon = document.createElement("div");
  infoTextPokemon.classList = "text";
  infoCardPokemon.appendChild(infoTextPokemon);

  let codePokemon = document.createElement("span");
  codePokemon.textContent =
    code < 10 ? `#00${code}` : code < 100 ? `#0${code}` : `#${code}`;
  infoTextPokemon.appendChild(codePokemon);

  let namePokemon = document.createElement("h3");
  namePokemon.textContent = primeiraLetraM(name);
  infoTextPokemon.appendChild(namePokemon);

  let areaIcon = document.createElement("div");
  areaIcon.classList = "icon";
  infoCardPokemon.appendChild(areaIcon);

  let imgType = document.createElement("img");
  imgType.setAttribute("src", `img/icon-types/${type}.svg`);
  areaIcon.appendChild(imgType);
}

function listingPokemons(urlApi) {
  axios({
    method: "GET",
    url: urlApi,
  }).then((response) => {
    const countPokemons = document.getElementById("js-count-pokemons");
    const { results, count } = response.data;
    countPokemons.innerHTML = count;

    results.forEach((pokemons) => {
      let urlApiDetails = pokemons.url;

      axios({
        method: "GET",
        url: `${urlApiDetails}`,
      }).then((response) => {
        const { name, id, sprites, types } = response.data;
        const infoCard = {
          code: id,
          name: name,
          type: types[0].type.name,
          image: sprites.other.dream_world.front_default,
        };

        createCardPokemon(
          infoCard.code,
          infoCard.name,
          infoCard.type,
          infoCard.image
        );

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
}

function primeiraLetraM(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");
