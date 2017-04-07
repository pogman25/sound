function currentTimeUpdate (myAudio) {
    const currPlayTime = myAudio.currentTime.toFixed(0);
    const currentPlayTime = document.querySelector('.begin');
    currentPlayTime.innerHTML = (getMinuteSecond(currPlayTime));

    const durationPercent = currPlayTime/Math.round(myAudio.duration)*100;
    const timeValue = document.querySelector('.currentLine');
    timeValue.style.width = durationPercent+'%';
}

function abort(myAudio) {
    const endPlayTime = document.querySelector('.end');
    const allDuration = Math.floor(myAudio.duration);
    const minutes = Math.floor(allDuration/60);
    const seconds = allDuration - minutes*60;
    endPlayTime.innerHTML = (minutes + ':' + seconds);
}

function getMinuteSecond (time) {
    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60;
    const viewSeconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + viewSeconds;
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