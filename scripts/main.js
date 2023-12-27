import { auth } from "../firebaseConfig.js";
import {updateText, changeText} from "./quotable.js";

let seconds = 0;
let timerId;
let initialValue;
let numWords = 0;

function updateTimer() {
  document.getElementById("timer").innerText = seconds + " seconds";
}
function updateTimerAndIncrement() {
  document.getElementById("timer").innerText = seconds + " seconds";
  seconds++;
}

document.addEventListener("DOMContentLoaded", () => {
  // check if the user is signed in
  auth.onAuthStateChanged((user) => {
    // if the user is signed in load index.html
    if (user) {
      console.log("User is authenticated");
    }
    // if not re-route them to the login page
    /*
    else {
      window.location.href = "log-in.html";
    }
    */

    updateText();
    //initialValue = document.getElementById('prompt-input').value;
  });
});

document.getElementById("newPrompt").addEventListener("click", () => {
  newPrompt();
  document.getElementById("textInput").focus();
});

document.getElementById("titleButton").addEventListener("click", () => {
  window.location.replace("index.html");
  newPrompt();
})

function newPrompt() {
  (async() => {
    numWords = await updateText();
  })();
  seconds = 0;
  clearInterval(timerId);
  updateTimer();
  document.getElementById("textInput").value = null;
}

document.getElementById("profileButton").addEventListener("click", () => {
  window.location.replace("log-in.html");
})

document.getElementById("textInput").addEventListener("input", () => {
  let quoteDisplay = document.getElementById("mainText");
  //array of prompt span elements
  let spanArray = document.getElementById("mainText").querySelectorAll('span')
  //array of input characters
  let inputText = document.getElementById("textInput").value.split('');
  /*
  if (inputText.length == 1) {
    timerId = setInterval(updateTimerAndIncrement, 1000);
  }
  */

  quoteDisplay.innerHTML = '';
  spanArray.forEach((CharacterSpan, index) => {
    let currentChar = inputText[index];

    if (currentChar == null) {
      if (CharacterSpan.className == "incorrect") {
        CharacterSpan.className = "remove";
      } else { 
        CharacterSpan.className = "";
      }
    } else if (currentChar == CharacterSpan.innerText && CharacterSpan.className != "incorrect") {
      CharacterSpan.className = "correct";

    } else if (CharacterSpan.className != "incorrect") {
      let newCharacter = document.createElement('span');
      newCharacter.innerText = currentChar;
      newCharacter.className = "incorrect";
      quoteDisplay.appendChild(newCharacter);
    }
    if (CharacterSpan.className != "remove") {
      quoteDisplay.appendChild(CharacterSpan);
    }
  })
});