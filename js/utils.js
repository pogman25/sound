function Utilities () {

    const playButton = document.querySelector('.playPauseBorder');

    this.currentTimeUpdate= function (myAudio) {
        const currPlayTime = myAudio.currentTime.toFixed(0);
        const currentPlayTime = document.querySelector('.begin');
        currentPlayTime.innerHTML = (getMinuteSecond(currPlayTime));

        const durationPercent = currPlayTime/Math.round(myAudio.duration)*100;
        const timeValue = document.querySelector('.currentLine');
        timeValue.style.width = durationPercent+'%';
    };

    this.endTime = function (myAudio) {
        const endPlayTime = document.querySelector('.end');
        const allDuration = Math.floor(myAudio.duration);
        const minutes = Math.floor(allDuration/60);
        const seconds = allDuration - minutes*60;
        endPlayTime.innerHTML = (minutes + ':' + seconds);
    };

    this.getTrackList = function () {
        const list = document.querySelectorAll('.list');
        return [].slice.call(list)
    };

    this.addPlaying = function () {
        playButton.classList.add('playing');
    };

    this.removePlaying = function () {
        playButton.classList.remove('playing');
    };

    this.setLinePosition = function () {
        const linePos = document.querySelector('.playLine');
        const currentLine = linePos.querySelector('.currentLine');
        return {linePos, currentLine};
    };

    this.setBeginTime = function (toTime) {
        const currentPlayTime = document.querySelector('.begin');
        const time = Math.round(toTime*Math.round(myAudio.duration)/100);
        currentPlayTime.innerHTML = (getMinuteSecond(time));
    };

    function getMinuteSecond (time) {
        const minutes = Math.floor(time/60);
        const seconds = time - minutes*60;
        const viewSeconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ':' + viewSeconds;
    }
}

const util = new Utilities();