import ScatterChart from "./ScatterChart";
import { useState } from "react";

function ScatterCategorySelect() {
  const [category, setCategory] = useState("1.1+Afvalbak");

  function selectChange(event) {
    setCategory(event.target.value);
  }
  const categories = [
    {
      value: "7.13+Vuurwerkoverlast",
      text: "Vuurwerkoverlast",
    },
    {
      value: "10.1+Riolering",
      text: "Riolering",
    },
    {
      value: "13.1+Straatverlichting",
      text: "Straatverlichting",
    },
    {
      value: "14.2+Tegels+en+klinkers",
      text: "Tegels en klinkers",
    },
    {
      value: "1.1+Afvalbak",
      text: "Afvalbakken",
    },
    {
      value: "1.2+Oud+papier",
      text: "Oud papier",
    },
    {
      value: "1.3+Ondergrondse+afvalcontainer",
      text: "Ondergrondse afvalcontainer",
    },
    {
      value: "1.4+Ondergrondse+glasbak",
      text: "Ondergrondse glasbak",
    },
    {
      value: "1.5+Bovengrondse+glasbak",
      text: "Bovengrondse glasbak",
    },
    {
      value: "1.6+Plastic+container",
      text: "Plastic container",
    },
    {
      value: "1.7+Kledingcontainer",
      text: "Kledingcontainer",
    },
    {
      value: "1.8+Minicontainer+(kliko)",
      text: "Minicontainer (kliko)",
    },
    {
      value: "2.1+Bomen",
      text: "Bomen",
    },
    {
      value: "2.2+Plantsoenen",
      text: "Plantsoenen",
    },
    {
      value: "2.3+Gras",
      text: "Gras",
    },
    {
      value: "3.1+Zwerfkatten",
      text: "Zwerfkatten",
    },
  ];
  categories.sort((a, b) => a.text.localeCompare(b.text));

  return (
    <>
      <select
        className="form-select"
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
      <ScatterChart
        category={category}
      ></ScatterChart>
    </>
  );
}

export default ScatterCategorySelect;
