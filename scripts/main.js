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
  updateText();
  seconds = 0;
  clearInterval(timerId);
  updateTimer();
  document.getElementById("textInput").value = null
});

document.getElementById("textInput").addEventListener("change", () => {
  let currentValue = this.value;

  if (currentValue === initialValue) {
    timerId = setInterval(updateTimerAndIncrement, 100);
  }

  updateText();
});