import {isEscapeKey} from './util.js';

const SUCCESS_SHOW_TIME = 5000;
const ERROR_SHOW_TIME = 5000;

//окно всплывающее при ошибке
const showErrorMessage = (errorMessage) => {
  const errorMessageTemplate = document.querySelector('#error').content.firstElementChild;
  const errorMessageElement = errorMessageTemplate.cloneNode(true);

  errorMessageElement.querySelector('.error__message').textContent = errorMessage;

  document.body.append(errorMessageElement);

  const tryAgainButton = errorMessageElement.querySelector('.error__button');

  tryAgainButton.addEventListener('click', () => {
    errorMessageElement.remove();
  });
  tryAgainButton.removeEventListener('click', () => {
    errorMessageElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageElement.remove();
    }
  });

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageElement.remove();
    }
  });

  document.addEventListener('click', () => {
    errorMessageElement.remove();
  });

  document.removeEventListener('click', () => {
    errorMessageElement.remove();
  });
};

//окно, всплывающее при успешной отправке
const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.firstElementChild;
  const successMessageElement = successMessageTemplate.cloneNode(true);
  document.body.append(successMessageElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessageElement.remove();
    }
  });

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessageElement.remove();
    }
  });

  document.addEventListener('click', () => {
    successMessageElement.remove();
  });
  document.removeEventListener('click', () => {
    successMessageElement.remove();
  });

  setTimeout(() => {
    successMessageElement.remove();
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

//загрузка данных
const getRentalAdsDataFromServer = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((rentalAds) => onSuccess(rentalAds))
    .catch(() => showLoadErrorMessage('Не удалось загрузить данные с сервера'));
};

//отправка данных
const sendNewRentalAdToServer = (onSuccess, onFail, data) => {
  fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail('Ошибка загрузки данных на сервер');
      }
    })
    .catch(() => {
      onFail('Ошибка загрузки данных на сервер');
    });
};

export {getRentalAdsDataFromServer, sendNewRentalAdToServer, showErrorMessage, showSuccessMessage};
