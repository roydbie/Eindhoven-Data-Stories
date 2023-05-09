import BubbleChart from "./BubbleChart";
import { useState } from "react";

function BubbleCategorySelect() {
  const [category, setCategory] = useState("longtermillness");
  const [xAxis, setxAxis] = useState(
    "Percentage of people with a long-term illness"
  );

  function selectChange(event) {
    setCategory(event.target.value);
    const res = categories.filter((obj) =>
      Object.values(obj).some((val) => val.includes(event.target.value))
    );
    setxAxis(res[0].xText);
  }
  const categories = [
    {
      value: "longtermillness",
      text: "Long term illness percentage",
      xText: "Percentage of people with a long-term illness",
    },
    {
      value: "unhappy",
      text: "Unhappy percentage",
      xText: "Percentage of unhappy people",
    },
  ];
  categories.sort((a, b) => a.text.localeCompare(b.text));
  const districts = [
    {
      color: "rgba(125, 235, 0, 0.75)",
      name: "Stadsdeel Tongelre",
    },
    {
      color: "rgba(255, 230, 0, 0.75)",
      name: "Stadsdeel Strijp",
    },
    {
      color: "rgba(0, 214, 233, 0.75)",
      name: "Stadsdeel Stratum",
    },
    {
      color: "rgba(255, 33, 66, 0.75)",
      name: "Stadsdeel Woensel-Noord",
    },
    {
      color: "rgba(88, 135, 255, 0.75)",
      name: "Stadsdeel Gestel",
    },
    {
      color: "rgba(255, 133, 88, 0.75)",
      name: "Stadsdeel Centrum",
    },
    {
      color: "rgba(227, 88, 255, 0.75)",
      name: "Stadsdeel Woensel-Zuid",
    },
  ];
  districts.sort((a, b) => a.name.localeCompare(b.name));

  const [checkedState, setCheckedState] = useState(
    new Array(districts.length).fill(false)
  );
  const [selectedDistricts, setSelectedDistricts] = useState("");

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const arr = [];
    updatedCheckedState.forEach((item, index) => {
      if (item === true) {
        arr.push(districts[index].name);
      }
    });
    setSelectedDistricts(arr);
    console.log(arr);
  };

  return (
    <>
      <div className="row">
        <div className="col-3">
          <h5 className="text-light mt-2 ps-2">Select x-axis data:</h5>
          <select
            className="form-select mt-2"
            style={{ fontSize: "0.9rem" }}
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
        </div>
        <div className="col-3">
          <h5 className="text-light mt-2 ps-2">Select y-axis data:</h5>
          <select
            className="form-select mt-2"
            style={{ fontSize: "0.9rem" }}
            disabled
          >
            <option value="test" key="1">
              Default value
            </option>
          </select>
        </div>
        <div className="col-3">jooo</div>
      </div>
      <div className="row" style={{ width: "100%", margin: 0 }}>
        <div className="col-10">
          <BubbleChart
            category={category}
            xAxis={xAxis}
            districts={selectedDistricts}
          ></BubbleChart>
        </div>
        <div className="col-2 text-light pt-5">
          {districts.map(({ name }, index) => {
            return (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={name}
                  value={name}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                  id={`custom-checkbox-${index}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`custom-checkbox-${index}`}
                >
                  {name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BubbleCategorySelect;
