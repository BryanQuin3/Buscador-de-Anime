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
