const RANDOM_QUOTE = "http://api.quotable.io/random"

function getQuote() {
   return fetch(RANDOM_QUOTE)
      .then(response => response.json())
      .then(data => data.content)
}

export async function updateText() {
   const quoteDisplay = document.getElementById('mainText');

   const text = await getQuote();
   quoteDisplay.innerHTML = ('');
   text.split('').forEach(character => {
      const characterSpan = document.createElement('span');
      characterSpan.innerText = character;
      quoteDisplay.appendChild(characterSpan);
   })
}