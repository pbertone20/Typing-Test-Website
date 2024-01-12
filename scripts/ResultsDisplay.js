
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
        document.getElementById('timer').innerText = '';

        this.displayDiv.innerHTML = '';
        /*
        const resultsHeader = document.createElement('span');
        resultsHeader.id = 'results';
        resultsHeader.className = 'center-horizontal';
        resultsHeader.innerText = 'Results';
        this.displayDiv.appendChild(resultsHeader);
        */

        const wpmHeader = document.createElement('span');
        wpmHeader.id = 'WPM';
        wpmHeader.innerText = 'WPM';
        wpmHeader.className = 'results-header';
        this.displayDiv.appendChild(wpmHeader);
        const wpmData = document.createElement('span');
        wpmData.innerText = this.wpm;
        wpmData.className = 'results-content';
        this.displayDiv.appendChild(wpmData);

        const timeHeader = document.createElement('span');
        timeHeader.id = 'time';
        timeHeader.innerText = 'Time';
        timeHeader.className = 'results-header';
        this.displayDiv.appendChild(timeHeader);
        const timeData = document.createElement('span');
        timeData.innerText = this.totalTime + 's';
        timeData.className = 'results-content';
        this.displayDiv.appendChild(timeData);

        const accuracyHeader = document.createElement('span');
        accuracyHeader.id = 'accuracy';
        accuracyHeader.innerText = 'Accuracy';
        accuracyHeader.className = 'results-header';
        this.displayDiv.appendChild(accuracyHeader);
        const accuracyData = document.createElement('span');
        accuracyData.innerText = this.accuracy + '%';
        accuracyData.className = 'results-content';
        this.displayDiv.appendChild(accuracyData);
    }
}