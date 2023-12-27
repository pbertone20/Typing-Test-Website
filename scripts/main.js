import { auth } from "../firebaseConfig.js";
import {updateText, changeText} from "./quotable.js";

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
  //array of prompt span elements
  let spanArray = document.getElementById("mainText").querySelectorAll('span')
  //array of prompt characters
  let textCharacterArray = new Array();
  spanArray.forEach((span) => {
    textCharacterArray.push(span.innerText);
  })
  //let textCharacterArray = Array.prototype.slice.call(spanArray);
  //array of input characters
  let input = document.getElementById("textInput");
  let inputText = input.value.split('');
  

  textCharacterArray.forEach((CharacterSpan, index) => {
    let currentChar = inputText[index];
    if (currentChar == null) {
    } /*else if (currentChar == 127 && spanArray[index].className != "correct") {
      console.log("delete");
      textCharacterArray.splice(index, 1);
      changeText(textCharacterArray.join(''));
    } */else if (currentChar == textCharacterArray[index]) {
      spanArray[index].className = "correct";
    } else {
      textCharacterArray.splice(index, 0, currentChar); //array of characters
      console.log(textCharacterArray);
      changeText(textCharacterArray.join(''));
      spanArray[index].className = "incorrect";
    }
  })
  /*
  if (currentValue === initialValue) {
    timerId = setInterval(updateTimerAndIncrement, 100);
  }
  */
  //updateText();
});