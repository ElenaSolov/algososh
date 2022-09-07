import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import useMediaQuery from "../../hooks/useMediaQuery";
import { wait } from "../../utils/utils";
import stackStyles from "../stack-page/stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const maxArrayLength = 7;

  const [inputValue, setInputValue] = useState("");
  const [array, setArray] = useState<string[]>([...Array(maxArrayLength)]);
  const [head, setHead] = useState(-1);
  const [tail, setTail] = useState(-1);
  const [state, setState] = useState(ElementStates.Default);
  const [del, setDel] = useState(false);

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
    if (head === -1) setHead(0);
    setDel(false);
    setState(ElementStates.Changing);
    setTail((prev) => prev + 1);
    await wait(500);
    const temp = [...array];
    temp[tail + 1] = inputValue;
    setArray(temp);
    setInputValue("");
  };
  const dequeue = async () => {
    setDel(true);
    setState(ElementStates.Changing);
    await wait(500);
    const temp = [...array];
    temp[head] = "";
    setArray(temp);
    setHead((prev) => (prev < maxArrayLength - 1 ? prev + 1 : prev));
  };
  const reset = () => {
    setArray([...Array(maxArrayLength)]);
    setHead(-1);
    setTail(-1);
    setInputValue("");
  };

  // useEffect(() => {}, [array]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(ElementStates.Default); // set class to none
    }, 500);

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
        />
        <Button
          type="button"
          text="Удалить"
          onClick={dequeue}
          disabled={tail === -1 || head >= maxArrayLength || head > tail}
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

      <section className={stackStyles.output}>
        {array.map((num, index) => (
          <Circle
            head={index === head ? "head" : null}
            tail={index === tail ? "tail" : null}
            key={index}
            index={index}
            letter={num}
            extraClass={stackStyles.circle}
            isSmall={isNotDesktop}
            state={getState(index)}
          />
        ))}
      </section>
    </SolutionLayout>
  );
};
