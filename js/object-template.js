import {getDeclination} from './util.js';

const ASSOCIATED_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};
const DECLINATION_ROOMS = ['комната', 'комнаты', 'комнат'];
const DECLINATION_GUESTS = ['гостя', 'гостей', 'гостей'];

//функция для отображения удобств
const showRentalAdFeatures = (element, features) => {
  const featuresList = element.querySelectorAll('.popup__feature');
  if (features) {
    featuresList.forEach((featureItem) => {
      const checkFeature = features.some(
        (feature) => featureItem.classList.contains(`popup__feature--${  feature}`)
      );

      if (!checkFeature) {
        featureItem.remove();
      }
    });
  }
};

//функция для добавления фото в галерею
const createPhotosGallery = (element, photos) => {
  const photosGallery = element.querySelector('.popup__photos');
  element.querySelector('.popup__photo').remove();
  if(photos) {
    for (const photo of photos) {
      const img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = photo;
      img.alt = 'Фотография жилья';
      img.style.width = '45px';
      img.style.height = '40px';
      photosGallery.appendChild(img);
    }
  }
};

//скрыть незаполненные данные
const hideEmptyData = (element) => {
  for (let i = 0; i < element.children.length; i++) {
    if (!element.children[i]) {
      element.children[i].classList.add('hidden');
    }
  }
};

const createRentalAdFromTemplate =(rentalAd) => {
  const rentalAdTemplate = document.querySelector('#card').content;
  const rentalListFragment = document.createDocumentFragment();
  const rentalAdElement = rentalAdTemplate.cloneNode(true);

  rentalAdElement.querySelector('.popup__title').textContent = rentalAd.offer.title;
  rentalAdElement.querySelector('.popup__text--address').textContent = rentalAd.offer.address;
  rentalAdElement.querySelector('.popup__text--price').textContent = `${rentalAd.offer.price} ₽/ночь`;
  rentalAdElement.querySelector('.popup__type').textContent = ASSOCIATED_TYPES[rentalAd.offer.type];
  rentalAdElement.querySelector('.popup__text--capacity').textContent = `${rentalAd.offer.rooms} ${getDeclination(rentalAd.offer.rooms, DECLINATION_ROOMS)} для ${rentalAd.offer.guests} ${getDeclination(rentalAd.offer.guests, DECLINATION_GUESTS)}`;
  rentalAdElement.querySelector('.popup__text--time').textContent = `Заезд после ${rentalAd.offer.checkin}, выезд до ${rentalAd.offer.checkout}`;
  showRentalAdFeatures(rentalAdElement, rentalAd.offer.features);
  rentalAdElement.querySelector('.popup__description').textContent = rentalAd.offer.description;
  createPhotosGallery(rentalAdElement, rentalAd.offer.photos);
  rentalAdElement.querySelector('.popup__avatar').src = rentalAd.author.avatar;
  hideEmptyData(rentalAdElement);

  rentalListFragment.appendChild(rentalAdElement);
  return rentalListFragment;
};

export {createRentalAdFromTemplate};
