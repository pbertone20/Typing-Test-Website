import { auth } from "../firebaseConfig.js";
import { newQuote, updateText } from "./quotable.js";

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
      newQuote
    }
    // if not re-route them to the login page
    else {
      window.location.href = "log-in.html";
    }

    newQuote();
    initialValue = document.getElementById('prompt-input').value;
  });
});

document.getElementById("newQuote").addEventListener("click", () => {
  newQuote();
  seconds = 0;
  clearInterval(timerId);
  updateTimer();
});

document.getElementById("prompt-input").addEventListener("change", () => {
  let currentValue = this.value;

  if (currentValue === initialValue) {
    timerId = setInterval(updateTimerAndIncrement, 100);
  }

  updateText();
});
