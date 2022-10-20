import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stackStyles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useMediaQuery from "../../hooks/useMediaQuery";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utils/utils";
import Stack, { IStack } from "../../classes/Stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TOP } from "../../constants/element-captions";
import { NOT_VALUED } from "../../constants/initialValues";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState(NOT_VALUED);
  const [stack] = useState<IStack<string>>(new Stack<string>());
  const [array, setArray] = useState<string[]>([]);
  const [top, setTop] = useState(-1);
  const [state, setState] = useState(ElementStates.Default);
  const [done, setDone] = useState(true);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setInputValue(e.target.value.slice(0, limit));
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const updateArray = () => {
    setArray(stack.storage);
    setTop(stack.size() - 1);
  };

  const addValue = async () => {
    setDone(false);
    stack.push(inputValue);
    updateArray();
    setInputValue(NOT_VALUED);
    setState(ElementStates.Changing);
    await wait(SHORT_DELAY_IN_MS);
    setState(ElementStates.Default);
    setDone(true);
  };

  const deleteValue = async () => {
    setDone(false);
    setState(ElementStates.Changing);
    await wait(SHORT_DELAY_IN_MS);
    stack.pop();
    updateArray();
    setState(ElementStates.Default);
    setDone(true);
  };

  const reset = () => {
    stack.clear();
    updateArray();
    setInputValue(NOT_VALUED);
  };

  useEffect(() => {
    setArray(stack.storage);
  }, []);

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
          extraClass="cyAddButton"
          disabled={inputValue === NOT_VALUED}
          onClick={addValue}
          isLoader={!done}
        />
        <Button
          type="button"
          text="Удалить"
          extraClass="cyDeleteButton"
          onClick={deleteValue}
          disabled={array.length <= 0}
          isLoader={!done}
        />
        <Button
          type="button"
          text="Очистить"
          extraClass={stackStyles.resetBtn}
          onClick={reset}
          disabled={array.length <= 0}
        />
        <p className={stackStyles.text}>Максимум — 4 символа</p>
      </form>

      {array.length > 0 && (
        <ul className={stackStyles.output}>
          {array.map((num, index) => (
            <li key={index}>
              <Circle
                head={index === top ? TOP : null}
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
