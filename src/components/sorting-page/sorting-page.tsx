import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingStyles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { getRandomArr, swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [method, setMethod] = useState("selection");
  const [direction, setDirection] = useState(Direction.Ascending);
  const [done, setDone] = useState(true);
  const [i, setI] = useState(-2);
  const [k, setK] = useState(-2);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    setArray(getRandomArr());
  }, []);

  const onValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(evt.target.value);
    console.log(method);
  };
  const reset = () => {
    setI(-2);
    setK(-2);
    setSorted(false);
  };
  useEffect(() => {
    let setTimer: number | undefined;
    if (!done) {
      setTimer = window.setInterval(() => {
        console.log(1);
        doStep();
      }, 1000);
    }
    if (done) {
      window.clearInterval(setTimer);
    }
    return () => window.clearInterval(setTimer);
  }, [done]);

  const onClick = () => {
    console.log(method);
    reset();
    setDone(false);
    method === 'bubble'
    ? bubbleSort()
    : selectionSort();
  };

  function* bubbleSort() {
    const { length } = array;
    let arr = array.slice();
    console.log(arr);
    for (let i = 0; i < length - 1; i++) {
      for (let k = 0; k < length - i - 1; k++) {
        if (
          (direction === "ascending" && arr[k] > arr[k + 1]) ||
          (direction === "descending" && arr[k] < arr[k + 1])
        ) {
          swap(arr, k, k + 1);
          console.log(i, arr, k);
        }
        yield { arr, i, k };
      }
    }
    setDone(true);
    setSorted(true);
  }
  const gen = bubbleSort();
  async function doStep() {
    const action = await gen.next();
    if (action.done) {
      setDone(true);
      console.log(3);
    } else {
      setArray(action.value.arr);
      setI(action.value.i);
      setK(action.value.k);
      console.log(action.value);
    }
  }
  const getState = (index: number) => {
    if (sorted) return ElementStates.Modified;
    if (index === k || index === k + 1) {
      return ElementStates.Changing;
    } else if (index >= array.length - i) {
      return ElementStates.Modified;
    }
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyles.container}>
        <section className={sortingStyles.radio}>
          <RadioInput
            name="method"
            label="Выбор"
            value="selection"
            checked={method === "selection"}
            onChange={onValueChange}
          />
          <RadioInput
            name="method"
            label="Пузырёк"
            value="bubble"
            checked={method === "bubble"}
            onChange={onValueChange}
          />
        </section>
        <section className={sortingStyles.method}>
          <Button
            type="button"
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => {
              setDirection(Direction.Ascending);
              onClick();
            }}
          />
          <Button
            type="button"
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => {
              setDirection(Direction.Descending);

              onClick();
            }}
          />
        </section>
        <Button
          type="button"
          text="Новый массив"
          onClick={() => {
            reset();
            setArray(getRandomArr());
          }}
        />
      </div>
      <ul className={sortingStyles.output}>
        {array?.map((el, index) => (
          <li className={sortingStyles.item} key={index}>
            <Column index={el} state={getState(index)} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
