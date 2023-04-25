import BubbleChart from "./BubbleChart";
import { useState } from "react";

function BubbleCategorySelect() {
  const [category, setCategory] = useState("longtermillness");

  function selectChange(event) {
    setCategory(event.target.value);
  }
  const categories = [
    {
      value: "longtermillness",
      text: "Long term illness percentage",
    },
    {
      value: "unhappy",
      text: "Unhappy percentage",
    },
  ];
  categories.sort((a, b) => a.text.localeCompare(b.text));

  return (
    <>
      <select
        className="form-select w-50 m-auto mt-3"
        onChange={selectChange}
        defaultValue={category}
      >
        {categories.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.text}
            </option>
          );
        })}
      </select>
      <BubbleChart category={category}></BubbleChart>
    </>
  );
}

export default BubbleCategorySelect;
