import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import listStyles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Circle } from "../ui/circle/circle";
import { getRandomArr, getRandomInt } from "../../utils/utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";

interface IListNode {
  value: string;
  next: IListNode | null;
}

export const ListPage: React.FC = () => {
  const minArrLength = 3;
  const [numValue, setNumValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [head, setHead] = useState<IListNode | null>(null);
  const [tail, setTail] = useState<IListNode | null>(null);
  const [array, setArray] = useState<IListNode[]>([]);
  const [update, setUpdate] = useState(false);
  const [state, setState] = useState(ElementStates.Default);
  const [del, setDel] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setNumValue(e.target.value.slice(0, limit));
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const createListNode = (value: string, next: IListNode | null): IListNode => {
    return { value, next };
  };
  const isEmpty = () => {
    return head == null;
  };

  const insert = (val: string, place: string) => {
    const newNode = createListNode(val, null);
    console.log(newNode);
    if (isEmpty()) {
      console.log(head, tail);
      setTail(newNode);
      setHead((prev) => newNode);
    } else if (place === "head") {
      console.log("head");
      insertStart(newNode);
    } else if (place === "tail") {
      console.log("tail");
      insertEnd(newNode);
    }
    updateArray();
    setUpdate(true);
    setNumValue("");
  };
  const insertStart = (newNode: IListNode) => {
    newNode.next = head;
    setHead(newNode);
    console.log(22);
    console.log(newNode);
  };
  const insertBetween = (prevNode: IListNode, val: string) => {
    const newNode: IListNode = createListNode(val, null);
    prevNode.next = newNode;
    newNode.next = prevNode.next;
  };

  const insertEnd = (newNode: IListNode) => {
    console.log("tail", tail);
    if (tail !== null) tail.next = newNode;
    setTail((prev) => newNode);
  };

  const updateArray = () => {
    if (head !== null) {
      const arr: Array<IListNode> = [];
      let start: IListNode | null = head;
      while (start !== null) {
        console.log("start", start);
        arr.push(start);
        start = start.next;
        console.log(arr, start);
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
          onChange={onInputChange}
          maxLength={4}
          min={1}
        />
        <Button
          type="button"
          text="Добавить по индексу"
          extraClass={listStyles.addBtn}
        />
        <Button
          type="button"
          text="Удалить по индексу"
          extraClass={listStyles.deleteBtn}
        />
      </form>
      {!isEmpty() && (
        <ul className={listStyles.output}>
          {array.map((node, index) => (
            <li className={listStyles.item} key={index}>
              <Circle
                head={node === head ? "head" : null}
                tail={node === tail ? "tail" : null}
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
