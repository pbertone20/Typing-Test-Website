import { auth } from "../firebaseConfig.js";
import { updateText } from "./quotable.js";

let seconds = 0;
let maxLenReached = false;
let timerId;

function updateTimer() {
  document.getElementById("timer").innerText = seconds + " seconds " + wpmCalc() + " WPM";
}

function resetTimer() {
  document.getElementById("timer").innerText = 0 + " seconds " + 0 + " WPM";
}

function updateTimerAndIncrement() {
  document.getElementById("timer").innerText = seconds + " seconds " + wpmCalc() + " WPM";
  seconds++;
}

function wpmCalc() {
  let wordArr = document.getElementById("textInput").value.split(" ");
  let len = wordArr.length;

  return Math.round(len / (seconds / 60));
}

function updateWithWPM(inputLen, quoteLen) {
  if (inputLen == 1) {
    maxLenReached = false;
    console.log("Timer started with ID", timerId);
    timerId = setInterval( () => {
      if (maxLenReached === false) {
        updateTimerAndIncrement();
      }
    }, 1000);
  }

  if (inputLen === quoteLen) {
    maxLenReached = true;
    document.getElementById("timer").innerText = seconds + " seconds " + wpmCalc() + " WPM";
    console.log("Timer paused with ID", timerId);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User is authenticated");
    }

    updateText();
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
  updateText();
  clearInterval(timerId);
  console.log("Timer ended with id", timerId);
  seconds = 0;
  maxLenReached = false;
  document.getElementById("textInput").value = null;
  resetTimer();
}

document.getElementById("profileButton").addEventListener("click", () => {
  window.location.replace("log-in.html");
})

document.getElementById("textInput").addEventListener("input", () => {
  let quoteDisplay = document.getElementById("mainText");
  //array of prompt span elements
  let spanArray = document.getElementById("mainText").querySelectorAll('span')
  let textInput = document.getElementById("textInput");
  //array of input characters
  let inputArray = textInput.value.split('');

  let space = false;

  quoteDisplay.innerHTML = "";
  spanArray.forEach((CharacterSpan, index) => {
    let currentChar = inputArray[index];
  
    if (currentChar == " " || space == true) {
      console.log("invalid");
      if (CharacterSpan.innerText == " ") {
        space = false;
        if (currentChar != " "){
          textInput.value += " ";
        }
      } else {
        if (space == false && index + 1 == inputArray.length) {
          space = true;
          textInput.selectionEnd = textInput.selectionEnd - 1;
          textInput.value = textInput.value.slice(0, -1);
        }
        CharacterSpan.className = "invalid"
        textInput.value += CharacterSpan.innerText;
      }
    } else {

      // When input is backspace
      if (currentChar == null) {
        if (CharacterSpan.className == "incorrect") {
          CharacterSpan.className = "remove";
        } else if (CharacterSpan.className == "invalid") {
          let currentInvalid = CharacterSpan;
          let i = index;
          while (currentInvalid.className == "invalid") {
            i = i - 1;
            currentInvalid.className = "";
            currentInvalid = spanArray[i];
          }
          textInput.selectionEnd = textInput.selectionEnd + ((i - index) + 1);
          textInput.value = textInput.value.slice(0, (i - index + 1));
        } else { 
          CharacterSpan.className = "";
        }

      // When the new character is correct
      } else if (currentChar == CharacterSpan.innerText && CharacterSpan.className != "incorrect" && CharacterSpan.className != "invalid") {
        CharacterSpan.className = "correct";

      // Adding new incorrect characters
      } else if (CharacterSpan.className != "incorrect" && CharacterSpan.className != "invalid") {
        let newCharacter = document.createElement('span');
        newCharacter.innerText = currentChar;
        newCharacter.className = "incorrect";
        quoteDisplay.appendChild(newCharacter);
      }

    } 

    // Adds back all characters not marked for removal
    if (CharacterSpan.className != "remove") {
      quoteDisplay.appendChild(CharacterSpan);
    }
  })

  updateWithWPM(textInput.value.length, inputArray.length);
});

function signOutGoogleUser() {
  auth.signOut().then(() => {
    console.log("Sign out successful...");
  }).catch((error) => {
    console.log(error);
  });
}

document.getElementById("signOutBtn").addEventListener("click", signOutGoogleUser);