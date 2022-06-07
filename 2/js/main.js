//функция возвращает случайное целое число из диапазона
function getRandomInt(min, max) {
  if (max > min) {
    return Math.floor(min + Math.random()*(max + 1 - min)); //для случаев, когда max < min или они равны, будет "undefined"
  }
}
getRandomInt(1, 3);

//функция возвращает случайно число из диапазона с заданной точностью
function getRandomNum(min, max, fraction=2) {
  if (max > min) {
    return (min + Math.random()*(max + 1 - min)).toFixed(fraction); //для случаев, когда max < min или они равны, будет "undefined"
  }
}
getRandomNum(1, 3);
