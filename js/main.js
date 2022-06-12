//функция возвращает случайное целое число из диапазона
function getRandomInt(min, max) {
  if (max < min) {
    return getRandomInt(max, min);
  }
  return Math.floor(min + Math.random()*(max + 1 - min));
}
getRandomInt(1, 3);

//функция возвращает случайно число из диапазона с заданной точностью
function getRandomNum(min, max, fraction=2) {
  if (max < min) {
    return getRandomNum(max, min, fraction);
  } else if (max === min) {
    return max.toFixed(fraction);
  }
  return (min + Math.random()*(max + 1 - min)).toFixed(fraction);
}
getRandomNum(1, 3);
