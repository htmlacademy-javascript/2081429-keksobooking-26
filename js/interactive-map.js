import {switchToActiveState} from './search-form.js';
import {createRentalAds} from './create-objects.js';
import {createRentalAdFromTemplate} from './object-template.js';

const map = L.map('map-canvas');

//инициализируем карту
const createMap = () => {
  map
    .on('load', () => {
      switchToActiveState();
    })
    .setView({
      lat: 35.68944,
      lng: 139.69167,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

//создаем главную метку
const createMainPin = () => {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.68944,
      lng: 139.69167,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);
  return mainPinMarker;
};


//получаем координаты метки
const putMainPinCoordinatesIntoAddress = (marker) => {
  const address = document.querySelector('#address');
  const markerCoordinates = marker.getLatLng();

  address.value = `${markerCoordinates.lat.toFixed(5)}, ${markerCoordinates.lng.toFixed(5)}`;

  marker.on('moveend', (evt) => {
    const currentCoordinates = evt.target.getLatLng();
    address.value = `${currentCoordinates.lat.toFixed(5)}, ${currentCoordinates.lng.toFixed(5)}`;
  });
};


const createPinsOnMap = (numberAds) => {

  const rentalAds = createRentalAds(numberAds);

  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const markerGroup = L.layerGroup().addTo(map);

  const createPinMarker = (rentalAd) => {
    const {author, offer, location} = rentalAd;


    const pinMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        pinIcon
      },
    );

    pinMarker
      .addTo(markerGroup)
      .bindPopup(createRentalAdFromTemplate(author, offer));

    return pinMarker;
  };

  rentalAds.forEach((rentalAd) => {
    createPinMarker(rentalAd);
  });
};

//получаем интерактивную карту
const makeInteractiveMap = (numberAds) => {
  createMap();

  const marker = createMainPin();
  putMainPinCoordinatesIntoAddress(marker);

  createPinsOnMap(numberAds);
};

export{makeInteractiveMap};