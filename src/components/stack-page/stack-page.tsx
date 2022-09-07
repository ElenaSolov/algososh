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
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setInputValue(e.target.value.slice(0, limit));
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const addValue = () => {
    setArray([...array, inputValue]);
    setInputValue("");
    setHead((prev) => prev + 1);
    setState(ElementStates.Changing);
  };
  const deleteValue = async () => {
    setState(ElementStates.Changing);
    await wait(500);
    const temp = [...array];
    temp.pop();
    setArray(temp);
    setHead((prev) => prev - 1);
  };
  const reset = () => {
    setArray([]);
    setInputValue("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(ElementStates.Default); // set class to none
    }, 500);

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
          value={inputValue}
          type="number"
          onChange={onInputChange}
          maxLength={4}
        />
        <Button type="button" text="Добавить" onClick={addValue} />
        <Button type="button" text="Удалить" onClick={deleteValue} />
        <Button
          type="button"
          text="Очистить"
          extraClass={stackStyles.resetBtn}
          onClick={reset}
        />
        <p className={stackStyles.text}>Максимум — 4 символа</p>
      </form>

      {array.length > 0 && (
        <section className={stackStyles.output}>
          {array.map((num, index) => (
            <Circle
              // state={getState(index)}
              head={index === head ? "top" : null}
              key={index}
              index={index}
              letter={num}
              extraClass={stackStyles.circle}
              isSmall={isNotDesktop}
              state={index === array.length - 1 ? state : ElementStates.Default}
            />
          ))}
        </section>
      )}
    </SolutionLayout>
  );
};
