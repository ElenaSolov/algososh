import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import listStyles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import useMediaQuery from "../../hooks/useMediaQuery";

export const ListPage: React.FC = () => {
  const [numValue, setNumValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [array, setArray] = useState<string[]>([]);
  const [head, setHead] = useState(-1);
  const [tail, setTail] = useState(-1);
  const [state, setState] = useState(ElementStates.Default);
  const [del, setDel] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 4;
    setNumValue(e.target.value.slice(0, limit));
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");
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
          // onClick={}
        />
        <Button
          type="button"
          text="Добавить в tail"
          // onClick={dequeue}
          disabled={tail === -1 || head > tail}
        />
        <Button
          type="button"
          text="Удалить из head"
          // onClick={reset}
          disabled={tail === -1}
        />
        <Button
          type="button"
          text="Удалить из tail"
          // onClick={reset}
          disabled={tail === -1}
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
    </SolutionLayout>
  );
};
