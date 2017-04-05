const ulTrackList = document.querySelector('.ulTrackList');

trackList.forEach(({src, votes, img}) => {

    const li = document.createElement('li');
    li.classList.add('list');
    li.innerHTML = `<span class="votes">${votes} votes</span>`;

    ID3.loadTags(src, function() {
        showTags(src, img, li);
    }, {
        tags: ["title","artist","album","picture"]
    });
});

function showTags(url, img, li) {
    const tags = ID3.getAllTags(url);
    console.log(tags);
    let { title, artist, album } = tags;
    addTitleAndArtist(li, title, artist, album);
    addGif(li);
    li.onclick = (evt) => {
                setTrackFromList(url);
                setTags(evt.target, title, artist, img);
                };

    ulTrackList.appendChild(li);
}

function currentTimeUpdate () {
    const currPlayTime = myAudio.currentTime.toFixed(0);
    const currentPlayTime = document.querySelector('.begin');
    currentPlayTime.innerHTML = (getMinuteSecond(currPlayTime));

    const durationPercent = currPlayTime/Math.round(myAudio.duration)*100;
    const timeValue = document.querySelector('.currentLine');
    timeValue.style.width = durationPercent+'%';
}

function getMinuteSecond (time) {
    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60;
    const viewSeconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + viewSeconds;
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

function setTags (target, title, artist, img) {
    document.querySelector('.playingTitle').textContent = title || "Undefined";
    document.querySelector('.playingAuthor').textContent = artist || "Unnkown";
    document.querySelector('.imgAlbumPicture').src = img;
    document.querySelectorAll('.list').forEach(item => item.classList.remove('active'));
    target.classList.add('active');
}

function addTitleAndArtist(li, title, artist, album) {
    const titleAndAuthor = document.createElement('div');
    titleAndAuthor.classList.add('titleAndAuthor');
    titleAndAuthor.innerHTML = `<div class="rotatePart"><span>${title}</span><br/><span>${artist}</span></div><div class="backRotatePart">${album}</div>`;
    li.appendChild(titleAndAuthor);
}

function addGif (li) {
    const div = document.createElement('div');
    div.classList.add('gifDiv');
    const imgGif = document.createElement('img');
    imgGif.classList.add('gifImg');
    imgGif.src = 'img/gif_sound_color.gif';
    div.appendChild(imgGif);
    li.appendChild(div);
}