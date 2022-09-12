import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingStyles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { getRandomArr, swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { BUBBLE, SELECTION } from "../../constants/element-captions";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [method, setMethod] = useState("selection");
  const [direction, setDirection] = useState({
    direction: Direction.Ascending,
  });
  const [done, setDone] = useState(true);
  const [i, setI] = useState(-2);
  const [k, setK] = useState(-2);
  const [sorted, setSorted] = useState(false);
  let gen = method === BUBBLE ? bubbleSort() : selectionSort();

  const onValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(evt.target.value);
  };

  const reset = () => {
    setI(-2);
    setK(-2);
    setSorted(false);
  };

  useEffect(() => {
    setArray(getRandomArr());
  }, []);

  useEffect(() => {
    reset();
    gen = method === "bubble" ? bubbleSort() : selectionSort();
  }, [direction, method]);

  useEffect(() => {
    let setTimer: number | undefined;
    if (!done) {
      setTimer = window.setInterval(() => {
        doStep();
      }, 500);
    }
    if (done) {
      window.clearInterval(setTimer);
    }
    return () => window.clearInterval(setTimer);
  }, [done]);

  const onClick = (dir: Direction) => {
    setDirection({ direction: dir });
    setDone(false);
  };

  function* bubbleSort() {
    const { length } = array;
    let arr = array.slice();
    for (let i = 0; i < length - 1; i++) {
      for (let k = 0; k < length - i - 1; k++) {
        if (
          (direction.direction === Direction.Ascending &&
            arr[k] > arr[k + 1]) ||
          (direction.direction === Direction.Descending && arr[k] < arr[k + 1])
        ) {
          swap(arr, k, k + 1);
        }
        yield { arr, i, k };
      }
    }
    setDone(true);
    setSorted(true);
  }

  function* selectionSort() {
    const { length } = array;
    let arr = array.slice();
    let i, k: number;
    for (i = 0; i < length; i++) {
      let min: number = i;
      let max: number = i;
      for (k = i + 1; k < length; k++) {
        yield { arr, i, k };
        if (direction.direction === Direction.Ascending && arr[k] < arr[min]) {
          min = k;
        } else if (
          direction.direction === Direction.Descending &&
          arr[k] > arr[max]
        ) {
          max = k;
        }
      }
      if (direction.direction === Direction.Ascending) {
        swap(arr, i, min);
        yield { arr, i, k, min };
      }
      if (direction.direction === Direction.Descending) {
        swap(arr, i, max);
        yield { arr, i, k, max };
      }
    }
    setDone(true);
    setSorted(true);
  }

  function doStep() {
    const action = gen.next();
    if (action.done) {
      setDone(true);
    } else {
      setArray(action.value.arr);
      setI(action.value.i);
      setK(action.value.k);
    }
  }

  const getState = (index: number) => {
    if (sorted) return ElementStates.Modified;
    if (method === BUBBLE && (index === k || index === k + 1)) {
      return ElementStates.Changing;
    } else if (method === BUBBLE && index >= array.length - i) {
      return ElementStates.Modified;
    } else if (method === SELECTION && (index === i || index === k)) {
      return ElementStates.Changing;
    } else if (method === SELECTION && index < i) {
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
            value={SELECTION}
            checked={method === SELECTION}
            onChange={onValueChange}
          />
          <RadioInput
            name="method"
            label="Пузырёк"
            value={BUBBLE}
            checked={method === BUBBLE}
            onChange={onValueChange}
          />
        </section>
        <section className={sortingStyles.method}>
          <Button
            type="button"
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => onClick(Direction.Ascending)}
            isLoader={!done}
          />
          <Button
            type="button"
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => onClick(Direction.Descending)}
            isLoader={!done}
          />
        </section>
        <Button
          type="button"
          text="Новый массив"
          onClick={() => {
            reset();
            setArray(getRandomArr());
          }}
          disabled={!done}
        />
      </div>
      <ul className={sortingStyles.output}>
        {array.map((el, index) => (
          <li className={sortingStyles.item} key={index}>
            <Column index={el} state={getState(index)} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
