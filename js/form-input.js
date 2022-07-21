import {sendNewRentalAdToServer} from './server-exchange.js';
import {showErrorMessage} from './popups.js';
import {clearForm, blockSubmitButton, unblockSubmitButton} from './util.js';
import {loadPhotosIntoFrom} from './photos-upload.js';

const PriceTypes = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error__validation',
});

const selectedTypeElement = adForm.querySelector('#type');
const priceElement = adForm.querySelector('#price');
const guestsSelectedElement = document.querySelector('#capacity');
const roomsSelectedElement = document.querySelector('#room_number');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const sliderPriceElement = adForm.querySelector('.ad-form__slider');

//создание слайдера и синхронизация с полем цены
noUiSlider.create(sliderPriceElement, {
  range: {
    min: 0,
    max: Number(priceElement.max),
  },
  start: Number(priceElement.placeholder),
  step: 100,
  format: {
    to:
      function (value) {
        return value.toFixed(0);
      },
    from: function (value) {
      return Number(value);
    },
  },
});

sliderPriceElement.noUiSlider.on('slide', () => {
  priceElement.value = sliderPriceElement.noUiSlider.get();
  pristine.validate(priceElement);
});

priceElement.addEventListener('change', (evt) => {
  sliderPriceElement.noUiSlider.set(Number(evt.target.value));
});

//синхронизация полей времени заезда и выезда
[timeInElement, timeOutElement].forEach((item) => item.addEventListener('change', (evt) => {
  timeInElement.value = evt.target.value;
  timeOutElement.value = evt.target.value;
}));

//функция валидации поля цены за проживание
const validatePrice = (priceValue) => (priceValue >= PriceTypes[selectedTypeElement.value]);

//функция вывода сообщения при неверно введённой цене
const getPriceErrorMessage = () => (`Не менее ${PriceTypes[selectedTypeElement.value]} рублей`);

//обработчик события изменения типа проживания
function onOptionChange() {
  priceElement.setAttribute('placeholder', PriceTypes[this.value]);
  pristine.validate(priceElement);
}

//функция валидации поля количества гостей
const validateGuestDependsOnRooms = () => (parseInt(guestsSelectedElement.value, 10) <= parseInt(roomsSelectedElement.value, 10));

//функция по выводу ошибки при несоответствии полей комнат и гостей
const getGuestFieldErrorMessage = () => {
  if (parseInt(roomsSelectedElement.value, 10) === 1) {
    return 'Не более 1 гостя';
  } else if (parseInt(roomsSelectedElement.value, 10) === 100) {
    return 'Не для гостей';
  }
  return `Не более ${roomsSelectedElement.value} гостей`;
};

//валидация текущего заполнения полей формы
const validateCurrentFieldValues = () => {
  pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);
  pristine.addValidator(guestsSelectedElement, validateGuestDependsOnRooms, getGuestFieldErrorMessage);

  selectedTypeElement.addEventListener('change', onOptionChange);

  roomsSelectedElement.addEventListener('change', () => {
    pristine.validate(guestsSelectedElement);
  });
};

//загрузка фотографий в форму
loadPhotosIntoFrom();

//валидация формы при отправке
const setAdFormForSubmit = (onSuccess, getData) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      sendNewRentalAdToServer(
        () => {
          onSuccess();
          unblockSubmitButton();
          clearForm();
          sliderPriceElement.noUiSlider.reset();
          getData();
        },
        () => {
          showErrorMessage('Не удалось разместить объявление');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });

};

const resetPage = (getData) => {
  adForm.addEventListener('reset', () => {
    sliderPriceElement.noUiSlider.reset();
    clearForm();
    getData();
  });
};

export{validateCurrentFieldValues, onOptionChange, setAdFormForSubmit, resetPage};