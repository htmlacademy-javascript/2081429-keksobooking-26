const OFFER_LOW_PRICE = 10000;
const OFFER_HIGH_PRICE = 50000;
const NUMBER_OF_RENTAL_AD = 10;
const ANY_VALUE = 'any';
const PRICE_CATEGORIES = ['low', 'middle', 'high'];

const mapFiltersForm = document.querySelector('.map__filters');
const typeFilterElement = mapFiltersForm.querySelector('[name="housing-type"]');
const priceFilterElement = mapFiltersForm.querySelector('[name="housing-price"]');
const roomsFilterElement = mapFiltersForm.querySelector('[name="housing-rooms"]');
const guestsFilterElement = mapFiltersForm.querySelector('[name="housing-guests"]');
const featuresCheckboxElements = mapFiltersForm.querySelectorAll('.map__features input[type=checkbox]');

//функции для фильтрации по каждому свойству
const filterRentalAdByType = (rentalAd) => {
  if ((typeFilterElement.value === ANY_VALUE) || (rentalAd.offer.type === typeFilterElement.value)) {
    return true;
  }
};

const filterRentalAdByPrice = (rentalAd) => {
  if ((priceFilterElement.value === ANY_VALUE)
  || ((priceFilterElement.value === PRICE_CATEGORIES[0]) && (rentalAd.offer.price < OFFER_LOW_PRICE))
  || ((priceFilterElement.value === PRICE_CATEGORIES[1]) && (rentalAd.offer.price >= OFFER_LOW_PRICE && rentalAd.offer.price <= OFFER_HIGH_PRICE))
  || ((priceFilterElement.value === PRICE_CATEGORIES[2]) && (rentalAd.offer.price >= OFFER_HIGH_PRICE))) {
    return true;
  }
};

const filterRentalAdByRooms = (rentalAd) => ((roomsFilterElement.value === ANY_VALUE) || (rentalAd.offer.rooms === parseInt(roomsFilterElement.value, 10)));

const filterRentalAdByGuests = (rentalAd) => ((guestsFilterElement.value === ANY_VALUE) || (rentalAd.offer.guests === parseInt(guestsFilterElement.value, 10)));

const filterRentalAdByFeatures = (rentalAd, selectedFeatures) => {
  if (rentalAd.offer.features) {
    return selectedFeatures.every((feature) =>  rentalAd.offer.features.includes(feature));
  }
  return true;
};

const createArrayOfSelectedFeatures = () => {
  const features = [];
  featuresCheckboxElements.forEach((feature) => {
    if (feature.checked) {
      features.push(feature.value);
    }
  });
  return features;
};

//фильтрация входных данных с сервера
const getFilteredDataFromServer = (rentalAds) => {
  const dublicatedRentalAds = rentalAds.slice();
  const filteredRentalAds = [];
  const selectedFeatures = createArrayOfSelectedFeatures();

  for (const rentalAd of dublicatedRentalAds) {
    if (filteredRentalAds.length >= NUMBER_OF_RENTAL_AD) {
      break;
    }

    if (filterRentalAdByType(rentalAd)
    && filterRentalAdByPrice(rentalAd)
    && filterRentalAdByRooms(rentalAd)
    && filterRentalAdByGuests(rentalAd)
    && filterRentalAdByFeatures(rentalAd, selectedFeatures)) {
      filteredRentalAds.push(rentalAd);
    }
  }
  return filteredRentalAds;
};

const clickOnFilter = (cb) => {
  typeFilterElement.addEventListener('change', () => {
    cb();
  });

  typeFilterElement.addEventListener('change', () => {
    cb();
  });

  priceFilterElement.addEventListener('change', () => {
    cb();
  });

  roomsFilterElement.addEventListener('change', () => {
    cb();
  });

  guestsFilterElement.addEventListener('change', () => {
    cb();
  });

  featuresCheckboxElements.forEach((feature) => {
    feature.addEventListener('click', () => {
      cb();
    });
  });
};

export{getFilteredDataFromServer, clickOnFilter};

