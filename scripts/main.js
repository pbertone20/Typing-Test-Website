import { auth } from "../firebaseConfig.js";
import { TypingTest } from "./TypingTest.js";
import { Timer } from "./Timer.js";

const RANDOM_QUOTE = "https://zenquotes.io/api/random"
let timer = new Timer(0, 99999999, 1, "timer");
const test = new TypingTest(await getQuote(), timer);

/**
 * gets a new text prompt for the typing test
 * 
 * @returns a new random test prompt
 */
async function getQuote() {
  return fetch(RANDOM_QUOTE)
    .then(response => response.json())
    .then(data => data.q)
}

/**
 * wrapper method for the TypingTest newTest() method
 */
async function getNewTest() {
  const quote = await getQuote();
  test.newTest(quote);
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
  location.reload();
});

document.getElementById("titleButton").addEventListener("click", () => {
  window.location.replace("index.html");
});

document.getElementById("profileButton").addEventListener("click", () => {
  window.location.replace("log-in.html");
});

document.getElementById("textInput").addEventListener("input", () => {
  test.updateTest();
});

document.getElementById("signOutBtn").addEventListener("click", signOutGoogleUser);

document.getElementById("testFocus").addEventListener("click", () => {
  document.getElementById("textInput").focus();
});