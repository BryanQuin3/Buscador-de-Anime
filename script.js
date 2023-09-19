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
  menu.classList.toggle("hidden");
  main.classList.toggle("hidden");
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
