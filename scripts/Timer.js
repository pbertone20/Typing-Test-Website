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
        console.log("timer start");
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
        console.log("timer end");
        this.timerID = setInterval( () => {
        }, -1);
        return this.currentTime;
    }

    /**
     * sets the current time back to start time
     */
    reset() {
        this.currentTime = this.startTime;
    }

    /**
     * updates the text of the provided element with the current time
     */
    updateDisplay() {
        this.display.innerText = this.currentTime + " seconds";
    }
}