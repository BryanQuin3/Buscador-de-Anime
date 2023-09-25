function createAnimeCard(anime, elemento) {
  const titleOfAnime = anime.title;
  const src = anime.images?.jpg?.large_image_url;
  const gender = anime.genres[0]?.name || "Generic";
  const animeContainer = `<article class="anime-container">
            <figure class="img-container">
            <a href="${anime.trailer?.url}"  target="_blank">
                <img src="./img/play.png" alt="" class="play-icon">
            </a>
            <img class="cover-img" src="${src}" alt="">
            </figure>
            <p class="anime-title">${titleOfAnime}</p>
            <p class="anime-genre">${gender}</p>
            </article>`;
  elemento.innerHTML += animeContainer;
}
// Search
const searchInput = document.querySelector("#search-input");
let results = document.querySelector(".results");

function search(animeName) {
  fetch(`https://api.jikan.moe/v4/anime?q=${animeName}`)
    .then((response) => response.json())
    .then((response) => {
      const animes = response.data;
      animes.forEach((anime) => {
        const name = anime.title;
        // si name incluye el animeName que se busca se crea una card
        if (name.includes(animeName)) {
          createAnimeCard(anime, results);
        }
      });
    });
}

// transformar la primera letra a mayuscula de cada palabra
function capitalizeFirstLetter(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// cuando se presiona enter en el input de busqueda se ejecuta la funcion search
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    results.innerHTML = "";
    const animeName = document.querySelector("#search").value;
    const animeNameCapitalized = capitalizeFirstLetter(animeName);
    search(animeNameCapitalized);
  }
});
