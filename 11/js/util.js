import {clearAllLayersOnMap} from './interactive-map.js';

const RERENDER_DELAY = 500;

//добавление задержки
const debounce = (callback) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), RERENDER_DELAY);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

//очистить форму
const clearForm = () => {
  document.querySelector('.map__filters').reset();
  document.querySelector('.ad-form').reset();
  clearAllLayersOnMap();
};

export{debounce, isEscapeKey, clearForm};

