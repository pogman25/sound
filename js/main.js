
ID3.loadTags("tracks/Oasis - Wonderwall.mp3", function() {
    showTags("tracks/Oasis - Wonderwall.mp3");
}, {
    tags: ["title","artist","album","picture"]
});

function showTags(url) {
    const tags = ID3.getAllTags(url);
    console.log(tags);
    document.querySelector('.playingTitle').textContent = tags.title || "Undefined";
    document.querySelector('.playingAuthor').textContent = tags.artist || "Unnkown";
    document.getElementById('album').textContent = tags.album || "";
    console.log(tags.picture);
    const image = tags.picture;
    if (image) {
        let base64String = "";
        const lengthArray = image.data.length;
        for (let i = 0; i < lengthArray; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        const base64 = "data:" + image.format + ";base64," +
            window.btoa(base64String);
        document.getElementById('picture').setAttribute('src',base64);
    } else {
        document.getElementById('picture').style.display = "none";
    }
}

const myAudio = new Audio();
myAudio.src = 'tracks/Oasis - Wonderwall.mp3';

function startPlay() {
    myAudio.play();
    let playButton = document.querySelector('.playPause');
    playButton.src = 'img/pause-sign.svg';
    playButton.setAttribute('onclick', 'stopPlay()');
    playButton.classList.add('playing');
    myAudio.addEventListener('timeupdate', currentTimeUpdate);
}

myAudio.addEventListener('loadedmetadata', function() {
    const endPlayTime = document.querySelector('.end');
    const allDuration = Math.round(myAudio.duration);
    const minutes = Math.round(allDuration/60);
    const seconds = allDuration - minutes*60;
    endPlayTime.innerHTML = (minutes + ':' + seconds);
});

function moveTime(xPos) {
    let linePos = document.querySelector('.playLine');
    let currentLine = document.querySelector('.currentLine');
    let toTime = (xPos - linePos.getBoundingClientRect().left)/330*100;
    currentLine.style.width = toTime + '%';
    myAudio.removeEventListener('timeupdate', currentTimeUpdate);

    document.onmousemove = function (e) {
        toTime = (e.clientX - linePos.getBoundingClientRect().left)/330*100;
        currentLine.style.width = toTime + '%';
        const currentPlayTime = document.querySelector('.begin');
        const time = Math.round(toTime*Math.round(myAudio.duration)/100);
        currentPlayTime.innerHTML = (getMinuteSecond(time));
    };

    document.onmouseup = function() {
        document.onmousemove = null;
        linePos.onmouseup = null;
        myAudio.addEventListener('timeupdate', currentTimeUpdate);
        myAudio.currentTime = (toTime*Math.round(myAudio.duration)/100);
        console.log(myAudio.currentTime);
    };
}

function stopPlay() {
    const playButton = document.querySelector('.playPause');
    playButton.src = 'img/white-play-button.svg';
    playButton.setAttribute('onclick', 'startPlay()');
    myAudio.pause();
}

function currentTimeUpdate() {
    const currPlayTime = myAudio.currentTime.toFixed(0);

    const currentPlayTime = document.querySelector('.begin');
    currentPlayTime.innerHTML = (getMinuteSecond(currPlayTime));

    const durationPercent = currPlayTime/Math.round(myAudio.duration)*100;
    const timeValue = document.querySelector('.currentLine');
    timeValue.style.width = durationPercent+'%';
}

function getMinuteSecond(time) {
    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60;
    const viewSeconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + viewSeconds;
}