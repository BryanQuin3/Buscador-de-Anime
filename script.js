// API
const animeList = document.querySelector(".list-container");
const apiUrl = `https://api.jikan.moe/v4/top/anime`;

function createAnimeCard(anime, elemento) {
  const titleOfAnime = anime.title;
  const src = anime.images?.jpg?.large_image_url;
  const animeContainer = `<article class="anime-container">
        <figure class="img-container">
        <a href="${anime.trailer?.url}"  target="_blank">
            <img src="./img/play.png" alt="" class="play-icon">
        </a>
        <img class="cover-img" src="${src}" alt="">
        </figure>
        <p class="anime-title">${titleOfAnime}</p>
        <p class="anime-genre">${anime.genres[0].name}</p>
        </article>`;
  elemento.innerHTML += animeContainer;
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((response) => {
    const animes = response.data;
    animes.forEach((anime) => {
      createAnimeCard(anime, animeList);
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
const searchBtn = document.querySelector(".search");
const searchInput = document.querySelector(".search-input-container");
const heroContainer = document.querySelector(".hero-carousel");
searchBtn.addEventListener("click", () => {
  searchInput.classList.toggle("hidden");
  heroContainer.classList.toggle("hidden");
  document.querySelector("main").classList.toggle("hidden");
});

// Search-API
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

// cuando se presiona enter en el input de busqueda se ejecuta la funcion search
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    results.innerHTML = "";
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
}, 3000);

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

function setWidth(timeLeft, id) {
  const watchingVideo = document.querySelector(`#${id}`);
  const timePercentage = Math.floor((timeLeft * 100) / 24);
  watchingVideo.style.setProperty("--newWidth", `${timePercentage}%`);
}

// Watching List
const watchingList = document.querySelector(".anime-watching-container");
function createWatchingCard(id, anime, episode, timeLeft, elemento) {
  const titleOfAnime = anime.title;
  const src = anime.images?.jpg?.large_image_url;
  const duration = `${timeLeft} min`;
  const gender = anime.genres[0].name;
  const animeContainer = `<article class="watching">
        <div class="cover-container" id=${id}>
          <img class="img-cover" src="${src}" alt="" />
          <img class="play-icon" src="./img/watching.svg" alt="" />
          <span class="minutes">${duration}</span>
        </div>
        <div class="watching-info">
          <h5 class="watching-title">${titleOfAnime}</h5>
          <p class="watching-episode">${episode}</p>
          <p class="anime-genre">${gender}</p>
        </div>
  </article>`;
  elemento.innerHTML += animeContainer;
}

const watchingListApi = `https://api.jikan.moe/v4/seasons/now?&limit=3`;
let idComponent = 0;
fetch(watchingListApi)
  .then((response) => response.json())
  .then((response) => {
    const animes = response.data;
    animes.forEach((anime) => {
      const id = anime.mal_id;
      setTimeout(() => {
        fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`)
          .then((response) => response.json())
          .then((response) => {
            const episodes = response.data;
            const episode = episodes[0].title;
            const timeLeft = getRandomNumber(1, 24);
            const time = 24 - timeLeft;
            const idName = `anime-${idComponent}`;
            createWatchingCard(idName, anime, episode, time, watchingList);
            setWidth(timeLeft, idName);
            idComponent++;
          });
      }, 1000);
    });
  });
