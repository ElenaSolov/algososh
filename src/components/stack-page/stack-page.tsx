import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stackStyles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useMediaQuery from "../../hooks/useMediaQuery";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utils/utils";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [array, setArray] = useState<string[]>([]);
  const [head, setHead] = useState(-1);
  const [state, setState] = useState(ElementStates.Default);
  const [done, setDone] = useState(true);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setInputValue(e.target.value.slice(0, limit));
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const addValue = () => {
    setDone(false);
    setArray([...array, inputValue]);
    setInputValue("");
    setHead((prev) => prev + 1);
    setState(ElementStates.Changing);
    setDone(true);
  };

  const deleteValue = async () => {
    setDone(false);
    setState(ElementStates.Changing);
    await wait(500);
    const temp = [...array];
    temp.pop();
    setArray(temp);
    setHead((prev) => prev - 1);
    setDone(true);
  };

  const reset = () => {
    setArray([]);
    setHead(-1);
    setInputValue("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(ElementStates.Default); // set class to none
    }, 500);
    if (done) {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  return (
    <SolutionLayout title="Стек">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={stackStyles.container}
      >
        <Input
          autoFocus
          value={inputValue}
          type="number"
          onChange={onInputChange}
          maxLength={4}
        />
        <Button
          type="button"
          text="Добавить"
          disabled={inputValue === ""}
          onClick={addValue}
          isLoader={!done}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={deleteValue}
          disabled={head === -1}
          isLoader={!done}
        />
        <Button
          type="button"
          text="Очистить"
          extraClass={stackStyles.resetBtn}
          onClick={reset}
          disabled={head === -1}
        />
        <p className={stackStyles.text}>Максимум — 4 символа</p>
      </form>

      {array.length > 0 && (
        <ul className={stackStyles.output}>
          {array.map((num, index) => (
            <li key={index}>
              <Circle
                head={index === head ? "top" : null}
                index={index}
                letter={num}
                extraClass={stackStyles.circle}
                isSmall={isNotDesktop}
                state={
                  index === array.length - 1 ? state : ElementStates.Default
                }
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
