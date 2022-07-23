const RERENDER_DELAY = 500;
const CAPACITY_NUMBERS = [1, 2, 3];

//функции перевода формы в активное и неактивное состояния

const switchToInactiveState = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');

  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => element.setAttribute('disabled', 'disabled'));

  mapFilter.classList.add('map__filters--disabled');
  mapFilter.querySelectorAll('select').forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFilter.querySelectorAll('input').forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const switchToActiveState = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');

  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => element.removeAttribute('disabled'));

  mapFilter.classList.remove('map__filters--disabled');
  mapFilter.querySelectorAll('select').forEach((element) => element.removeAttribute('disabled'));
  mapFilter.querySelectorAll('input').forEach((element) => element.removeAttribute('disabled'));
};

//добавление задержки
const debounce = (callback) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), RERENDER_DELAY);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const submitButton = document.querySelector('.ad-form__submit');

//блокировка и разблокировка кнопки отправки
const blockSubmitButton = () => {
  if (submitButton.hasAttribute('disabled')) {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  } else {
    submitButton.disabled = true;
    submitButton.textContent = 'Публикую...';
  }
};

//окончание слова для шаблона в нужном формате
const getDeclination = (number, declinationArray) => {
  if (number === CAPACITY_NUMBERS[0]) {
    return declinationArray[0];
  } else if (number === CAPACITY_NUMBERS[1] || number === CAPACITY_NUMBERS[2]) {
    return declinationArray[1];
  }

  return declinationArray[2];
};

export{switchToActiveState, switchToInactiveState, debounce, isEscapeKey, blockSubmitButton, getDeclination};

