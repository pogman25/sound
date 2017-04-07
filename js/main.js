function MyPlayer(src) {
    const myAudio = new Audio();

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

    function currentTimeUpdate () {
        const currPlayTime = myAudio.currentTime.toFixed(0);
        const currentPlayTime = document.querySelector('.begin');
        currentPlayTime.innerHTML = (getMinuteSecond(currPlayTime));

        const durationPercent = currPlayTime/Math.round(myAudio.duration)*100;
        const timeValue = document.querySelector('.currentLine');
        timeValue.style.width = durationPercent+'%';
    }

    function abort() {
        const endPlayTime = document.querySelector('.end');
        const allDuration = Math.floor(myAudio.duration);
        const minutes = Math.floor(allDuration/60);
        const seconds = allDuration - minutes*60;
        endPlayTime.innerHTML = (minutes + ':' + seconds);
    }

    function addPlayButton () {
        const playButton = document.querySelector('.playPause');
        playButton.src = 'img/white-play-button.svg';
        playButton.onclick = () => startPlay();
    }

    function addPauseButton () {
        const playButton = document.querySelector('.playPause');
        playButton.src = 'img/pause-sign.svg';
        playButton.onclick = () => stopPlay();
    }

    function getMinuteSecond (time) {
        const minutes = Math.floor(time/60);
        const seconds = time - minutes*60;
        const viewSeconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ':' + viewSeconds;
    }

    this.init = function () {
        myAudio.addEventListener('timeupdate', currentTimeUpdate);
        myAudio.addEventListener('abort', function () {
            let currentLine = document.querySelector('.currentLine');
            currentLine.style.width = 0;
        });
        myAudio.addEventListener('loadedmetadata', abort);
        document.querySelector('.playPause').onclick = () => startPlay();
        document.querySelector('.forward').onclick = () => forward();
        document.querySelector('.back').onclick = () => backward();
        document.querySelector('.playLine').onmousedown = (event) => moveTime(event.clientX);
    };

    this.setTrackFromList = function (src) {
        myAudio.src = src;
        myAudio.addEventListener('durationchange', startPlay);
        myAudio.addEventListener('ended', forward);
    };

}

const player = new MyPlayer();
player.init();