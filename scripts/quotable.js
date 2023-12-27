const RANDOM_QUOTE = "http://api.quotable.io/random"

let text = ""
let character = 0

export async function getQuote() {
   return fetch(RANDOM_QUOTE)
      .then(response => response.json())
      .then(data => data.content)
}


export async function newQuote() {
   text = await getQuote()
   document.getElementById("prompt").innerHTML = text
   document.getElementById("prompt-input").value = ""
   character = 0
}

export function updateText() {
   console.log(text[character] == document.getElementById("prompt-input").value[character])
}