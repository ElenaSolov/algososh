import React, { SyntheticEvent, useEffect, useState } from "react";
import stringStyles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [stringArray, setStringArray] = useState<Array<string>>([]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(true);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setStringArray(inputValue.split(""));
    setInputValue("");
    setStep(0);
    setDone(false);
  };
  const getState = (index: number) => {
    if (
      step >= Math.floor(stringArray.length / 2) ||
      index < step ||
      index >= stringArray.length - step
    ) {
      console.log(11);
      return ElementStates.Modified;
    } else if (index === step || index === stringArray.length - 1 - step) {
      console.log(12);
      return ElementStates.Changing;
    } else if (index < step || index > stringArray.length - 1 - step) {
      console.log(13);
      return ElementStates.Modified;
    }
    return ElementStates.Default;
  };
  function* reverseIterator() {
    console.log(3);
    let start = 0;
    let end = stringArray.length - 1;
    let array = [...stringArray];
    while (start < end) {
      array[start] = stringArray[end];
      array[end] = stringArray[start];

      setStep((prevState) => {
        return prevState + 1;
      });
      start++;
      end--;
      setStringArray(array);
      console.log("array from generator", array, stringArray);
      yield array;
    }
  }
  const gen = reverseIterator();
  function doStep() {
    const action = gen.next();
    if (action.done) {
      setDone(true);
      console.log("done");
    } else {
      setStringArray(action.value);
    }
  }
  useEffect(() => {
    let setTimer = window.setInterval(() => {
      if (!done) {
        doStep();
      }
    }, 1500);
    return () => window.clearInterval(setTimer);
  }, [done]);
  return (
    <SolutionLayout title="Строка">
      <form onSubmit={onSubmit} className={stringStyles.container}>
        <Input value={inputValue} onChange={onInputChange} maxLength={11} />
        <Button type="submit" text="Развернуть" />
        <p className={stringStyles.text}>Максимум — 11 символов</p>
      </form>

      {stringArray.length && (
        <section className={stringStyles.output}>
          {stringArray.map((letter, index) => (
            <Circle
              state={getState(index)}
              key={index}
              letter={letter.toUpperCase()}
              extraClass={stringStyles.circle}
              isSmall={true}
            />
          ))}
        </section>
      )}
    </SolutionLayout>
  );
};
