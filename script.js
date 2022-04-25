const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");
const body = document.querySelector("body");

let apiQuotes = [];

// Show Loading
function loading() {
  quoteContainer.classList.add("hidden");
  loader.hidden = false;
}

// Hide Loading
function complete() {
  loader.hidden = true;
  quoteContainer.classList.remove("hidden");
  // quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random code locally
  // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // return quote;

  // Pick a random code from api
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if the author field is blank and replace it with "Anonymous"
  authorText.textContent = quote?.author ? `- ${quote.author}` : "- Anonymous";

  // Check the code length to style accordingly
  quote?.text.length > 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
  // return quote;
}

// Get Quotes From API

async function getQuotes() {
  loadImage();
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote(apiQuotes);
  } catch (err) {
    // Catch Error Here
    console.error(err);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}

// Load different Image
function loadImage() {
  const imageArr = [
    "./assets/imgs/bg1.jpg",
    "./assets/imgs/bg2.jpg",
    "./assets/imgs/bg3.jpg",
    "./assets/imgs/bg4.jpg",
    "./assets/imgs/bg5.jpg",
    "./assets/imgs/bg6.jpg",
  ];
  const randomNumber = Math.floor(Math.random() * imageArr.length);
  console.log(imageArr[randomNumber]);
  body.style.backgroundImage = `url(${imageArr[randomNumber]})`;
}
// Event listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();

// console.log(newQuote());
