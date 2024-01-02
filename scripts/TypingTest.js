export class TypingTest {
    display;
    input;
    text;
    constructor(newText, displayElement, inputElement) {
        try {
            this.setTestDisplay(displayElement);
            this.setTestInput(inputElement);
            this.setTestText(newText);

            this.displayText(display);
            this.testLength = getTestLength();
    
        } catch(err) {
            this.setTestDisplay(null);
            this.setTestText(null);
            this.setTestInput(null);
            testLength = 0;
        }

        this.testTime = 0.0;
        this.correctWords = 0;
        this.wpm = 0;
    }

    /**
     * 
     * @param {the text for the test} text 
     */
    setTestText(newText) {
        if (newText.type == "string" && newText != "") {
            this.text = newText;
        } else {
            this.text = null;
        }
    }

    /**
     * 
     * @param {input element for the test} inputElement 
     */
    setTestInput(inputElement) {
        if (inputElement.type == "text") {
            
        }
        inputElement.innerHTML = "";
        this.input = inputElement;
    }

    /**
     * 
     * @param {div element where the test text is displayed} displayElement 
     */
    setTestDisplay(displayElement) {
        displayElement.innerHTML = "";
        this.input = displayElement;
    }

    /**
     * Places the test text into the provided div area
     * 
     * @param {The div area where the text appears} displayDiv 
     */
    displayText() {
        this.display.innerHTML = ('');
        this.testText.split('').forEach(char => {
            let characterSpan = document.createElement('span');
            characterSpan.innerText = char;
            this.display.appendChild(characterSpan);
        })
    }

    getTestLength() {
        return this.text.split(" ").length;
    }

    input.addEventListener("input", () => {
        let quoteDisplay = document.getElementById("mainText");
        //array of prompt span elements
        let spanArray = document.getElementById("mainText").querySelectorAll('span')
        let textInput = document.getElementById("textInput");
        //array of input characters
        let inputArray = textInput.value.split('');
      
        let space = false;
      
        quoteDisplay.innerHTML = "";
        spanArray.forEach((CharacterSpan, index) => {
          let currentChar = inputArray[index];
        
          if (currentChar == " " || space == true) {
            console.log("invalid");
            if (CharacterSpan.innerText == " ") {
              space = false;
              if (currentChar != " "){
                textInput.value += " ";
              }
            } else {
              if (space == false && index + 1 == inputArray.length) {
                space = true;
                textInput.selectionEnd = textInput.selectionEnd - 1;
                textInput.value = textInput.value.slice(0, -1);
              }
              CharacterSpan.className = "invalid"
              textInput.value += CharacterSpan.innerText;
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
                textInput.selectionEnd = textInput.selectionEnd + ((i - index) + 1);
                textInput.value = textInput.value.slice(0, (i - index + 1));
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
              quoteDisplay.appendChild(newCharacter);
            }
      
          } 
      
          // Adds back all characters not marked for removal
          if (CharacterSpan.className != "remove") {
            quoteDisplay.appendChild(CharacterSpan);
          }
        })
      
        updateWithWPM(textInput.value.length, inputArray.length);
      });
      
      function signOutGoogleUser() {
        auth.signOut().then(() => {
          console.log("Sign out successful...");
        }).catch((error) => {
          console.log(error);
        });
      }
}
