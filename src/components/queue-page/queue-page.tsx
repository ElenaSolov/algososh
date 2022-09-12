import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import useMediaQuery from "../../hooks/useMediaQuery";
import { wait } from "../../utils/utils";
import stackStyles from "../stack-page/stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const maxArrayLength = 7;

  const [inputValue, setInputValue] = useState("");
  const [array, setArray] = useState<string[]>([...Array(maxArrayLength)]);
  const [head, setHead] = useState(-1);
  const [tail, setTail] = useState(-1);
  const [state, setState] = useState(ElementStates.Default);
  const [del, setDel] = useState(false);
  const [done, setDone] = useState(true);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setInputValue(e.target.value.slice(0, limit));
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const getState = (index: number) => {
    if (del) {
      return index === head ? state : ElementStates.Default;
    }
    return index === tail ? state : ElementStates.Default;
  };

  const enqueue = async () => {
    setDone(false);
    if (head === -1) setHead(0);
    setDel(false);
    setState(ElementStates.Changing);
    setTail((prev) => prev + 1);
    await wait(SHORT_DELAY_IN_MS);
    const temp = [...array];
    temp[tail + 1] = inputValue;
    setArray(temp);
    setInputValue("");
    setDone(true);
  };

  const dequeue = async () => {
    setDone(false);
    setDel(true);
    setState(ElementStates.Changing);
    await wait(SHORT_DELAY_IN_MS);
    const temp = [...array];
    temp[head] = "";
    setArray(temp);
    setHead((prev) => (prev < maxArrayLength - 1 ? prev + 1 : prev));
    setDone(true);
  };

  const reset = () => {
    setArray([...Array(maxArrayLength)]);
    setHead(-1);
    setTail(-1);
    setInputValue("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(ElementStates.Default);
    }, SHORT_DELAY_IN_MS);
    if (done) clearTimeout(timer);

    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  return (
    <SolutionLayout title="Очередь">
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
          min={1}
        />
        <Button
          type="button"
          text="Добавить"
          disabled={tail === maxArrayLength - 1 || inputValue === ""}
          onClick={enqueue}
          isLoader={!done}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={dequeue}
          disabled={tail === -1 || head >= maxArrayLength || head > tail}
          isLoader={!done}
        />
        <Button
          type="button"
          text="Очистить"
          extraClass={stackStyles.resetBtn}
          onClick={reset}
          disabled={tail === -1}
        />
        <p className={stackStyles.text}>Максимум — 4 символа</p>
      </form>

      <ul className={stackStyles.output}>
        {array.map((num, index) => (
          <li key={index}>
            <Circle
              head={index === head ? "head" : null}
              tail={index === tail ? "tail" : null}
              index={index}
              letter={num}
              extraClass={stackStyles.circle}
              isSmall={isNotDesktop}
              state={getState(index)}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
