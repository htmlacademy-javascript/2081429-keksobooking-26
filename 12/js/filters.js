const OFFER_LOW_PRICE = 10000;
const OFFER_HIGH_PRICE = 50000;

const mapFiltersForm = document.querySelector('.map__filters');

const typeFilterElement = mapFiltersForm.querySelector('[name="housing-type"]');
const priceFilterElement = mapFiltersForm.querySelector('[name="housing-price"]');
const roomsFilterElement = mapFiltersForm.querySelector('[name="housing-rooms"]');
const guestsFilterElement = mapFiltersForm.querySelector('[name="housing-guests"]');

//подсчет очков за доп условия
const featuresListElement = mapFiltersForm.querySelector('.map__features');

const featuresCheckboxElements = featuresListElement.querySelectorAll('input[type=checkbox]');

const getFeaturePoints = (rentalAd) => {
  let rank = 0;
  const features = rentalAd.offer.features;
  if (rentalAd.offer.features) {
    featuresCheckboxElements.forEach((element) => {
      if (element.checked && features.includes(element.value)) {
        rank ++;
      }
    });
  }
  return rank;
};

const compareFeatures = (featureA, featureB) => {
  const rankA = getFeaturePoints(featureA);
  const rankB = getFeaturePoints(featureB);

  return rankB - rankA;
};

//сравнение с ценовым диапазоном
const filterRentalAdByPrice = (rentalAds) => {
  if (priceFilterElement.value === 'low') {
    return rentalAds.filter((rentalAd) => rentalAd.offer.price < OFFER_LOW_PRICE);
  } else if (priceFilterElement.value === 'middle') {
    return rentalAds.filter((rentalAd) => rentalAd.offer.price >= OFFER_LOW_PRICE && rentalAd.offer.price <= OFFER_HIGH_PRICE);
  } else if ((priceFilterElement.value === 'high')) {
    return rentalAds.filter((rentalAd) => rentalAd.offer.price >= OFFER_HIGH_PRICE);
  } else {
    return rentalAds;
  }
};

const getFilteredDataFromServer = (rentalAds) => {
  const rentalAdsCopy = rentalAds.slice();

  const filteredArrayByType = (typeFilterElement.value === 'any') ? rentalAdsCopy : rentalAdsCopy.filter((rentalAd) => rentalAd.offer.type === typeFilterElement.value);
  const filteredArrayByPrice = filterRentalAdByPrice(filteredArrayByType);
  const filteredArrayByRooms = (roomsFilterElement.value === 'any') ? filteredArrayByPrice : filteredArrayByPrice.filter((rentalAd) => rentalAd.offer.rooms === parseInt(roomsFilterElement.value, 10));
  const filteredArrayByGuests = (guestsFilterElement.value === 'any') ? filteredArrayByRooms : filteredArrayByRooms.filter((rentalAd) => rentalAd.offer.guests === parseInt(guestsFilterElement.value, 10));
  const filteredArrayByFeatures = filteredArrayByGuests.sort(compareFeatures);

  return filteredArrayByFeatures;
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

export {getFilteredDataFromServer, clickOnFilter};
