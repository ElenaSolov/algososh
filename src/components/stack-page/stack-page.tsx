import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stackStyles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useMediaQuery from "../../hooks/useMediaQuery";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [array, setArray] = useState([]);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const isNotDesktop = useMediaQuery("(max-width: 1024px)");

  return (
    <SolutionLayout title="Стек">
      <form className={stackStyles.container}>
        <Input value={inputValue} onChange={onInputChange} maxLength={11} />
        <Button type="button" text="Добавить" />
        <Button type="button" text="Удалить" />
        <Button
          type="button"
          text="Очистить"
          extraClass={stackStyles.resetBtn}
        />
        <p className={stackStyles.text}>Максимум — 4 символа</p>
      </form>

      {array.length > 0 && (
        <section className={stackStyles.output}>
          {array.map((letter, index) => (
            <Circle
              // state={getState(index)}
              key={index}
              letter={letter}
              extraClass={stackStyles.circle}
              isSmall={isNotDesktop}
            />
          ))}
        </section>
      )}
    </SolutionLayout>
  );
};
