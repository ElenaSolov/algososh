import { Direction } from "../types/direction";

export function getRandomInt(min: number, max: number): number {
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

export function* bubbleSort(
  array: number[],
  direction: { direction: Direction }
) {
  const { length } = array;
  let arr = array.slice();
  for (let i = 0; i < length - 1; i++) {
    for (let k = 0; k < length - i - 1; k++) {
      if (
        (direction.direction === Direction.Ascending && arr[k] > arr[k + 1]) ||
        (direction.direction === Direction.Descending && arr[k] < arr[k + 1])
      ) {
        swap(arr, k, k + 1);
      }
      yield { arr, i, k };
    }
  }
  // setDone(true);
  // setSorted(true);
}

export const wait = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
