import throttle from 'lodash.throttle'; //імпорт lodash.throttle

// отримаємо доступ до єлементів
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const storageKey = 'feedback-form-state';

// вішаємо слухача та затримку у 500 мс.
const saveFormData = throttle(function (event) {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(storageKey, JSON.stringify(formData));
}, 500);

form.addEventListener('input', function (event) {
  saveFormData(event);
});

// перевіряємо та додаємо у форму HTML
function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(storageKey));

  // if (savedData){...} // Чи можна так? Та як краще?
  if (savedData !== null && savedData !== undefined && savedData !== false) {
    emailInput.value = savedData.email;
    messageInput.value = savedData.message;
  }
}

populateForm();

// слухач на кнопку відправки, відпрака та видалення
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formData); // вивод у консоль - імітація відправки на сервер

  // видаляємо з локального сховища
  localStorage.removeItem(storageKey);

  emailInput.value = '';
  messageInput.value = '';
});
