import { auth } from "../firebaseConfig.js";
import { TypingTest } from "./TypingTest.js";
import { Timer } from "./Timer.js";

const RANDOM_QUOTE = "http://api.quotable.io/random"

let timer = new Timer(0, 99999999, 1, "timer");
let test = new TypingTest(await getQuote(), timer);

/**
 * gets a new text prompt for the typing test
 * 
 * @returns a new random test prompt
 */
async function getQuote() {
  return fetch(RANDOM_QUOTE)
    .then(response => response.json())
    .then(data => data.content)
}

/**
 * creates a new timer and typing test object
 */
async function getNewTest() {
  test.reset(await getQuote());
}

/**
 * signs out the current user
 */
function signOutGoogleUser() {
  auth.signOut().then(() => {
    console.log("Sign out successful...");
  }).catch((error) => {
    console.log(error);
  });
}

// all the event listeners
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

document.getElementById("signOutBtn").addEventListener("click", signOutGoogleUser);