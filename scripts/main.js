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
  if (inputLen == 1 || quoteLen == null) {
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
    console.log("Timer paused with ID");
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
  seconds = 0;
  timerId = clearInterval(timerId);
  resetTimer();
  console.log("Timer ended with id", timerId);
  document.getElementById("textInput").value = null;
}

document.getElementById("profileButton").addEventListener("click", () => {
  window.location.replace("log-in.html");
})

document.getElementById("textInput").addEventListener("input", () => {
  let textCharacterArray = document.getElementById("mainText").querySelectorAll('span');
  let inputText = document.getElementById("textInput").value.split('');
  textCharacterArray.forEach((CharacterSpan, index) => {
    let currentChar = inputText[index];
    if (currentChar == null) {
    } else if (currentChar == textCharacterArray[index].innerText) {
      textCharacterArray[index].className = "correct";
    } else {

      textCharacterArray[index].className = "incorrect";
    }
  })

  updateWithWPM(inputText.length, textCharacterArray.length);
});

function signOutGoogleUser() {
  auth.signOut().then(() => {
    console.log("Sign out successful...");
  }).catch((error) => {
    console.log(error);
  });
}

document.getElementById("signOutBtn").addEventListener("click", signOutGoogleUser);