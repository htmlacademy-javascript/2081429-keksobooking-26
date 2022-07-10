import {switchToInactiveState} from './search-form.js';
import {validateCurrentFieldValues, setAdFormForSubmit} from './validate-form.js';
import {getRentalAdsDataFromServer} from './server-exchange.js';
import {makeInteractiveMap} from './interactive-map.js';
import {showSuccessMessage} from './server-exchange.js';


switchToInactiveState();

getRentalAdsDataFromServer(makeInteractiveMap);

validateCurrentFieldValues();

setAdFormForSubmit(showSuccessMessage);
