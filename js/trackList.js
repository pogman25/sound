const oasis = 'tracks/Oasis - Wonderwall.mp3';
const Ray_Vaghn = 'tracks/voodoo chile.mp3';
const Vai = 'tracks/tender surrender.mp3';
const Led_Zeppelin = 'tracks/Immigrant song.mp3';
const Crimson = 'tracks/one time.mp3';
const Metallica = 'tracks/the unforgiven.mp3';

const trackList = [
    {
        src: oasis,
        id: 1
    },
    {
        src: Ray_Vaghn,
        id: 2
    },
    {
        src: Vai,
        id: 3
    },
    {
        src: Led_Zeppelin,
        id: 4
    },
    {
        src: Crimson,
        id: 5
    },
    {
        src: Metallica,
        id: 6
    }
];

const ulTrackList = document.querySelector('.ulTrackList');

trackList.forEach(({id, src}) => {



    console.log(src);
    ID3.loadTags(src, function() {
        showTags(src);
    }, {
        tags: ["title","artist","album","picture"]
    });

    function showTags(url) {
        const tags = ID3.getAllTags(url);
        console.log(tags);
        const li = document.createElement('li');
        const trackNumber = document.createElement('div');
        trackNumber.classList.add('trackNumber');
        trackNumber.innerHTML = id;
        const titleAndAuthor = document.createElement('div');
        titleAndAuthor.classList.add('titleAndAuthor');
        titleAndAuthor.innerHTML = `<span>I remember to forget</span><br/><span>Shakira</span>`;
        li.classList.add('list'+id);
        li.appendChild(trackNumber);
        li.appendChild(titleAndAuthor);
        ulTrackList.appendChild(li);
    }
});