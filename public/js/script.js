const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-image');
const indicators = document.querySelectorAll('.indicator');

let counter = 0; // Start from the first image
const numImages = images.length;
const slideWidth = images[0].clientWidth;

carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;

function updateIndicators() {
    indicators.forEach((indicator, idx) => {
        indicator.style.backgroundColor = idx === counter ? 'white' : 'grey';
    });
}

updateIndicators(); // Set initial dot color to white

function slide() {
    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    counter++;
    carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;

    if (counter >= numImages) {
        setTimeout(() => {
            carouselSlide.style.transition = 'none';
            counter = 0;
            carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
            updateIndicators(); // Update the indicators after resetting counter
        }, 500); // Wait for the transition to finish before resetting
    } else {
        updateIndicators();
    }
}

carouselSlide.addEventListener('transitionend', () => {
    if (images[counter].id === 'last-clone') {
        carouselSlide.style.transition = 'none';
        counter = numImages - 2;
        carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
    }
});

setInterval(slide, 3000); // Change slide every 3 seconds

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        counter = index; // Set the counter to the clicked indicator's index
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
        updateIndicators();
    });
});
