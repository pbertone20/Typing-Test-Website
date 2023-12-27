import { auth } from "../firebaseConfig.js";
import { updateText } from "./quotable.js";
//import { signOut } from "firebase/auth";

let seconds = 0;


function updateTimer() {
  document.getElementById("timer").innerText = seconds + " seconds";
}
function updateTimerAndIncrement() {
  document.getElementById("timer").innerText = seconds + " seconds";
  seconds++;
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
  updateTimer();
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
});

function signOutGoogleUser() {
  auth.signOut().then(() => {
    console.log("Sign out successful...");
  }).catch((error) => {
    console.log(error);
  });
}

document.getElementById("signOutBtn").addEventListener("click", signOutGoogleUser);