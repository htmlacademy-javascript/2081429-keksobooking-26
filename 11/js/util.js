const RERENDER_DELAY = 500;

const debounce = (callback) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), RERENDER_DELAY);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export{debounce, isEscapeKey};

