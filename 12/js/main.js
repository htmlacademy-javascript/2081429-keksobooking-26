import {switchToInactiveState} from './search-form.js';
import {validateCurrentFieldValues, setAdFormForSubmit} from './validate-form.js';
import {getRentalAdsDataFromServer} from './server-exchange.js';
import {makeInteractiveMap, updateInteractiveMap} from './interactive-map.js';
import {showSuccessMessage} from './popups.js';
import {clickOnFilter} from './filters.js';
import {debounce} from './util.js';
import './photos-upload.js';

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

