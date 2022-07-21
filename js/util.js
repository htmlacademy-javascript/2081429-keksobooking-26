import {resetMap} from './interactive-map.js';

const RERENDER_DELAY = 500;

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
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//очистить форму
const clearForm = () => {
  document.querySelector('.map__filters').reset();
  document.querySelector('.ad-form').reset();
  resetMap();
};

export{switchToInactiveState, switchToActiveState, debounce, isEscapeKey, clearForm, blockSubmitButton, unblockSubmitButton};

