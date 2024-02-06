
export class ResultsDisplay {
    constructor(time, correctWords, testLength, errors) {
        this.displayDiv = document.getElementById('mainContent');

        this.correctWords = correctWords;
        this.testLength = testLength;
        this.errors = errors;

        this.wpm = 0;
        this.totalTime = time;
        this.accuracy = 0;
    }

    #calculateResults() {
        this.wpm = Math.round(this.correctWords / (this.totalTime / 60.0));
        this.accuracy = Math.round(((this.testLength - this.errors) / this.testLength) * 100);
    }

    render() {
        this.#calculateResults();

        this.displayDiv.innerHTML = '';
        const resultsHeader = document.createElement('span');
        resultsHeader.id = 'results';
        resultsHeader.className = 'center-horizontal';
        resultsHeader.innerText = 'Results';
        this.displayDiv.appendChild(resultsHeader);

        this.displayDiv.appendChild(document.createElement('br'));


        const wpmHeader = document.createElement('span');
        wpmHeader.id = 'WPM';
        wpmHeader.innerText = 'WPM = ';
        this.displayDiv.appendChild(wpmHeader);
        const wpmData = document.createElement('span');
        wpmData.innerText = this.wpm;
        this.displayDiv.appendChild(wpmData);

        this.displayDiv.appendChild(document.createElement('br'));


        const timeHeader = document.createElement('span');
        timeHeader.id = 'time';
        timeHeader.innerText = 'Time Taken = ';
        this.displayDiv.appendChild(timeHeader);
        const timeData = document.createElement('span');
        timeData.innerText = this.totalTime + 's';
        this.displayDiv.appendChild(timeData);

        this.displayDiv.appendChild(document.createElement('br'));

        const accuracyHeader = document.createElement('span');
        accuracyHeader.id = 'accuracy';
        accuracyHeader.innerText = 'Accuracy = ';
        this.displayDiv.appendChild(accuracyHeader);
        const accuracyData = document.createElement('span');
        accuracyData.innerText = this.accuracy + '%';
        this.displayDiv.appendChild(accuracyData);
    
        this.displayDiv.appendChild(document.createElement('br'));

    }
}