const RANDOM_QUOTE = "http://api.quotable.io/random"

let numWords = 0;

function getQuote() {
   return fetch(RANDOM_QUOTE)
      .then(response => response.json())
      .then(data => data.content)
}

export async function updateText() {
   const text = await getQuote()
   changeText(text);
   return numWords;
}

export function changeText(text) {
   numWords = 1;
   const quoteDisplay = document.getElementById('mainText');
   const quoteInput = document.getElementById("textInput");
   quoteInput.value = "";
   quoteDisplay.innerHTML = '';
   text.split('').forEach(character => {
      if (character == ' ') {
         numWords = numWords + 1;
      }
      const quoteDisplay = document.getElementById('mainText');
      const characterSpan = document.createElement('span');
      characterSpan.innerText = character;
      quoteDisplay.appendChild(characterSpan);
   })
   return numWords;
}