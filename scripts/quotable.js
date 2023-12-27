const RANDOM_QUOTE = "http://api.quotable.io/random"

function getQuote() {
   return fetch(RANDOM_QUOTE)
      .then(response => response.json())
      .then(data => data.content)
}

export async function updateText() {
   const text = await getQuote();
   changeText(text);
}

export function changeText(text) {
   const quoteDisplay = document.getElementById('mainText');
   const quoteInput = document.getElementById("textInput");
   quoteInput.value = "";
   quoteDisplay.innerHTML = '';
   text.split('').forEach(character => {
      const quoteDisplay = document.getElementById('mainText');
      const characterSpan = document.createElement('span');
      characterSpan.innerText = character;
      quoteDisplay.appendChild(characterSpan);
   })
   
}