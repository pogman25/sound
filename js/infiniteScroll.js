
const tracks = document.querySelector('.tracks');
const ol = tracks.querySelector('ol');
tracks.addEventListener('scroll', infiniteScroll);

function infiniteScroll() {
    const length = ol.children.length-1;
    const first = ol.children[0];
    const last = ol.children[length];
    ol.insertBefore(first, last);
}