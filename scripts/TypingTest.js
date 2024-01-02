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
            this.setTextInput(null);
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
        if (typeof(newText) == "string" && newText != "") {
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
        if (typeof(inputElement) == "string") {
            this.input = inputElement;
        } else {
            this.input = null;
        }
    }

    /**
     * 
     * @param {div element where the test text is displayed} displayElement 
     */
    setTestDisplay(displayElement) {
        if (typeof(displayElement) == "string") {
            this.display = displayElement;
        } else {
            this.display = null;
        }

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
    
    getWPM() {

    }

}
