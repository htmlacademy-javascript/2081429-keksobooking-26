import {switchToInactiveState} from './search-form.js';
import {validateFields} from './validate-form.js';
import {makeInteractiveMap} from './interactive-map.js';

const NUMBER_OF_RENTAL_AD = 10;

switchToInactiveState();

makeInteractiveMap(NUMBER_OF_RENTAL_AD);

validateFields();

