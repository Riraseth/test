const slider = document.querySelector('.slider__container');
const slides = slider.querySelectorAll('.slider__item');
const sliderControls = document.querySelector('.slider__controls');

let currSlide = 0;

const createSliderNav = () => {
  slides.forEach(() => {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    sliderControls.appendChild(bullet);
  });
};
createSliderNav();
const bullets = sliderControls.querySelectorAll('.bullet');

myTimer = setInterval(() => {
  next();
}, 5000);

const showSlide = (i) => {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });
  slides[i].classList.add('active');
  clearInterval(myTimer);
  myTimer = setInterval(() => {
    next();
  }, 5000);
};

document.addEventListener('DOMContentLoaded', showSlide(currSlide));

const next = () => {
  currSlide >= slides.length - 1 ? (currSlide = 0) : currSlide++;
  showSlide(currSlide);
};

bullets.forEach((bullet, i) => {
  bullet.addEventListener('click', () => {
    showSlide(i);
    currSlide = i;
  });
});
