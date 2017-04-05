
const tracks = document.querySelector('.tracks');
const ol = document.querySelector('ol');
tracks.addEventListener('scroll', infiniteScroll);

function infiniteScroll() {
    const length = ol.children.length;
    const first = ol.children[0];
    const last = ol.children[length];
    ol.insertBefore(first, last);
}