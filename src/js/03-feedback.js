// В HTML есть разметка формы. Напиши скрипт который будет сохранять значения полей в локальное хранилище когда пользователь что-то печатает.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>

// Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. Разбей его на несколько подзадач:

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, 
// в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

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
  e.preventDefault();

  for (const elem of [...e.currentTarget.elements]) {
    if ((elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') && elem.value === '') {
      alert('Необходимо заполнить все поля');
      return;
    }
  }

  console.log(JSON.parse(localStorage.getItem(FORM_STATE)));

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

