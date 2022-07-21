import {createRentalAdFromTemplate} from './object-template.js';
import {getFilteredDataFromServer} from './filters.js';
import {switchToActiveState} from './util.js';

const CENTER_POINT_LAT = 35.68944;
const CENTER_POINT_LNG = 139.69167;
const MAP_ZOOM = 10;

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroupLayer = L.layerGroup().addTo(map);
const mainPinLayer = L.layerGroup().addTo(map);

//инициализируем карту
const createMap = () => {
  map
    .on('load', () => {
      switchToActiveState();
    })
    .setView({
      lat: CENTER_POINT_LAT,
      lng: CENTER_POINT_LNG,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

//создаем главную метку
const createMainPin = () => {

  const mainPinMarker = L.marker(
    {
      lat: CENTER_POINT_LAT,
      lng: CENTER_POINT_LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(mainPinLayer);
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

//добавляем маркеры из фильтрованных данных на карту
const createPinsOnMap = (rentalAds, createFromTemplate) => {

  const createPinMarker = (rentalAd) => {

    const pinMarker = L.marker(
      {
        lat: rentalAd.location.lat,
        lng: rentalAd.location.lng,
      },
      {
        pinIcon
      },
    );

    pinMarker
      .addTo(markerGroupLayer)
      .bindPopup(() => createFromTemplate(rentalAd));

    return pinMarker;
  };

  const filteredRentalAds = getFilteredDataFromServer(rentalAds);

  filteredRentalAds.forEach((rentalAd) => {
    createPinMarker(rentalAd);
  });
};

//получаем интерактивную карту
const mainMarker = createMainPin();

const makeInteractiveMap = (rentalAds) => {
  createMap();

  putMainPinCoordinatesIntoAddress(mainMarker);

  createPinsOnMap(rentalAds, createRentalAdFromTemplate);
};

const updateInteractiveMap = (rentalAds) => {
  markerGroupLayer.clearLayers();
  createPinsOnMap(rentalAds, createRentalAdFromTemplate);
};

const resetMap = () => {
  mainMarker.setLatLng([CENTER_POINT_LAT, CENTER_POINT_LNG]);
  markerGroupLayer.clearLayers();
};

export{makeInteractiveMap, updateInteractiveMap, resetMap};
