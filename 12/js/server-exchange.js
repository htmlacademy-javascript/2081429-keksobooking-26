import {showLoadErrorMessage} from './popups.js';

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

export {getRentalAdsDataFromServer, sendNewRentalAdToServer};
