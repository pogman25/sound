
const myAudio = new Audio();
console.log(myAudio.prototype);
myAudio.addEventListener('timeupdate', currentTimeUpdate);

myAudio.addEventListener('abort', function () {
    let currentLine = document.querySelector('.currentLine');
    currentLine.style.width = 0;
});

function startPlay () {
    const list = [].slice.call(document.querySelectorAll('.list'));
    const activeClass = list.filter(item => item.classList.contains('active'));
    if(!activeClass.length) {
        list[0].click();
    } else {
        myAudio.play();
        addPauseButton();
        myAudio.addEventListener('timeupdate', currentTimeUpdate);
    }
}

function stopPlay () {
    addPlayButton();
    myAudio.pause();
}

myAudio.addEventListener('loadedmetadata', function () {
    const endPlayTime = document.querySelector('.end');
    const allDuration = Math.floor(myAudio.duration);
    const minutes = Math.floor(allDuration/60);
    const seconds = allDuration - minutes*60;
    endPlayTime.innerHTML = (minutes + ':' + seconds);
});

function moveTime (xPos) {
    let linePos = document.querySelector('.playLine');
    let currentLine = document.querySelector('.currentLine');
    let toTime = (xPos - linePos.getBoundingClientRect().left)/330*100;
    currentLine.style.width = toTime + '%';
    myAudio.removeEventListener('timeupdate', currentTimeUpdate);

    linePos.onmousemove = function (e) {
        toTime = (e.clientX - linePos.getBoundingClientRect().left)/330*100;
        currentLine.style.width = toTime + '%';
        const currentPlayTime = document.querySelector('.begin');
        const time = Math.round(toTime*Math.round(myAudio.duration)/100);
        currentPlayTime.innerHTML = (getMinuteSecond(time));
    };

    document.onmouseup = function () {
        linePos.onmousemove = null;
        document.onmouseup = null;
        myAudio.addEventListener('timeupdate', currentTimeUpdate);
        myAudio.currentTime = (toTime*Math.round(myAudio.duration)/100);
    };
}

function setTrackFromList (src) {
    myAudio.src = src;
    myAudio.addEventListener('durationchange', startPlay);
    myAudio.addEventListener('ended', forward);
}


function forward () {
    const list = [].slice.call(document.querySelectorAll('.list'));
    const activeClass = list.filter( item => item.classList.contains('active'));
    if(activeClass.length) {
        if(activeClass[0].nextElementSibling) {
            activeClass[0].nextElementSibling.click();
        } else {
            list[0].click();
        }
    } else {
        list[0].click();
    }
}

function backward () {
    const list = [].slice.call(document.querySelectorAll('.list'));
    if(myAudio.currentTime < 10) {
        let activeClass = list.filter( item => {return item.classList.contains('active')});
        if(activeClass.length) {
            if(activeClass[0].previousElementSibling) {
                activeClass[0].previousElementSibling.click();
            } else {
                list[list.length-1].click();
            }
        } else {
            list[0].click();
        }
    } else {
        myAudio.currentTime = 0;
    }

}
