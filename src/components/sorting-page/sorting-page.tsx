import React, { SyntheticEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingStyles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { getRandomInt } from "../../utils/utils";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const getRandomArr = () => {
    const arrayLength = getRandomInt(3, 17);
    const array = [];
    for (let i = 0; i < arrayLength; i++) {
      array.push(getRandomInt(0, 100));
    }
    console.log(array);
    return array;
  };
  useEffect(() => {
    setArray(getRandomArr());
  }, []);
  return (
    <SolutionLayout title="Сортировка массива">
      <form onSubmit={onSubmit} className={sortingStyles.container}>
        <section className={sortingStyles.radio}>
          <RadioInput name="method" label="Выбор" defaultChecked />
          <RadioInput name="method" label="Пузырёк" />
        </section>
        <section className={sortingStyles.method}>
          <Button type="button" text="По возрастанию" />
          <Button type="button" text="По убыванию" />
        </section>
        <Button type="button" text="Новый массив" />
      </form>
      <section className={sortingStyles.output}>
        {array.map((num, index) => (
          <div
            key={index}
            className={sortingStyles.arrayItem}
            style={{ height: num }}
          >
            {num}
          </div>
        ))}
      </section>
    </SolutionLayout>
  );
};
