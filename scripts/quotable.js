const RANDOM_QUOTE = "http://api.quotable.io/random"

function getQuote() {
   return fetch(RANDOM_QUOTE)
      .then(response => response.json())
      .then(data => data.content)
}