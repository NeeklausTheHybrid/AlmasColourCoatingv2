// script.js

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slider = document.querySelector('.carousel-slider');
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.querySelector('.carousel-dots');

let slideIndex = 0;

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    updateDots(index);
}

function updateDots(index) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        dot.classList.toggle('active-dot', i === index);
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
    });
}

prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
});

nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
});

function autoSlide() {
    setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }, 7000); // Change slide every 7 seconds
}

showSlide(slideIndex);
autoSlide();
