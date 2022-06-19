const NUMBER_OF_RENTAL_AD = 10;
const ROOMS_MAX = 4;
const GUESTS_MAX = 8;
const PRICES = [1000, 50000];
const LAT_MIN = 35.6500;
const LAT_MAX = 35.7000;
const LNG_MIN = 139.7000;
const LNG_MAX = 139.8000;
const TITLES = ['The best sea view', 'The biggest apartments in town', 'Apartments in a quiet location', 'Super modern apartments', 'Apartments on the massand floor'];
const TYPES= ['palace','flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
const CHECKOUT_HOURS = ['12:00', '13:00', '14:00'];
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
const makeDoubleDigit = (digit) => (digit >= 10) ? `${digit}` : `0${digit}`;

//получить новый массив случайной длины
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
const createRentalAdNearby = (index) => {
  const latitude = getRandomPositiveFloat(LAT_MIN, LAT_MAX);
  const longitude = getRandomPositiveFloat(LNG_MIN, LNG_MAX);

  return {
    author: {
      avatar: `img/avatars/user${makeDoubleDigit(index)}.png`,
    },
    offer: {
      title: getRandomValueFromArray(TITLES),
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(PRICES[0], PRICES[1]),
      type: getRandomValueFromArray(TYPES),
      rooms: getRandomPositiveInteger(1, ROOMS_MAX),
      guests: getRandomPositiveInteger(1, GUESTS_MAX),
      checkin: getRandomValueFromArray(CHECKIN_HOURS),
      checkout: getRandomValueFromArray(CHECKOUT_HOURS),
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
const createRentalAds = (number) => {
  const newArray = [];
  for (let i = 1; i <= number; i++) {
    newArray.push(createRentalAdNearby(i));
  }
  return newArray;
};

createRentalAds(NUMBER_OF_RENTAL_AD);
