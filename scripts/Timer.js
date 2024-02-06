/**
 * a class that represents the timer for the typing test
 */
export class Timer {
    constructor(start, end, dir, displayID) {
        this.startTime = start;
        this.endTime = end;
        this.direction = dir;
        this.currentTime = this.startTime;
        this.display = document.getElementById(displayID);

        this.timerID;
    }

    /**
     * starts the timer counting every second
     */
    start() {
        this.timerID = setInterval( () => {
            if (this.currentTime != this.endTime) {
              this.currentTime += this.direction;
              this.updateDisplay();
            }
        }, 1000);
    }

    /**
     * sets the interval of the timer to 0 so it doesn't incremenet, 
     * 
     * @returns the time elapsed from when the timer started to when it stopped
     */
    stop() {
        clearInterval(this.timerID);
        return this.currentTime;
    }

    /**
     * sets the current time back to start time
     */
    reset() {
        this.stop();
        this.currentTime = this.startTime;
        this.updateDisplay();
    }

    /**
     * updates the text of the provided element with the current time
     */
    updateDisplay() {
        this.display.innerText = this.currentTime + " Seconds";
    }
}