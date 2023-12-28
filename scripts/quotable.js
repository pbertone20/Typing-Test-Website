const RANDOM_QUOTE = "https://api.quotable.io/random"

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
      addCharacterToText(character);
   })
}

export function addCharacterToText(char) {
   const quoteDisplay = document.getElementById('mainText');
   const characterSpan = document.createElement('span');
   characterSpan.innerText = char;
   quoteDisplay.appendChild(characterSpan);
}