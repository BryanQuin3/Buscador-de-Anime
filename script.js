function getDay() {
  // Obtener el día de la semana
  const date = new Date();
  const day = date.getDay();
  // Obtener el nombre del día de la semana en ingles
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "other",
  ];
  const dayName = days[day - 1];
  return dayName;
}

const day = getDay();
const urlDay = `https://api.jikan.moe/v4/schedules?filter=${day}`;
const dayContainer = document.querySelector(".day-container");

setTimeout(getAnimes(urlDay, dayContainer), 1000);

// Recomendations
const animeList = document.querySelector(".recommendations");
const apiUrl = `https://api.jikan.moe/v4/top/anime`;

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

function getAnimes(url, elemento) {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const animes = response.data;
      animes.forEach((anime) => {
        createAnimeCard(anime, elemento);
      });
    });
}

setTimeout(getAnimes(apiUrl, animeList), 1000);

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

// Slider
const container = document.querySelector(".carousel-container");
const cards = document.querySelectorAll(".carousel-card");
const nextBtn = document.querySelector(".position-right");
const prevBtn = document.querySelector(".position-left");
let currentIndex = 0;
let intervalId;
let touchStartX = 0;
let touchEndX = 0;

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

function startSlider() {
  intervalId = setInterval(() => {
    nextCard();
  }, 3000);
}

startSlider();

container.addEventListener("touchstart", (e) => {
  clearInterval(intervalId);
  touchStartX = e.touches[0].clientX;
});

container.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;

  if (touchEndX < touchStartX) {
    nextCard();
  } else if (touchEndX > touchStartX) {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    scrollToCard(currentIndex);
  }
  startSlider();
});

prevBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  scrollToCard(currentIndex);
  startSlider();
});

nextBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  nextCard();
  startSlider();
});

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
      }, 1500);
    });
  });
