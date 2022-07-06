const ASSOCIATED_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

//создание строки по заселению в нужном формате
const createCapacitySentence = (roomNumber, guestNumber) => {
  let room = ' комнат ';

  if ((roomNumber > 10) && (roomNumber < 20)) {
    room = ' комнат ';
  } else if (roomNumber % 10 === 1) {
    room = ' комната ';
  } else if ((roomNumber % 10 > 1) && (roomNumber % 10 < 5)) {
    room = ' комнаты ';
  }

  const guest = ((guestNumber % 10 !== 1) || (guestNumber === 11)) ? ' гостей' : ' гостя';

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
  element.querySelector('.popup__photo').remove();

  for (const photo of photos) {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = photo;
    img.alt = 'Фотография жилья';
    img.style.width = '45px';
    img.style.height = '40px';
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

const createRentalAdFromTemplate =(rentalAdAuthor, rentalAdOffer) => {
  const rentalAdTemplate = document.querySelector('#card').content;
  const rentalListFragment = document.createDocumentFragment();
  const rentalAdElement = rentalAdTemplate.cloneNode(true);

  rentalAdElement.querySelector('.popup__title').textContent = rentalAdOffer.title;
  rentalAdElement.querySelector('.popup__text--address').textContent = rentalAdOffer.address;
  rentalAdElement.querySelector('.popup__text--price').textContent = `${rentalAdOffer.price} ₽/ночь`;
  rentalAdElement.querySelector('.popup__type').textContent = ASSOCIATED_TYPES[rentalAdOffer.type];
  rentalAdElement.querySelector('.popup__text--capacity').textContent = createCapacitySentence(rentalAdOffer.rooms, rentalAdOffer.guests);
  rentalAdElement.querySelector('.popup__text--time').textContent = `Заезд после ${rentalAdOffer.checkin}, выезд до ${rentalAdOffer.checkout}`;
  showRentalAdFeatures(rentalAdElement, rentalAdOffer.features);
  rentalAdElement.querySelector('.popup__description').textContent = rentalAdOffer.description;
  createPhotosGallery(rentalAdElement, rentalAdOffer.photos);
  rentalAdElement.querySelector('.popup__avatar').src = rentalAdAuthor.avatar;

  hideEmptyData(rentalAdElement);

  rentalListFragment.appendChild(rentalAdElement);
  return rentalListFragment;
};

export {createRentalAdFromTemplate};
