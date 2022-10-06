import React from "react";
import { bubbleSort, selectionSort } from "../../utils/utils";
import { Direction } from "../../types/direction";

describe("<SortingPage />", () => {
  const randomArr = [4, 6, 1];

  it("bubbleSort function sorts empty array correctly", () => {
    const ascGen = bubbleSort([], { direction: Direction.Ascending });
    expect(ascGen.next().value).toEqual({ arr: [], i: 0, k: 0 });
    const desGen = bubbleSort([], { direction: Direction.Descending });
    expect(desGen.next().value).toEqual({ arr: [], i: 0, k: 0 });
  });
  it("bubbleSort function sorts array with one element correctly", () => {
    const ascGen = bubbleSort([1], { direction: Direction.Ascending });
    expect(ascGen.next().value).toEqual({ arr: [1], i: 0, k: 0 });
    const desGen = bubbleSort([], { direction: Direction.Descending });
    expect(desGen.next().value).toEqual({ arr: [], i: 0, k: 0 });
  });
  it("bubbleSort function sorts array with multiple element correctly in asc order", () => {
    const ascGen = bubbleSort(randomArr, { direction: Direction.Ascending });
    let output;
    let result = ascGen.next();
    while (!result.done) {
      output = result.value.arr;
      result = ascGen.next();
    }
    expect(output).toEqual(randomArr.sort((a, b) => a - b));
  });
  it("bubbleSort function sorts array with multiple element correctly in des order", () => {
    const ascGen = bubbleSort(randomArr, { direction: Direction.Descending });
    let output;
    let result = ascGen.next();
    while (!result.done) {
      output = result.value.arr;
      result = ascGen.next();
    }
    expect(output).toEqual(randomArr.sort((a, b) => b - a));
  });
  it("selectionSort function sorts empty array correctly", () => {
    const ascGen = selectionSort([], { direction: Direction.Ascending });
    expect(ascGen.next().value).toEqual({ arr: [], i: 0, k: 0 });
    const desGen = selectionSort([], { direction: Direction.Descending });
    expect(desGen.next().value).toEqual({ arr: [], i: 0, k: 0 });
  });
  it("selectionSort function sorts array with one element correctly", () => {
    const ascGen = selectionSort([1], { direction: Direction.Ascending });
    expect(ascGen.next().value).toEqual({ arr: [1], i: 0, k: 0 });
    const desGen = selectionSort([], { direction: Direction.Descending });
    expect(desGen.next().value).toEqual({ arr: [], i: 0, k: 0 });
  });
  it("selectionSort function sorts array with multiple element correctly in asc order", () => {
    const ascGen = selectionSort(randomArr, { direction: Direction.Ascending });
    let output;
    let result = ascGen.next();
    while (!result.done) {
      output = result.value.arr;
      result = ascGen.next();
    }
    expect(output).toEqual(randomArr.sort((a, b) => a - b));
  });
  it("selectionSort function sorts array with multiple element correctly in des order", () => {
    const ascGen = selectionSort(randomArr, {
      direction: Direction.Descending,
    });
    let output;
    let result = ascGen.next();
    while (!result.done) {
      output = result.value.arr;
      result = ascGen.next();
    }
    expect(output).toEqual(randomArr.sort((a, b) => b - a));
  });
});
