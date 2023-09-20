// API
const animeList = document.querySelector("main");
const apiUrl = `https://api.jikan.moe/v4/top/anime`;

function createAnimeCard(anime) {
  const titleOfAnime = anime.title;
  const src = anime.images?.jpg?.large_image_url;
  const animeContainer = `<article class="anime-container">
        <figure class="img-container">
        <a href="${anime.trailer?.url}"  target="_blank">
            <img src="./img/play.png" alt="" class="play-icon">
        </a>
        <img class="cover-img" src="${src}" alt="">
        </figure>
        <h4 class="anime-title">${titleOfAnime}</h4>
        </article>`;
  animeList.innerHTML += animeContainer;
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((response) => {
    const animes = response.data;
    animes.forEach((anime) => {
      createAnimeCard(anime);
    });
  });

// Menu
const menuBtn = document.querySelector(".header-svg-icon");
menuBtn.addEventListener("click", () => {
  const menu = document.querySelector(".menu-phone");
  const main = document.querySelector("main");
  const carousel = document.querySelector(".hero-carousel");
  menu.classList.toggle("hidden");
  main.classList.toggle("hidden");
  carousel.classList.toggle("hidden");
});

// Search
const searchBtn = document.querySelector(".search-container");
const searchInput = document.querySelector(".search-input-container");
const heroContainer = document.querySelector(".hero-carousel");
searchBtn.addEventListener("click", () => {
  searchInput.classList.toggle("hidden");
  heroContainer.classList.toggle("hidden");
  document.querySelector("main").classList.toggle("hidden");
});

// Search-API
let results = document.querySelector(".results");
function createSearchCard(anime) {
  const titleOfAnime = anime.name;
  const src = anime.image_url;
  const animeContainer = `<article class="anime-container">
        <figure class="img-container">
        <img class="cover-img" src="${src}" alt="">
        </figure>
        <h4 class="anime-title">${titleOfAnime}</h4>
        </article>`;
  results.innerHTML += animeContainer;
}

function search(animeName) {
  fetch(`http://localhost:3000/search?animeName=${animeName}`)
    .then((response) => response.json())
    .then((response) => {
      const animes = response.categories[0].items;
      animes.forEach((anime) => {
        createSearchCard(anime);
      });
    });
}

// cuando se presiona enter en el input de busqueda se ejecuta la funcion search
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const animeName = document.querySelector(".search-input").value;
    search(animeName);
  }
});
// Slider
const container = document.querySelector(".carousel-container");
const cards = document.querySelectorAll(".carousel-card");
let currentIndex = 0;

function scrollToCard(index) {
  const card = cards[index];
  container.scrollTo({
    left: card.offsetLeft,
    behavior: "smooth",
  });
}

function nextCard() {
  currentIndex = (currentIndex + 1) % cards.length;
  scrollToCard(currentIndex);
}

setInterval(() => {
  nextCard();
}, 2500);
