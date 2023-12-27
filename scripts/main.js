import { auth } from "../firebaseConfig.js";
import {updateText } from "./quotable.js";

let seconds = 0;
let timerId;
let initialValue;

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
  updateText();
  seconds = 0;
  clearInterval(timerId);
  updateTimer();
  document.getElementById("textInput").value = null;
}

document.getElementById("profileButton").addEventListener("click", () => {
  window.location.replace("log-in.html");
})

document.getElementById("textInput").addEventListener("input", () => {
  //let currentValue = this.value;
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
  /*
  if (currentValue === initialValue) {
    timerId = setInterval(updateTimerAndIncrement, 100);
  }
  */
  //updateText();
});