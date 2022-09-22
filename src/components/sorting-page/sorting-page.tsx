import React, { useCallback, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingStyles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { getRandomArr, bubbleSort, selectionSort } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { BUBBLE, SELECTION } from "../../constants/element-captions";
import { INITIAL_INDEX } from "../../constants/initialValues";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [method, setMethod] = useState("selection");
  const [direction, setDirection] = useState({
    direction: Direction.Ascending,
  });
  const [done, setDone] = useState(true);
  const [i, setI] = useState(INITIAL_INDEX);
  const [k, setK] = useState(INITIAL_INDEX);
  const [sorted, setSorted] = useState(false);
  let gen = useCallback(() => {
    return method === BUBBLE
      ? bubbleSort(array, direction)
      : selectionSort(array, direction);
  }, [method, direction])();

  const onValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(evt.target.value);
  };

  const reset = () => {
    setI(INITIAL_INDEX);
    setK(INITIAL_INDEX);
    setSorted(false);
  };

  useEffect(() => {
    setArray(getRandomArr());
  }, []);

  useEffect(() => {
    reset();
  }, [direction, method]);

  useEffect(() => {
    let setTimer: number | undefined;
    if (!done) {
      setTimer = window.setInterval(() => {
        doStep();
      }, SHORT_DELAY_IN_MS);
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

  const doStep = () => {
    const action = gen.next();
    if (action.done) {
      setDone(true);
      setSorted(true);
    } else {
      setArray(action.value.arr);
      setI(action.value.i);
      setK(action.value.k);
    }
  };

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
