import {validateCurrentFieldValues, setAdFormForSubmit} from './form-input.js';
import {getRentalAdsDataFromServer} from './server-exchange.js';
import {makeInteractiveMap, updateInteractiveMap} from './interactive-map.js';
import {showSuccessMessage} from './popups.js';
import {clickOnFilter} from './filters.js';
import {switchToInactiveState, debounce} from './util.js';

switchToInactiveState();

getRentalAdsDataFromServer((rentalAds) => {
  makeInteractiveMap(rentalAds);
  clickOnFilter(debounce(() => updateInteractiveMap(rentalAds)));
});

validateCurrentFieldValues();

setAdFormForSubmit(showSuccessMessage, () => {
  getRentalAdsDataFromServer((rentalAds) => {
    makeInteractiveMap(rentalAds);
    clickOnFilter(debounce(() => updateInteractiveMap(rentalAds)));
  });
});

