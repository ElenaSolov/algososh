import React, { SyntheticEvent, useEffect, useState } from "react";
import fibStyles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stringStyles from "../string/string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useMediaQuery from "../../hooks/useMediaQuery";
import { DELAY_IN_MS } from "../../constants/delays";
import { NOT_VALUED } from "../../constants/initialValues";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | string>(NOT_VALUED);
  const [array, setArray] = useState<number[]>([1, 1]);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(true);
  const [step, setStep] = useState(0);

  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.target.value);
  };

  const onSubmit = (e: SyntheticEvent) => {
    setDone(false);
    e.preventDefault();
    setStep(1);
    if (inputValue) {
      if (inputValue < 1 || inputValue > 19) {
        setError(true);
      }
      if (inputValue > array.length - 1) fib();
    }
  };

  const fib = () => {
    let nextNum: number;
    const temp = [...array];
    if (inputValue) {
      for (let i = array.length - 1; i < inputValue; i++) {
        nextNum = temp[i - 1] + temp[i];
        temp.push(nextNum);
      }
    }
    setArray(temp);
  };

  useEffect(() => {
    let setTimer: number | undefined;
    if (inputValue) {
      if (!done && step <= inputValue) {
        setTimer = window.setInterval(() => {
          setStep((prev) => prev + 1);
          if (step === inputValue) {
            setDone(true);
            setInputValue(NOT_VALUED);
          }
        }, DELAY_IN_MS);
      }
    }
    return () => window.clearInterval(setTimer);
  }, [step, array.length]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={onSubmit} className={stringStyles.container}>
        <Input
          placeholder="Введите число"
          type="number"
          value={inputValue}
          onChange={onInputChange}
          max={19}
          min={1}
        />
        <Button
          type="submit"
          text="Рассчитать"
          isLoader={!done}
          disabled={inputValue === NOT_VALUED}
        />
        <p className={stringStyles.text}>Максимальное число — 19</p>
      </form>
      {error && <p>Введите целое число от 0 до 19</p>}
      {step > 0 && (
        <ul className={fibStyles.output}>
          {array.map((value, index) => {
            return index + 1 <= step ? (
              <li className={fibStyles.listItem} key={index}>
                <Circle
                  index={index}
                  letter={value.toString()}
                  isSmall={isNotDesktop}
                  extraClass={fibStyles.circle}
                />
              </li>
            ) : null;
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
