
const ulTrackList = document.querySelector('.ulTrackList');

trackList.forEach(({id, src, votes}) => {

    const li = document.createElement('li');
    li.classList.add('list'+id);
    li.innerHTML = `<span class="votes">${votes} votes</span>`;

    ID3.loadTags(src, function() {
        showTags(src);
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
        ulTrackList.appendChild(li);
    }

});