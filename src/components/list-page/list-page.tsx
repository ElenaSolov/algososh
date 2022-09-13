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
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import LinkedList, { ILinkedList } from "../../classes/LinkedList";
import LinkedListNode, { ILinkedListNode } from "../../classes/LinkedListNode";

interface IListNode {
  value: string;
  next: IListNode | null;
  state: ElementStates;
}

export const ListPage: React.FC = () => {
  const minArrLength = 3;
  const [numValue, setNumValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [addIndex, setAddIndex] = useState(-1);
  const [deleteIndex, setDeleteIndex] = useState(-2);
  // const [head, setHead] = useState<IListNode | null>(null);
  // const [tail, setTail] = useState<IListNode | null>(null);
  const [array, setArray] = useState<LinkedListNode<number>[]>([]);
  const [update, setUpdate] = useState(false);
  const [mark, setMark] = useState<IListNode | null>(null);
  const [i, setI] = useState(-1);

  const [list, setList] = useState(new LinkedList<number>());

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setNumValue(e.target.value.slice(0, limit));
  };
  const onIndexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 2;
    setIndexValue(e.target.value.slice(0, limit));
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  // const createListNode = (value: string, next: IListNode | null): IListNode => {
  //   return { value, next, state: ElementStates.Default };
  // };
  // const isEmpty = () => {
  //   return head == null;
  // };
  //
  // const toMark = async () => {
  //   if (mark !== null) {
  //     mark.state = ElementStates.Modified;
  //     await wait(SHORT_DELAY_IN_MS);
  //     mark.state = ElementStates.Default;
  //   }
  //   setMark(null);
  // };
  //
  // const insert = async (val: string, index: number) => {
  //   const newNode = createListNode(val, null);
  //   setAddIndex(index);
  //   if (isEmpty()) {
  //     setHead(newNode);
  //     setTail(newNode);
  //   }
  //   if (index < array.length) {
  //     await showPlace(index);
  //   }
  //   setMark(newNode);
  //   await wait(SHORT_DELAY_IN_MS);
  //   insertItem(newNode, index);
  //   setAddIndex(-1);
  //   resetState();
  //   setI(-1);
  //   updateArray();
  //   setUpdate(true);
  //   setNumValue("");
  //   setIndexValue("");
  // };
  //
  // const resetState = () => {
  //   for (let i = 0; i < array.length; i++) {
  //     array[i].state = ElementStates.Default;
  //   }
  // };
  //
  // const insertItem = (newNode: IListNode, index: number) => {
  //   if (index === 0) {
  //     newNode.next = head;
  //     setHead(newNode);
  //   } else if (index === array.length) {
  //     if (tail !== null) tail.next = newNode;
  //     setTail(newNode);
  //   } else {
  //     const prevNode = array[+indexValue - 1];
  //     newNode.next = prevNode.next;
  //     prevNode.next = newNode;
  //   }
  // };
  //
  // const deleteItem = async (index: number) => {
  //   if (index > 0 && index < array.length - 1) {
  //     await showPlace(index);
  //   }
  //   setDeleteIndex(index);
  //   const deleteItem = array[index];
  //   setMark(deleteItem);
  //   await wait(SHORT_DELAY_IN_MS);
  //   if (head === tail) {
  //     setHead(null);
  //     setArray([]);
  //   } else if (index === 0) {
  //     if (head !== null) setHead(head.next);
  //   } else {
  //     const prev = array[index - 1];
  //
  //     if (prev.next === tail) {
  //       prev.next = null;
  //       setTail(prev);
  //     } else {
  //       prev.next = deleteItem.next;
  //     }
  //   }
  //   updateArray();
  //   setUpdate(true);
  //   setDeleteIndex(-2);
  //   setIndexValue("");
  //   resetState();
  //   setI(-1);
  // };
  //
  // const showPlace = async (index: number) => {
  //   for (let i = 0; i <= index; i++) {
  //     array[i].state = ElementStates.Changing;
  //     setI(i);
  //     updateArray();
  //     await wait(SHORT_DELAY_IN_MS);
  //   }
  // };

  // const getHead = (node: IListNode) => {
  //   if (addIndex > -1 && array[i] === node) {
  //     return (
  //       <Circle
  //         letter={numValue}
  //         state={ElementStates.Changing}
  //         isSmall={true}
  //       />
  //     );
  //   }
  //   if (node === head) {
  //     return addIndex === 0 ? (
  //       <Circle
  //         letter={numValue}
  //         state={ElementStates.Changing}
  //         isSmall={true}
  //       />
  //     ) : (
  //       "head"
  //     );
  //   } else if (node === tail) {
  //     return addIndex === array.length ? (
  //       <Circle
  //         letter={numValue}
  //         state={ElementStates.Changing}
  //         isSmall={true}
  //       />
  //     ) : null;
  //   }
  //   return null;
  // };
  //
  // const getTail = (node: IListNode) => {
  //   if (deleteIndex > -1 && node === array[deleteIndex]) {
  //     return (
  //       <Circle
  //         letter={node.value}
  //         state={ElementStates.Changing}
  //         isSmall={true}
  //       />
  //     );
  //   }
  //   return node === tail ? "tail" : null;
  // };
  // const updateArray = () => {
  //   if (head !== null) {
  //     const arr: Array<IListNode> = [];
  //     let start: IListNode | null = head;
  //     while (start !== null) {
  //       arr.push(start);
  //       start = start.next;
  //     }
  //     setArray(arr);
  //   } else setArray([]);
  //   setUpdate(false);
  // };

  const getDisabledStatus = (btn: string): boolean => {
    if (indexValue === "") return true;
    else if (btn === "delete") {
      if (+indexValue >= array.length - 1 || +indexValue <= 0) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    for (let i = minArrLength; i >= 0; i--) {
      const value = getRandomInt(0, 100);
      list.append(value);
      console.log(list);
    }
    setArray(list.toArray());
  }, []);
  // useEffect(() => {
  //   if (update) {
  //     updateArray();
  //     toMark();
  //     setUpdate(false);
  //   }
  // }, [update]);

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
          onClick={() => {
            list.prepend(+numValue);
            setArray(list.toArray());
            setNumValue("");
          }}
          isLoader={addIndex === 0}
        />
        <Button
          type="button"
          text="Добавить в tail"
          onClick={() => {
            list.append(+numValue);
            setArray(list.toArray());
            setNumValue("");
          }}
          disabled={numValue === ""}
          isLoader={addIndex === array.length}
        />
        <Button
          type="button"
          text="Удалить из head"
          onClick={() => {
            list.deleteHead();
            setArray(list.toArray());
          }}
          // disabled={isEmpty()}
          isLoader={deleteIndex === 0}
        />
        <Button
          type="button"
          text="Удалить из tail"
          onClick={() => {
            list.deleteTail();
            setArray(list.toArray());
          }}
          // disabled={isEmpty()}
          isLoader={deleteIndex === array.length - 1}
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
          disabled={
            numValue === "" ||
            indexValue === "" ||
            +indexValue < 0 ||
            +indexValue > array.length - 2
          }
          onClick={() => {
            list.addByIndex(+numValue, +indexValue);
            setArray(list.toArray());
            setNumValue("");
            setIndexValue("");
          }}
          isLoader={addIndex > 0 && addIndex < array.length - 1}
        />
        <Button
          isLoader={deleteIndex > 0 && deleteIndex < array.length - 1}
          type="button"
          text="Удалить по индексу"
          extraClass={listStyles.deleteBtn}
          disabled={indexValue === "" ? true : getDisabledStatus("delete")}
          onClick={() => {
            list.deleteByIndex(+indexValue);
            setArray(list.toArray());
            setNumValue("");
            setIndexValue("");
          }}
        />
      </form>
      {
        <ul className={listStyles.output}>
          {array.map((node, index) => (
            <li className={listStyles.item} key={index}>
              <Circle
                // head={getHead(node)}
                // tail={getTail(node)}
                state={node.state}
                index={index}
                letter={node.value.toString()}
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
      }
    </SolutionLayout>
  );
};
