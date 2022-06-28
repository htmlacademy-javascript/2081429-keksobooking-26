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

export{switchToInactiveState, switchToActiveState};
