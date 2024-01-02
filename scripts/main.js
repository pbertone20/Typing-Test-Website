import { auth } from "../firebaseConfig.js";
import { TypingTest } from "./TypingTest.js";

const RANDOM_QUOTE = "http://api.quotable.io/random"

function getQuote() {
   return fetch(RANDOM_QUOTE)
      .then(response => response.json())
      .then(data => data.content)
}

let bruh = "hi this is claire";

let seconds = 0;
let maxLenReached = false;
let timerId;
let test;
getNewTest();

async function getNewTest() {
  test =  new TypingTest(await getQuote(), "mainText", "textInput");
}

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

    test = getNewTest();
  });
});

document.getElementById("newPrompt").addEventListener("click", () => {
  getNewTest();
  document.getElementById("textInput").focus();
});

document.getElementById("titleButton").addEventListener("click", () => {
  window.location.replace("index.html");
  getNewTest();
})

document.getElementById("profileButton").addEventListener("click", () => {
  window.location.replace("log-in.html");
})

document.getElementById("textInput").addEventListener("input", () => {
  test.updateTest();
});

function signOutGoogleUser() {
  auth.signOut().then(() => {
    console.log("Sign out successful...");
  }).catch((error) => {
    console.log(error);
  });
}

document.getElementById("signOutBtn").addEventListener("click", signOutGoogleUser);