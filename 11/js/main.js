import {switchToInactiveState} from './search-form.js';
import {validateCurrentFieldValues, setAdFormForSubmit} from './validate-form.js';
import {getRentalAdsDataFromServer} from './server-exchange.js';
import {makeInteractiveMap} from './interactive-map.js';
import {showSuccessMessage} from './server-exchange.js';
import {clickOnFilter} from './filters.js';
import {debounce} from './util.js';

switchToInactiveState();

getRentalAdsDataFromServer((rentalAds) => {
  makeInteractiveMap(rentalAds);
  clickOnFilter(debounce(() => makeInteractiveMap(rentalAds)));
});

validateCurrentFieldValues();

setAdFormForSubmit(showSuccessMessage);
