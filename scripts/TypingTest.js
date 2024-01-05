/**
 * a class that represents the main functions of the typing test
 */
export class TypingTest {
  display = document.getElementById("testText");
  input = document.getElementById("textInput");
  text;

  constructor(newText, timerObj) {
    this.text = newText;
    this.displayText();
    this.testLength = this.getTestLength();
    this.timer = timerObj;
    this.currentWord = 0;
    this.currentLetter = 0;
    this.testStarted = false;
  }

  /**
   * formats and displays the text in the test div box
   */
  displayText() {
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
   * Gets the length of test text
   * 
   * @returns the length of the text in words
   */
  getTestLength() {
    return this.text.split(" ").length;
  }

  /**
   * resets the typing test and sets new text prompt
   * 
   * @param {a string of text for test prompt} newText 
   */
  reset(newText) {
    this.text = newText;
    this.timer.reset();
    this.currentWord = 0;
    this.currentLetter = 0;
    this.displayText();
    this.testStarted = false;
    this.input.value = '';
  }

  /**
   * wrapper method for the Timer start method
   */
  startTimer() {
    if (this.input.value != '' && this.testStarted == false) {
      this.timer.start();
      this.testStarted = true;
    }
  }

  /**
   * goes to the next word in the test
   */
  nextWord() {
    this.currentWord += 1;
    this.currentLetter = 0;
    this.input.value = '';
  }

  /**
   * updates the display of the text in response to the users input
   */
  updateTest() {
    this.startTimer();
    let wordArray = this.display.querySelectorAll('div');
    let letterArray = wordArray[this.currentWord].childNodes;
    const char = this.input.value.slice(-1);

    if (this.input.value.length < this.currentLetter) {
      if (letterArray[this.currentLetter].className == 'incorrect') {
        console.log("hii");
      } else {
        letterArray.className = '';
      }
      this.currentLetter -= 1;
    } else if (char == ' ') {
      this.nextWord();
    } else if (char == letterArray[this.currentLetter].innerText) {
      letterArray[this.currentLetter].className = 'correct';
      this.currentLetter += 1;
    } else {
      const wrongLetter = document.createElement('span');
      wrongLetter.innerText = char;
      wrongLetter.className = 'incorrect';
      letterArray[this.currentLetter].prepend(wrongLetter);
      this.currentLetter += 1;
    }
  }
}