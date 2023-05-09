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
          <BubbleChart category={category} xAxis={xAxis}></BubbleChart>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}

export default BubbleCategorySelect;
