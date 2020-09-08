const links = document.querySelectorAll('.navigation__link');
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

const setCurrent = (e) => {
  links.forEach((link) => {
    link.classList.remove('-current');
  });
  e.target.classList.add('-current');
};

const toggleNav = () => {
  navigation.classList.toggle('active');
};

const closeHamburger = () => {
  hamburger.classList.toggle('active');
};

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    setCurrent(e);
    toggleNav();
    closeHamburger();
  });
});

hamburger.addEventListener('click', () => {
  closeHamburger();
  toggleNav();
});
