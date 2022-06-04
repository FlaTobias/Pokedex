// Load More Button

const btnLoadMore = document.getElementById("js-btn-load-more");
let countPagination = 10;

function showMorePokemon() {
  listingPokemons(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`
  );
  countPagination += 9;
}

if (btnLoadMore) {
  btnLoadMore.addEventListener("click", showMorePokemon);
}
