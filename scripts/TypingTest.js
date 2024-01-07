/**
 * a class that represents the main functions of the typing test
 */
export class TypingTest {
  display = document.getElementById('testText');
  input = document.getElementById('textInput');
  text;

  constructor(newText, timerObj) {
    this.timer = timerObj;
    this.newTest(newText);
  }

  /**
   * resets the typing test and sets new text prompt
   * 
   * @param {a string of text for test prompt} newText 
   */
  newTest(newText) {
    this.text = newText;
    this.#displayText();
    this.timer.reset();
    this.testLength = this.text.split(' ').length;
    this.currentWord = 0;
    this.currentLetter = 0;
    this.testStarted = false;
    this.input.value = '';
  }

  /**
   * formats and displays the text in the test div box
   */
  #displayText() {
    this.display.innerHTML = ('');
    this.text.split(' ').forEach(word => {
      const wordDiv = document.createElement('div');
      wordDiv.className = 'word';
      wordDiv.innerHTML = '';
      word.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerHTML = char;
        wordDiv.appendChild(charSpan);
      });
      wordDiv.innerHTML += ' ';
      this.display.appendChild(wordDiv);
    })
  }

  /**
   * wrapper method for the Timer start method
   */
  #startTimer() {
    if (this.input.value != '' && this.testStarted == false) {
      this.timer.start();
      this.testStarted = true;
    }
  }

  /**
   * helper method for updateTest() that removes an invalid character
   * if the backspace is pressed for an invalid character
   * 
   * @param {the NodeList of the test words} wordList 
   * @param {the NodeList of the letters of the current word} letterList 
   */
  #removeInvalidChar(wordList, letterList) {
    // create an array of the characters of the word minus the removed invalid character
    let wordStore = new Array();
    for (let i = 0; i < letterList.length; i += 1) {
      if (i != this.currentLetter) {
        wordStore.push(letterList[i]);
      }
    }
    // update the word in the wordlist to the new characters
    wordList[this.currentWord].innerHTML = ''
    for (let i = 0; i < wordStore.length; i += 1) {
      wordList[this.currentWord].appendChild(wordStore[i]);
    }
  }

  /**
   * helper method for updateTest() that adds the most recent input character
   * as an invalid character
   * 
   * @param {the NodeList of the test words} wordList 
   * @param {the NodeList of the letters of the current word} letterList 
   * @param {the most recent input character} char 
   */
  #addInvalidChar(wordList, letterList, char) {
    let wordBuffer = new Array();
    for (let i = 0; i < letterList.length; i += 1) {
      wordBuffer.push(letterList[i]);
    }
    wordList[this.currentWord].innerHTML = '';
    for (let i = 0; i < wordBuffer.length; i += 1) {
      if (i == this.currentLetter) {
        const wrongLetter = document.createElement('span');
        wrongLetter.innerText = char;
        wrongLetter.className = 'incorrect';
        wordList[this.currentWord].appendChild(wrongLetter);
      }
      wordList[this.currentWord].appendChild(wordBuffer[i]);
    }
    this.currentLetter += 1;
  }

  /**
   * updates the display of the text in response to the users input
   */
  updateTest() {
    this.#startTimer();
    let wordList = this.display.childNodes;
    let letterList = wordList[this.currentWord].childNodes;
    const char = this.input.value.slice(-1);

    // the backspace key is pressed
    if (this.input.value.length < this.currentLetter) {
      this.currentLetter -= 1;
      if (letterList[this.currentLetter].className == 'incorrect') {
        this.#removeInvalidChar(wordList, letterList);
      } else {
        letterList.className = '';
      }

    // the character input is a space
    } else if (char == ' ') {
      this.currentWord += 1;
      this.currentLetter = 0;
      this.input.value = '';

    // the character input is the correct letter
    } else if (char == letterList[this.currentLetter].innerText) {
      letterList[this.currentLetter].className = 'correct';
      this.currentLetter += 1;

    // the character input is the wrong letter
    } else {
      this.#addInvalidChar(wordList, letterList, char);
    }
  }
}