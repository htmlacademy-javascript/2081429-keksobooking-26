const NUMBEROFRENTALAD = 10;
const ROOMSMAX = 4;
const GUESTSMAX = 8;
const PRICES = [1000, 50000];
const LATMIN = 35.6500;
const LATMAX = 35.7000;
const LNGMIN = 139.7000;
const LNGMAX = 139.8000;
const TITLES = ['The best sea view', 'The biggest apartments in town', 'Apartments in a quiet location', 'Super modern apartments', 'Apartments on the massand floor'];
const TYPES= ['palace','flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const CHECKINHOURS = ['12:00', '13:00', '14:00'];
const CHECKOUTHOURS = ['12:00', '13:00', '14:00'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

//получить целое положительное число
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//получить положительно число с плавающей точкой
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

//число для адреса изображения
const makeDoubleDigit = (digit) => (digit.toString().length === 2) ? `${digit}` : `0${digit}`;

//получить новый массив случайно длины
const getRandomLengthArray = (array) => {
  const newArray = [];
  const newArrayLength = getRandomPositiveInteger(1, array.length);

  for (let i = 0; i < newArrayLength; i++) {
    const newElement = array[getRandomPositiveInteger(1, array.length - 1)];
    if (newArray.indexOf(newElement) === -1) {
      newArray.unshift(newElement);
    }
  }
  return newArray;
};

//получить случайный элемент массива
const getRandomValueFromArray = (array) => array[getRandomPositiveInteger(1, array.length - 1)];

//создать объявление
const createRentalAdNearby = () => {
  const latitude = getRandomPositiveFloat(LATMIN, LATMAX);
  const longitude = getRandomPositiveFloat(LNGMIN, LNGMAX);

  return {
    author: {
      avatar: `img/avatars/user${makeDoubleDigit(getRandomPositiveInteger(1, NUMBEROFRENTALAD))}.png`,
    },
    offer: {
      title: getRandomValueFromArray(TITLES),
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(PRICES[0], PRICES[1]),
      type: getRandomValueFromArray(TYPES),
      rooms: getRandomPositiveInteger(1, ROOMSMAX),
      guests: getRandomPositiveInteger(1, GUESTSMAX),
      checkin: getRandomValueFromArray(CHECKINHOURS),
      checkout: getRandomValueFromArray(CHECKOUTHOURS),
      features: getRandomLengthArray(FEATURES),
      description: 'Description is not provided',
      photos: getRandomLengthArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  };
};

//создание n-количества объявлений
const createRentalAds = (number) => Array.from({length: number}, createRentalAdNearby);

createRentalAds(NUMBEROFRENTALAD);
