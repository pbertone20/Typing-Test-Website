export class TypingTest {
  display;
  input;
  text;

  constructor(newText, displayID, inputID, timerObj) {
    try {
      this.setTestDisplay(displayID);
      this.setTestInput(inputID);
      this.text = newText;

      this.displayText();
      this.testLength = this.getTestLength();

    } catch(err) {
      this.setTestDisplay(null);
      this.setTestText(null);
      this.setTestInput(null);
      this.testLength = 0;
    }

    this.timer = timerObj;
    this.correctWords = 0;
    this.testStart = false;
    this.updateTest();
  }

  /**
   * Sets the text field to the input text
   * 
   * @param {the text for the test} text 
   */
  setTestText(newText) {
    this.text = newText;
  }

  /**
   * Sets the input field to the object with ID inputID 
   * 
   * @param {input element for the test} inputElement 
   */
  setTestInput(inputID) {
    this.input = document.getElementById(inputID);
    this.input.value = "";
  }

  /**
   * Sets the display field to the object with ID displayID
   * 
   * @param {div element where the test text is displayed} displayElement 
   */
  setTestDisplay(displayID) {
    this.display = document.getElementById(displayID);
    this.display.innerHTML = ("");
  }

  /**
   * Places the test text into the provided div area
   * 
   * @param {The div area where the text appears} displayDiv 
   */
  displayText() {
    try {
      this.display.innerHTML = ('');
      this.text.split('').forEach(char => {
        let characterSpan = document.createElement('span');
        characterSpan.innerText = char;
        this.display.appendChild(characterSpan);
      })
    } catch(err) {
      console.log("it broke :(");
    }
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
   * Updates the visible test text with the correct css classes
   */
  updateTest() {
    console.log("updateTest");
    if (this.testStart == false && this.input.value.length != 0) {
      this.timer.start();
      this.testStart = true;
    }
    let spanArray = this.display.querySelectorAll('span')
    let inputArray = this.input.value.split('');
    let skipLetter = false;
  
    this.display.innerHTML = "";
    spanArray.forEach((CharacterSpan, index) => {

      let currentChar = inputArray[index];
      if (currentChar == " " || skipLetter == true) {
        if (CharacterSpan.innerText == " ") {
          skipLetter = false;
          if (currentChar != " "){
            // adds back a space at the end of the skipped word
            this.input.value += " ";
          }
        } else {
          if (skipLetter == false && index + 1 == inputArray.length) {
            // you first press space
            skipLetter = true;
            this.input.selectionEnd = this.input.selectionEnd - 1;
            this.input.value = this.input.value.slice(0, -1);
          }
          CharacterSpan.className = "invalid"
          this.input.value += CharacterSpan.innerText;
        }

      } else {
        // When input is backspace
        if (currentChar == null) {
          if (CharacterSpan.className == "incorrect") {
            CharacterSpan.className = "remove";
          } else if (CharacterSpan.className == "invalid") {
            let currentInvalid = CharacterSpan;
            let i = index;
            while (currentInvalid.className == "invalid") {
              i = i - 1;
              currentInvalid.className = "";
              currentInvalid = spanArray[i];
            }
            this.input.selectionEnd = this.input.selectionEnd + ((i - index) + 1);
            this.input.value = this.input.value.slice(0, (i - index + 1));
          } else { 
            CharacterSpan.className = "";
          }
  
        // When the new character is correct
        } else if (currentChar == CharacterSpan.innerText && CharacterSpan.className != "incorrect" && CharacterSpan.className != "invalid") {
          CharacterSpan.className = "correct";
  
        // Adding new incorrect characters
        } else if (CharacterSpan.className != "incorrect" && CharacterSpan.className != "invalid") {
          let newCharacter = document.createElement('span');
          newCharacter.innerText = currentChar;
          newCharacter.className = "incorrect";
          this.display.appendChild(newCharacter);
        }
  
      } 
  
      // Adds back all characters not marked for removal
      if (CharacterSpan.className != "remove") {
        this.display.appendChild(CharacterSpan);
      }
    })
  
    //updateWithWPM(this.input.value.length, inputArray.length);
  }
}
