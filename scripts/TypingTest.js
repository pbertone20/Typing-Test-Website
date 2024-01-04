/**
 * a class that represents the main functions of the typing test
 */
export class TypingTest {
  display = document.getElementById("mainText");
  input = document.getElementById("textInput");
  text;

  constructor(newText, timerObj) {
    this.text = newText;
    this.displayText();
    this.testLength = this.getTestLength();
    this.timer = timerObj;
    this.correctWords = 0;
    this.testStart = false;
    this.updateTest();
  }

  displayText() {
    try {
      this.display.innerHTML = ('');
      this.text.split('').forEach(char => {
        let characterSpan = document.createElement('span');
        characterSpan.innerText = char;
        this.display.appendChild(characterSpan);
      })
    } catch(err) {
      alert("it broke :(");
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

  reset(newText) {
    this.text = newText;
    this.timer.reset();
    this.correctWords = 0;
    this.displayText();
  }

  /**
   * Updates the visible test text with the correct css classes
   */
  updateTest() {
    let currentWord = 0;

    console.log("updateTest");
    if (this.testStart == false && this.input.value.length != 0) {
      this.timer.start();
      this.testStart = true;
    }
    let spanArray = this.display.querySelectorAll('span');
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
            currentWord += 1;
          }
          CharacterSpan.className = "invalid";
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