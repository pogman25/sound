function currentTimeUpdate (myAudio) {
    const currPlayTime = myAudio.currentTime.toFixed(0);
    const currentPlayTime = document.querySelector('.begin');
    currentPlayTime.innerHTML = (getMinuteSecond(currPlayTime));

    const durationPercent = currPlayTime/Math.round(myAudio.duration)*100;
    const timeValue = document.querySelector('.currentLine');
    timeValue.style.width = durationPercent+'%';
}

function endTime(myAudio) {
    const endPlayTime = document.querySelector('.end');
    const allDuration = Math.floor(myAudio.duration);
    const minutes = Math.floor(allDuration/60);
    const seconds = allDuration - minutes*60;
    endPlayTime.innerHTML = (minutes + ':' + seconds);
}

function getTrackList() {
    const list = document.querySelectorAll('.list');
    return [].slice.call(list)
}

function addPlaying() {
    const playButton = document.querySelector('.playPauseBorder');
    playButton.classList.add('playing');
}

function removePlaying() {
    const playButton = document.querySelector('.playPauseBorder');
    playButton.classList.remove('playing');
}

function setLinePosition() {
    const linePos = document.querySelector('.playLine');
    const currentLine = linePos.querySelector('.currentLine');
    return {linePos, currentLine};
}

function setBeginTime(toTime) {
    const currentPlayTime = document.querySelector('.begin');
    const time = Math.round(toTime*Math.round(myAudio.duration)/100);
    currentPlayTime.innerHTML = (getMinuteSecond(time));
}

function getMinuteSecond (time) {
    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60;
    const viewSeconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + viewSeconds;
}