function MyPlayer() {
    const myAudio = new Audio();

    function startPlay () {
        const list = util.getTrackList();
        const activeClass = list.filter(item => item.classList.contains('active'));
        if(!activeClass.length) {
            list[0].click();
        } else {
            util.addPlaying();
            myAudio.play();
            myAudio.addEventListener('timeupdate', () => util.currentTimeUpdate(myAudio));
        }
    }

    function stopPlay () {
        util.removePlaying();
        myAudio.pause();
    }

    function moveTime (xPos) {

        const { linePos, currentLine } = util.setLinePosition();

        let toTime = (xPos - linePos.getBoundingClientRect().left)/330*100;
        currentLine.style.width = toTime + '%';
        myAudio.removeEventListener('timeupdate', () => util.currentTimeUpdate(myAudio));

        linePos.onmousemove = function (e) {
            toTime = (e.clientX - linePos.getBoundingClientRect().left)/330*100;
            currentLine.style.width = toTime + '%';
            util.setBeginTime(toTime);
        };

        document.onmouseup = function () {
            linePos.onmousemove = null;
            document.onmouseup = null;
            myAudio.addEventListener('timeupdate', () => util.currentTimeUpdate(myAudio));
            myAudio.currentTime = (toTime*Math.round(myAudio.duration)/100);
        };
    }

    function forward () {
        const list = util.getTrackList();
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
        const list = util.getTrackList();

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

    this.init = function () {
        myAudio.addEventListener('timeupdate', () => util.currentTimeUpdate(myAudio));
        myAudio.addEventListener('abort', function () {
            const currentLine = document.querySelector('.currentLine');
            currentLine.style.width = 0;
        });
        myAudio.addEventListener('loadedmetadata', () => util.endTime(myAudio));
        document.querySelector('.playPause').onclick = () => startPlay();
        document.querySelector('.pausePlay').onclick = () => stopPlay();
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