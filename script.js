
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function filterMovies() {
    const query = searchInput.value.toLowerCase();
    const posters = document.querySelectorAll('.movie-posters .poster');
    posters.forEach(poster => {
        const title = poster.querySelector('p').textContent.toLowerCase();
        poster.style.display = title.includes(query) || query === '' ? 'block' : 'none';
    });
}

searchBtn.addEventListener('click', filterMovies);
searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') filterMovies();
});


document.querySelectorAll('.movie-posters').forEach(row => {
    let isDown = false;
    let startX;
    let scrollLeft;

    row.addEventListener('mousedown', e => {
        isDown = true;
        row.classList.add('active');
        startX = e.pageX - row.offsetLeft;
        scrollLeft = row.scrollLeft;
    });

    row.addEventListener('mouseleave', () => {
        isDown = false;
        row.classList.remove('active');
    });

    row.addEventListener('mouseup', () => {
        isDown = false;
        row.classList.remove('active');
    });

    row.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - row.offsetLeft;
        const walk = (x - startX) * 2; 
        row.scrollLeft = scrollLeft - walk;
    });
});
