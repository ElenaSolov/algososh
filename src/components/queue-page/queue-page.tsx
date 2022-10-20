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
import Queue, { IQueue } from "../../classes/Queue";
import { HEAD, TAIL } from "../../constants/element-captions";
import { maxArrayLength, NOT_VALUED } from "../../constants/initialValues";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState(NOT_VALUED);
  const [queue] = useState<IQueue<string>>(new Queue<string>(maxArrayLength));
  const [array, setArray] = useState<Array<string | undefined>>([]);
  const [mark, setMark] = useState(-1);
  const [del, setDel] = useState(false);
  const [done, setDone] = useState(true);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setInputValue(e.target.value.slice(0, limit));
  };

  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const getState = (index: number) => {
    if (del) {
      return index === mark ? ElementStates.Changing : ElementStates.Default;
    }
    return index === mark ? ElementStates.Changing : ElementStates.Default;
  };

  const enqueue = async () => {
    setDone(false);
    setMark(queue.getTail() + 1);
    await wait(SHORT_DELAY_IN_MS);
    queue.enqueue(inputValue);
    setArray(queue.getStorage());
    setInputValue(NOT_VALUED);
    await wait(SHORT_DELAY_IN_MS);
    setMark(-1);
    setDone(true);
  };

  const dequeue = async () => {
    setDone(false);
    setDel(true);
    setMark(queue.getHead());
    await wait(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setArray(queue.getStorage());
    await wait(SHORT_DELAY_IN_MS);
    setMark(-1);
    setDel(false);
    setDone(true);
  };

  const reset = () => {
    queue.clear();
    setArray(queue.getStorage());
    setInputValue(NOT_VALUED);
  };

  useEffect(() => {
    setArray(queue.getStorage());
  }, []);

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
          extraClass="cyAddButton"
          disabled={
            queue.getTail() === maxArrayLength - 1 || inputValue === NOT_VALUED
          }
          onClick={enqueue}
          isLoader={!done}
        />
        <Button
          type="button"
          text="Удалить"
          extraClass="cyDeleteButton"
          onClick={dequeue}
          disabled={
            queue.getTail() === -1 ||
            (queue.getTail() === maxArrayLength - 1 &&
              array[queue.getTail()] === undefined) ||
            queue.getHead() >= maxArrayLength ||
            queue.getHead() > queue.getTail()
          }
          isLoader={!done}
        />
        <Button
          type="button"
          text="Очистить"
          extraClass={stackStyles.resetBtn}
          onClick={reset}
          disabled={queue.getTail() === -1}
        />
        <p className={stackStyles.text}>Максимум — 4 символа</p>
      </form>

      <ul className={stackStyles.output}>
        {array.map((num, index) => (
          <li key={index}>
            <Circle
              head={index === queue.getHead() ? HEAD : null}
              tail={index === queue.getTail() ? TAIL : null}
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
