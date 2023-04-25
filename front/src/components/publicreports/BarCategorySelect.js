import BarChart from "./BarChart";
import { useState } from "react";
import React from "react";

function BarCategorySelect() {
  const [category, setCategory] = useState("1.1+Afvalbak");
  const [checked, setChecked] = useState(false);

  function selectChange(event) {
    setCategory(event.target.value);
  }

  function checkedChange(event) {
    setChecked(event.target.checked);
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
      <div className="form-check mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          onChange={checkedChange}
        />
        <label
          className="form-check-label text-light"
          htmlFor="flexCheckDefault"
        >
          Leave out neighbourhoods with less than 25 residents
        </label>
      </div>
      <BarChart category={category} fewResidentsExcluded={checked}></BarChart>
    </>
  );
}

export default BarCategorySelect;
