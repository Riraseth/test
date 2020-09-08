const welcomeButtons = document.querySelectorAll('.btn');
const welcomeScreen = document.querySelector('.user__welcome');
const registerScreen = document.querySelector('.user__register');
const loginScreen = document.querySelector('.user__login');
const floatingLabels = document.querySelectorAll('.floating-label');
const userSession = document.querySelector('.user__session');
// login form elements
const loginForm = document.querySelector('#login-form');
const loginUsername = document.querySelector('#login_username');
const loginPassword = document.querySelector('#login_password');
const noAccount = document.querySelector('#no-account');
const loginCheckbox = document.querySelector('.user__checkbox');
// Register form elements
const registerForm = document.querySelector('#register-form');
const registerUsername = document.querySelector('#register_username');
const registerPassword = document.querySelector('#register_password');
const registerEmail = document.querySelector('#register_email');
const registerName = document.querySelector('#register_name');
const registerCheckbox = document.querySelector('#register_checkbox');
const wantToLogin = document.querySelector('#go-login');
const uncoverPassword = document.querySelector('#uncover-password');

const notice = document.querySelector('.notice');

let isValid = true;

// Error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  if (input.type === 'checkbox') {
    formControl.className = 'checkbox-container error ';
  } else {
    formControl.className = 'floating-label error -expand';
  }
  const small = formControl.querySelector('small');
  small.innerText = message;
  isValid = false;
};

// Show success
const showSuccess = (input) => {
  const formControl = input.parentElement;
  if (input.type === 'checkbox') {
    formControl.className = 'checkbox-container';
  } else {
    formControl.className = 'floating-label -expand';
  }
};

// Check email is valid
const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Adres email jest nieprawidłowy');
  }
};

// Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach(function (input) {
    if (input.type === 'checkbox') {
      if (input.checked) {
        showSuccess(input);
      } else {
        showError(input, 'Zgoda wymagana');
      }
    } else {
      if (input.value.trim() === '') {
        showError(input, 'Pole nie może być puste');
      } else {
        showSuccess(input);
      }
    }
  });
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} musi zawierać przynajmniej ${min} znaków`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} musi się składać z mniej niż ${max} znaków`
    );
  } else {
    showSuccess(input);
  }
};

// Get fieldname
const getFieldName = (input) => {
  return input.dataset.text;
};

// show success/error notification

const formSendResult = (valid, text) => {
  if (valid) {
    notice.classList.add('-active');
    notice.style.backgroundColor = '#4bb543';
  } else {
    notice.classList.add('-active');
    notice.style.backgroundColor = '#eb5757';
  }
  notice.querySelector('.notice__text').innerText = text;
  setTimeout(() => {
    notice.className = 'notice';
  }, 3000);
};

const showPassword = () => {
  if (registerPassword.type === 'password') {
    registerPassword.type = 'text';
  } else {
    registerPassword.type = 'password';
  }
};

const toggleForms = (inputArr1, inputArr2) => {
  if (inputArr1) {
    inputArr1.querySelectorAll('input, button, p').forEach((input) => {
      input.setAttribute('tabIndex', '0');
    });
  }
  if (inputArr2) {
    inputArr2.querySelectorAll('input, button, p').forEach((input) => {
      input.setAttribute('tabIndex', '-1');
    });
  }
};

const formsInit = () => {
  toggleForms(welcomeScreen, null);
  toggleForms(null, loginScreen);
  toggleForms(null, registerScreen);
};

formsInit();

// Event listeners

// Dzień dobry
welcomeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    welcomeScreen.classList.add('hidden');
    // welcomeScreen.querySelectorAll('*').forEach((item) => {
    //   item.setAttribute('tabIndex', '-1');
    // });
    toggleForms(null, welcomeScreen);
    if (e.target.id === 'choose-login') {
      loginScreen.classList.remove('hidden');
      toggleForms(loginScreen, registerScreen);
    }
    if (e.target.id === 'choose-register') {
      registerScreen.classList.remove('hidden');
      toggleForms(registerScreen, loginScreen);
    }
  });
});

const clearLabels = () => {
  floatingLabels.forEach((label) => {
    label.querySelector('input').value = '';
  });
};

// Go to register

noAccount.addEventListener('click', () => {
  loginScreen.classList.add('hidden');
  registerScreen.classList.remove('hidden');
  toggleForms(registerScreen, loginScreen);
  clearLabels();
  loginCheckbox.checked = false;
});

// go to login

wantToLogin.addEventListener('click', () => {
  registerScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  toggleForms(loginScreen, registerScreen);
  clearLabels();
  registerCheckbox.checked = false;
});

loginForm.addEventListener('submit', (e) => {
  isValid = true;
  e.preventDefault();
  checkRequired([loginUsername, loginPassword]);
  checkLength(loginUsername, 5, 15);
  checkLength(loginPassword, 8, 25);
  formSendResult(isValid, `${isValid ? 'Zalogowano' : 'Wystąpił błąd'}`);
});

registerForm.addEventListener('submit', (e) => {
  isValid = true;
  e.preventDefault();
  checkRequired([
    registerUsername,
    registerPassword,
    registerEmail,
    registerName,
    registerCheckbox,
  ]);
  checkLength(registerUsername, 5, 15);
  checkLength(registerName, 5, 100);
  checkLength(registerPassword, 8, 25);
  checkEmail(registerEmail);
  formSendResult(
    isValid,
    `${isValid ? 'Rejestracja przebiegła pomyślnie' : 'Wystąpił błąd'}`
  );
});

uncoverPassword.addEventListener('click', showPassword);

userSession.addEventListener('click', () => {
  loginCheckbox.checked = !loginCheckbox.checked;
});

document.addEventListener(
  'invalid',
  (function () {
    return function (e) {
      e.preventDefault();
      document.getElementById('register_email').focus();
    };
  })(),
  true
);
