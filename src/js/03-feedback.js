import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(onFormData, 500));
formEl.addEventListener('submit', onSubmitForm);

const FORM_STATE = "feedback-form-state";

const formData = {};

function onFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_STATE, JSON.stringify(formData));
}

function onSubmitForm(e) {
  console.log(JSON.parse(localStorage.getItem(FORM_STATE)));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(FORM_STATE);
}

(function dataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem(FORM_STATE));
  const email = document.querySelector('.feedback-form input');
  const message = document.querySelector('.feedback-form textarea');
  if (data) {
    email.value = data.email;
    message.value = data.message;
  }
})();