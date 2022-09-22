import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import stringStyles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import useMediaQuery from "../../hooks/useMediaQuery";
import { DELAY_IN_MS } from "../../constants/delays";
import { NOT_VALUED } from "../../constants/initialValues";
import { reverseIterator } from "../../utils/utils";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState(NOT_VALUED);
  const [stringArray, setStringArray] = useState<Array<string>>([]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(true);
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setStringArray(inputValue.split(NOT_VALUED));
    setInputValue(NOT_VALUED);
    setStep(0);
    setDone(false);
  };

  const getState = (index: number) => {
    if (
      step >= Math.floor(stringArray.length / 2) ||
      index < step ||
      index >= stringArray.length - step
    ) {
      return ElementStates.Modified;
    } else if (index === step || index === stringArray.length - 1 - step) {
      return ElementStates.Changing;
    } else if (index < step || index > stringArray.length - 1 - step) {
      return ElementStates.Modified;
    }
    return ElementStates.Default;
  };

  const gen = useCallback(() => {
    return reverseIterator(stringArray, setStep, setStringArray);
  }, [stringArray])();

  const doStep = () => {
    const action = gen.next();
    if (action.done) {
      setDone(true);
    } else {
      setStringArray(action.value);
    }
  };

  useEffect(() => {
    let timer = window.setInterval(() => {
      if (!done) {
        doStep();
      }
    }, DELAY_IN_MS);
    if (done) {
      clearTimeout(timer);
    }
    return () => window.clearInterval(timer);
  }, [done]);

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={onSubmit} className={stringStyles.container}>
        <Input value={inputValue} onChange={onInputChange} maxLength={11} />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={!done}
          disabled={inputValue === NOT_VALUED}
        />
        <p className={stringStyles.text}>Максимум — 11 символов</p>
      </form>

      {stringArray.length > 0 && (
        <ul className={stringStyles.output}>
          {stringArray.map((letter, index) => (
            <li key={index} className={stringStyles.listItem}>
              <Circle
                state={getState(index)}
                letter={letter.toUpperCase()}
                extraClass={stringStyles.circle}
                isSmall={isNotDesktop}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
