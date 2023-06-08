const API_KEY = "bc33b70a56d548e6aaf0a484b7f87a61";
const url = "https://newsapi.org/v2/everything?q=";

// call api on loading the page initially

window.addEventListener("load", () => fetchNews("tesla"));

// reload on clicking company logo

function reload() {
  window.location.reload();
}

// fetching data from the api from newsapi.org

async function fetchNews(query) {
  const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await response.json();

  //   console.log("fetch data");
  //   console.log(data);

  bindData(data.articles);
}

// binding data in the cards

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

// filling data in card

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  //   displaying date and time in human readable format

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} . ${date}`;

  //   opening source page on clicking the card

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

// toggle active class from different nav ul li items

let curSelectedNav = null;
function onNavItemClicked(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

// adding functionality to search button and text box

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
