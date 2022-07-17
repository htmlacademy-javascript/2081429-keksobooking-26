import {isEscapeKey} from './util.js';

const SUCCESS_SHOW_TIME = 5000;
const ERROR_SHOW_TIME = 5000;

const errorMessageTemplate = document.querySelector('#error').content.firstElementChild;
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const tryAgainButton = errorMessageElement.querySelector('.error__button');
errorMessageElement.classList.add('hidden');
document.body.append(errorMessageElement);

const successMessageTemplate = document.querySelector('#success').content.firstElementChild;
const successMessageElement = successMessageTemplate.cloneNode(true);
successMessageElement.classList.add('hidden');
document.body.append(successMessageElement);

//функции для обработки сообщения с ошибкой при отправке
const onErrorMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorBlankAreaClick = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

const onErrorButtonClick = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

function closeErrorMessage() {
  errorMessageElement.classList.add('hidden');

  document.removeEventListener('keydown', onErrorMessageKeydown);
  document.removeEventListener('click', onErrorBlankAreaClick);
  tryAgainButton.removeEventListener('click', onErrorButtonClick);
}

const showErrorMessage = (errorMessage) => {

  errorMessageElement.querySelector('.error__message').textContent = errorMessage;
  errorMessageElement.classList.remove('hidden');

  tryAgainButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onErrorBlankAreaClick);
  document.addEventListener('keydown', onErrorMessageKeydown);
};


//функции для обработки сообщения с успешной отправкой
const onSuccesMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessBlankAreaClick = (evt) => {
  evt.preventDefault();
  closeSuccessMessage();
};

function closeSuccessMessage() {
  successMessageElement.classList.add('hidden');

  document.removeEventListener('keydown', onSuccesMessageKeydown);
  document.removeEventListener('click', onSuccessBlankAreaClick);
}

const showSuccessMessage = () => {
  successMessageElement.classList.remove('hidden');

  document.addEventListener('click', onSuccessBlankAreaClick);
  document.addEventListener('keydown', onSuccesMessageKeydown);

  setTimeout(() => {
    closeSuccessMessage();
  }, SUCCESS_SHOW_TIME);
};

//ошибка данных при загрузке
const showLoadErrorMessage = (message) => {
  const loadErrorMessage = document.createElement('div');
  loadErrorMessage.textContent = message;
  loadErrorMessage.style.zIndex = '1100';
  loadErrorMessage.style.position = 'absolute';
  loadErrorMessage.style.left = '0';
  loadErrorMessage.style.top = '0';
  loadErrorMessage.style.right = '0';
  loadErrorMessage.style.padding = '10px';
  loadErrorMessage.style.fontSize = '24px';
  loadErrorMessage.style.textAlign = 'center';
  loadErrorMessage.style.backgroundColor = 'rgb(163, 3, 3)';

  document.body.append(loadErrorMessage);

  setTimeout(() => {
    loadErrorMessage.remove();
  }, ERROR_SHOW_TIME);
};

export {showErrorMessage, showSuccessMessage, showLoadErrorMessage};
