const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const track = document.querySelector(".track");
const carouselWidth = document.querySelector(".carousel-container").offsetWidth;

prev.addEventListener("click", () => {
    track.style.transform = `translateX(0px)`;
});

next.addEventListener("click", () => {
    track.style.transform = `translateX(-${carouselWidth}px)`;
});

// `translateX(-${carouselWidth}px)`