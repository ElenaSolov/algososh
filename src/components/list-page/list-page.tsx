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
import LinkedList from "../../classes/LinkedList";
import LinkedListNode from "../../classes/LinkedListNode";
import { HEAD, TAIL } from "../../constants/element-captions";
import { INITIAL_INDEX, NOT_VALUED } from "../../constants/initialValues";

export const ListPage: React.FC = () => {
  const minArrLength = 3;
  const maxArrLength = 11;

  const [numValue, setNumValue] = useState(NOT_VALUED);
  const [indexValue, setIndexValue] = useState(NOT_VALUED);
  const [addIndex, setAddIndex] = useState(-1);
  const [deleteIndex, setDeleteIndex] = useState(INITIAL_INDEX);
  const [array, setArray] = useState<LinkedListNode<number>[]>([]);
  const [mark, setMark] = useState<LinkedListNode<number> | null>(null);
  const [i, setI] = useState(-1);
  const [list] = useState(new LinkedList<number>());

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setNumValue(e.target.value.slice(0, limit));
  };
  const onIndexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 2;
    setIndexValue(e.target.value.slice(0, limit));
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  const toMark = async () => {
    if (mark !== null) {
      mark.state = ElementStates.Modified;
      await wait(SHORT_DELAY_IN_MS);
      mark.state = ElementStates.Default;
    }
    setMark(null);
  };

  const resetState = () => {
    for (let i = 0; i < array.length; i++) {
      array[i].state = ElementStates.Default;
    }
  };

  const showPlace = async (index: number) => {
    for (let i = 0; i <= index; i++) {
      if (array[i]) {
        array[i].state = ElementStates.Changing;
      }
      setI(i);
      await wait(SHORT_DELAY_IN_MS);
    }
  };

  const getHead = (node: LinkedListNode<number>) => {
    if (array[i] === node && addIndex >= 0) {
      return (
        <Circle
          extraClass="cyHeadCircle"
          letter={numValue}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
    }
    if (node === list.getHead()) {
      return addIndex === 0 ? (
        <Circle
          extraClass="cyTailCircle"
          letter={numValue}
          state={ElementStates.Changing}
          isSmall={true}
        />
      ) : (
        HEAD
      );
    } else if (node === list.getTail()) {
      return addIndex === array.length ? (
        <Circle
          letter={numValue}
          state={ElementStates.Changing}
          isSmall={true}
        />
      ) : null;
    }
    return null;
  };

  const getTail = (node: LinkedListNode<any>) => {
    if (deleteIndex > -1 && node === array[deleteIndex]) {
      return (
        <Circle
          letter={node.value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
    }
    return node === list.getTail() ? TAIL : null;
  };

  const getDisabledStatus = (btn: string): boolean => {
    if (indexValue === NOT_VALUED) return true;
    else if (btn === "delete") {
      if (+indexValue >= array.length - 1 || +indexValue <= 0) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (list.length() === 0) {
      for (let i = minArrLength; i >= 0; i--) {
        const value = getRandomInt(0, 100);
        list.append(value);
      }
      setArray(list.toArray());
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    toMark();
  }, [array.length]); // eslint-disable-line

  return (
    <SolutionLayout title="Связный список">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={listStyles.container}
      >
        <Input
          autoFocus
          extraClass="cyValueInput"
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
          extraClass="cyAddToHeadButton"
          disabled={numValue === NOT_VALUED || array.length >= maxArrLength}
          onClick={async () => {
            setAddIndex(0);
            await showPlace(0);
            const newNode = list.prepend(+numValue);
            setMark(newNode);
            setArray(list.toArray());
            setAddIndex(-1);
            resetState();
            setI(-1);
            setNumValue(NOT_VALUED);
          }}
          isLoader={addIndex === 0}
        />
        <Button
          type="button"
          text="Добавить в tail"
          extraClass="cyAddToTailButton"
          onClick={async () => {
            setAddIndex(array.length);
            if (array.length > 0) {
              list.getTail()!.state = ElementStates.Changing;
            }
            await wait(SHORT_DELAY_IN_MS);
            const newNode = list.append(+numValue);
            setMark(newNode);
            setArray(list.toArray());
            setNumValue(NOT_VALUED);
            setAddIndex(-1);
            resetState();
          }}
          disabled={numValue === NOT_VALUED || array.length >= maxArrLength}
          isLoader={addIndex === array.length}
        />
        <Button
          type="button"
          text="Удалить из head"
          extraClass="cyDeleteFromHeadButton"
          onClick={async () => {
            setDeleteIndex(0);
            await wait(SHORT_DELAY_IN_MS);
            list.deleteHead();
            setArray(list.toArray());
            setDeleteIndex(INITIAL_INDEX);
          }}
          disabled={list.getHead() === null}
          isLoader={deleteIndex === 0}
        />
        <Button
          type="button"
          text="Удалить из tail"
          extraClass="cyDeleteFromTailButton"
          onClick={async () => {
            setDeleteIndex(array.length - 1);
            await wait(SHORT_DELAY_IN_MS);
            list.deleteTail();
            setArray(list.toArray());
            setDeleteIndex(INITIAL_INDEX);
          }}
          disabled={list.getHead() === null}
          isLoader={deleteIndex === array.length - 1}
        />
        <p className={listStyles.text}>Максимум — 4 символа</p>
        <Input
          extraClass="cyIndexInput"
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
          extraClass={`${listStyles.addBtn} cyAddByIndexButton`}
          disabled={
            numValue === NOT_VALUED ||
            indexValue === NOT_VALUED ||
            +indexValue <= 0 ||
            +indexValue > array.length - 2 ||
            array.length >= maxArrLength
          }
          onClick={async () => {
            const index = +indexValue;
            setAddIndex(index);
            setI(0);
            await showPlace(index);
            const newNode = list.addByIndex(+numValue, index);
            setMark(newNode);
            setArray(list.toArray());
            setNumValue(NOT_VALUED);
            setIndexValue(NOT_VALUED);
            setAddIndex(-1);
            resetState();
            setI(-1);
          }}
          isLoader={addIndex > 0 && addIndex < array.length - 1}
        />
        <Button
          isLoader={deleteIndex > 0 && deleteIndex < array.length - 1}
          type="button"
          text="Удалить по индексу"
          extraClass={`${listStyles.deleteBtn} cyDeleteByIndexButton`}
          disabled={
            indexValue === NOT_VALUED ? true : getDisabledStatus("delete")
          }
          onClick={async () => {
            const index = +indexValue;
            await showPlace(index);
            setDeleteIndex(index);
            await wait(SHORT_DELAY_IN_MS);
            list.deleteByIndex(index);
            setArray(list.toArray());
            resetState();
            setNumValue(NOT_VALUED);
            setIndexValue(NOT_VALUED);
            setDeleteIndex(INITIAL_INDEX);
            setI(-1);
          }}
        />
      </form>
      {
        <ul className={listStyles.output}>
          {array.map((node, index) => (
            <li className={listStyles.item} key={index}>
              <Circle
                extraClass="cyListElement"
                head={getHead(node)}
                tail={getTail(node)}
                state={node.state}
                index={index}
                letter={
                  index === deleteIndex ? NOT_VALUED : node.value.toString()
                }
                isSmall={isNotDesktop}
              />
              <span
                className={
                  index === array.length - 1 ? listStyles.arrow : NOT_VALUED
                }
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
