import {createRentalAds} from './create-objects.js';

const ASSOCIATED_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

//создание строки по заселению в нужном формате
const createCapacitySentence = (roomNumber, guestNumber) => {
  const room = (roomNumber % 10 !== 1) ? ' комнаты ' : ' комната ';
  const guest = (guestNumber % 10 !== 1) ? ' гостей' : ' гостя';

  return `${roomNumber + room  }для ${  guestNumber  }${guest}`;
};

//функция для отображения удобств
const showRentalAdFeatures = (element, features) => {
  const featuresList = element.querySelectorAll('.popup__feature');
  featuresList.forEach((featureItem) => {
    const checkFeature = features.some(
      (feature) => featureItem.classList.contains(`popup__feature--${  feature}`)
    );

    if (!checkFeature) {
      featureItem.remove();
    }
  });
};

//функция для добавления фото в галерею
const createPhotosGallery = (element, photos) => {
  const photosGallery = element.querySelector('.popup__photos');

  for (const photo of photos) {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = photo;
    img.alt = 'Фотография жилья';
    photosGallery.appendChild(img);
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

const rentalAdTemplate = document.querySelector('#card').content;

const rentalAds = createRentalAds(1);

const testInCanvas = document.querySelector('#map-canvas');
const rentalListFragment = document.createDocumentFragment();

rentalAds.forEach(({author, offer, }) => {
  const rentalAdElement = rentalAdTemplate.cloneNode(true);

  rentalAdElement.querySelector('.popup__title').textContent = offer.title;
  rentalAdElement.querySelector('.popup__text--address').textContent = offer.address;
  rentalAdElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  rentalAdElement.querySelector('.popup__type').textContent = ASSOCIATED_TYPES[offer.type];
  rentalAdElement.querySelector('.popup__text--capacity').textContent = createCapacitySentence(offer.rooms, offer.guests);
  rentalAdElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  showRentalAdFeatures(rentalAdElement, offer.features);
  rentalAdElement.querySelector('.popup__description').textContent = offer.description;
  createPhotosGallery(rentalAdElement, offer.photos);
  rentalAdElement.querySelector('.popup__avatar').src = author.avatar;

  hideEmptyData(rentalAdElement);

  rentalListFragment.appendChild(rentalAdElement);
});

testInCanvas.appendChild(rentalListFragment);

