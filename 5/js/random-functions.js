//получить случайное целое положительное число
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//получить случайное положительное число с плавающей точкой
const getRandomPositiveFloat = (a, b, digits = 4) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

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

export{getRandomPositiveInteger, getRandomPositiveFloat, getRandomLengthArray, getRandomValueFromArray};
