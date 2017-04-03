
const ulTrackList = document.querySelector('.ulTrackList');

trackList.forEach(({id, src, votes, img}) => {

    const li = document.createElement('li');
    li.classList.add('list');
    li.innerHTML = `<span class="votes">${votes} votes</span>`;

    ID3.loadTags(src, function() {
        showTags(src, img);
    }, {
        tags: ["title","artist","album","picture"]
    });

    function showTags(url) {
        const tags = ID3.getAllTags(url);
        console.log(tags);
        let { title, artist } = tags;
        const titleAndAuthor = document.createElement('div');
        titleAndAuthor.classList.add('titleAndAuthor');
        titleAndAuthor.innerHTML = `<span>${title}</span><br/><span>${artist}</span>`;
        li.appendChild(titleAndAuthor);
        li.onclick = (event) => sendPlay(event, url, title, artist, img);
        ulTrackList.appendChild(li);
    }

});

function sendPlay(event, src, title, artist, img) {
    const myAudio = document.querySelector('audio');
    const { target } = event;

    document.querySelector('.playingTitle').textContent = title || "Undefined";
    document.querySelector('.playingAuthor').textContent = artist || "Unnkown";
    document.querySelector('.imgAlbumPicture').src = img;

    myAudio.src = src;
    myAudio.addEventListener('durationchange', function () {
        startPlay();
    });

    document.querySelectorAll('.list').forEach(item => item.classList.remove('active'));
    target.classList.add('active');
    const div = document.createElement('div');
    div.classList.add('gifDiv');
    const imgGif = document.createElement('img');
    imgGif.classList.add('gifImg');
    imgGif.src = 'img/gif_sound_color.gif';
    div.appendChild(imgGif);
    target.appendChild(div);
}

