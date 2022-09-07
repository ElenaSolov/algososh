function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomArr = () => {
  const arrayLength = getRandomInt(3, 17);
  const array = [];
  for (let i = 0; i < arrayLength; i++) {
    array.push(getRandomInt(0, 100));
  }
  console.log(array);
  return array;
};

export const swap = (
  arr: number[],
  firstIndex: number,
  secondIndex: number
): number[] => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
};

export const wait = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
