const handleFocus = (e) => {
  const target = e.target;
  target.parentNode.classList.add('-expand');
};

const handleBlur = (e) => {
  const target = e.target;
  if (!target.value) {
    target.parentNode.classList.remove('-expand');
  }
};

const events = (el) => {
  const floatInput = el.querySelector('input');
  floatInput.addEventListener('focus', handleFocus);
  floatInput.addEventListener('blur', handleBlur);
};

const init = () => {
  const floatingLabels = document.querySelectorAll('.floating-label');
  floatingLabels.forEach((label) => {
    if (label.querySelector('input').value) {
      label.classList.add('-expand');
    }
    events(label);
  });
};

init();
