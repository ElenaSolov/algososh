import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import listStyles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { getRandomInt, wait } from "../../utils/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

interface IListNode {
  value: string;
  next: IListNode | null;
  state: ElementStates;
}

export const ListPage: React.FC = () => {
  const minArrLength = 3;
  const [numValue, setNumValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [addIndex, setAddIndex] = useState(false);
  const [head, setHead] = useState<IListNode | null>(null);
  const [addHead, setAddHead] = useState(false);
  const [tail, setTail] = useState<IListNode | null>(null);
  const [addTail, setAddTail] = useState(false);
  const [array, setArray] = useState<IListNode[]>([]);
  const [update, setUpdate] = useState(false);
  const [del, setDel] = useState(false);
  const [mark, setMark] = useState<IListNode | null>(null);
  const [i, setI] = useState(-1);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setNumValue(e.target.value.slice(0, limit));
  };
  const onIndexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setIndexValue(e.target.value.slice(0, limit));
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const createListNode = (value: string, next: IListNode | null): IListNode => {
    return { value, next, state: ElementStates.Default };
  };
  const isEmpty = () => {
    return head == null;
  };

  const toMark = async () => {
    console.log(mark);
    if (mark !== null) {
      mark.state = ElementStates.Modified;
      await wait(500);
      mark.state = ElementStates.Default;
    }
    setMark(null);
  };

  const insert = async (val: string, type: string) => {
    const newNode = createListNode(val, null);
    if (isEmpty()) {
      setTail(newNode);
      setHead((prev) => newNode);
    } else if (type === "head") {
      setAddHead(true);
      setMark(newNode);
      await wait(500);
      insertStart(newNode);
    } else if (type === "tail") {
      setAddTail(true);
      setMark(newNode);
      await wait(500);
      insertEnd(newNode);
    } else if (type === "index") {
      setAddIndex(true);
      await showPlace(+indexValue);
      setMark(newNode);
      await wait(500);
      insertBetween(newNode);
      resetState();
      console.log("done");
    }
    setAddIndex(false);

    updateArray();
    setUpdate(true);
    setNumValue("");
    setIndexValue("");
    setAddHead(false);
    setAddTail(false);
  };

  const resetState = () => {
    for (let i = 0; i < array.length; i++) {
      array[i].state = ElementStates.Default;
    }
  };
  const insertStart = (newNode: IListNode) => {
    newNode.next = head;
    setHead(newNode);
  };
  const insertBetween = async (newNode: IListNode) => {
    const prevNode = array[+indexValue - 1];
    newNode.next = prevNode.next;
    prevNode.next = newNode;
  };

  const insertEnd = (newNode: IListNode) => {
    if (tail !== null) tail.next = newNode;
    setTail((prev) => newNode);
  };

  const showPlace = async (index: number) => {
    for (let i = 0; i <= index; i++) {
      array[i].state = ElementStates.Changing;
      setI(i);
      updateArray();
      await wait(500);
    }
  };

  const getHead = (node: IListNode) => {
    if (addIndex && array[i] === node) {
      return (
        <Circle
          letter={numValue}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
    }
    if (node === head) {
      return addHead ? (
        <Circle
          letter={numValue}
          state={ElementStates.Changing}
          isSmall={true}
        />
      ) : (
        "head"
      );
    } else if (node === tail) {
      return addTail ? (
        <Circle
          letter={numValue}
          state={ElementStates.Changing}
          isSmall={true}
        />
      ) : null;
    }
    return null;
  };
  const updateArray = () => {
    if (head !== null) {
      const arr: Array<IListNode> = [];
      let start: IListNode | null = head;
      while (start !== null) {
        arr.push(start);
        start = start.next;
      }
      setArray(arr);
    }
    setUpdate(false);
  };

  useEffect(() => {
    const initialArr: IListNode[] = [];
    for (let i = minArrLength; i >= 0; i--) {
      const value = getRandomInt(0, 100);
      const node = createListNode(value.toString(), null);
      initialArr[i] = node;
      if (initialArr[i + 1]) {
        initialArr[i].next = initialArr[i + 1];
      }
    }
    setArray(initialArr);
    setHead(initialArr[0]);
    setTail(initialArr[minArrLength]);
    setUpdate(true);
  }, []);
  useEffect(() => {
    if (update) {
      updateArray();
      toMark();
      setUpdate(false);
    }
  }, [update]);

  return (
    <SolutionLayout title="Связный список">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={listStyles.container}
      >
        <Input
          autoFocus
          placeholder="Введите значение"
          value={numValue}
          type="number"
          onChange={onInputChange}
          maxLength={4}
          min={1}
        />
        <Button
          type="button"
          text="Добавить в head"
          disabled={numValue === ""}
          onClick={() => insert(numValue, "head")}
        />
        <Button
          type="button"
          text="Добавить в tail"
          onClick={() => insert(numValue, "tail")}
          disabled={numValue === ""}
        />
        <Button
          type="button"
          text="Удалить из head"
          // onClick={reset}
          // disabled={tail === -1}
        />
        <Button
          type="button"
          text="Удалить из tail"
          // onClick={reset}
          // disabled={tail === -1}
        />
        <p className={listStyles.text}>Максимум — 4 символа</p>
        <Input
          placeholder="Введите индекс"
          value={indexValue}
          type="number"
          onChange={onIndexInputChange}
          maxLength={4}
          min={1}
        />
        <Button
          type="button"
          text="Добавить по индексу"
          extraClass={listStyles.addBtn}
          disabled={numValue === "" || indexValue === ""}
          onClick={() => insert(numValue, "index")}
        />
        <Button
          type="button"
          text="Удалить по индексу"
          extraClass={listStyles.deleteBtn}
          disabled={numValue === "" || indexValue === ""}
        />
      </form>
      {!isEmpty() && (
        <ul className={listStyles.output}>
          {array.map((node, index) => (
            <li className={listStyles.item} key={index}>
              <Circle
                head={getHead(node)}
                tail={node === tail ? "tail" : null}
                state={node.state}
                index={index}
                letter={node.value}
                // extraClass={listStyles.circle}
                isSmall={isNotDesktop}
              />
              <span
                className={index === array.length - 1 ? listStyles.arrow : ""}
              >
                <ArrowIcon />
              </span>
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
