import 'core-js/stable';
import 'isomorphic-fetch';
import 'regenerator-runtime/runtime';
import '../scss/app.scss';
import './classlist';
import './navigation';
import './news';
import './slider';
import './floating-lables';
import './forms';

const siteButtons = document.querySelectorAll('button, .navigation__link');

((e) => {
  e = e || window.event;
  if (e.keyCode == 13) {
    siteButtons.forEach((button) => {
      button.click();
      return false;
    });
  }
  return true;
})();
