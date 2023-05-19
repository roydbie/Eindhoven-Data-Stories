import BubbleChart from "./BubbleChart";
import { useState } from "react";
import useFetch from "../../useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios";

function BubbleCategorySelect() {
  const [xCategory, setxCategory] = useState(
    "high_level_of_education_percentage"
  );
  const [yCategory, setyCategory] = useState("personal_income");
  const [xAxis, setxAxis] = useState(
    "Percentage of people with a high level of education"
  );
  const [yAxis, setyAxis] = useState(
    "Average personal income per income recipient"
  );

  function selectChangeX(event) {
    setxCategory(event.target.value);
    const res = categories.filter((obj) =>
      Object.values(obj).some((val) => val.includes(event.target.value))
    );
    setxAxis(res[0].xText);
  }

  function selectChangeY(event) {
    setyCategory(event.target.value);
    const res = categories.filter((obj) =>
      Object.values(obj).some((val) => val.includes(event.target.value))
    );
    setyAxis(res[0].xText);
  }

  const categories = [
    {
      value: "prolonged_illness_percentage",
      text: "Long term illness percentage",
      xText: "Percentage of people with a long-term illness",
    },
    {
      value: "unhappy_percentage",
      text: "Unhappy percentage",
      xText: "Percentage of unhappy people",
    },
    {
      value: "high_level_of_education_percentage",
      text: "High level of education percentage",
      xText: "Percentage of people with a high level of education",
    },
    {
      value: "personal_income",
      text: "Personal income",
      xText: "Average personal income per income recipient",
    },
    {
      value: "65plus_percentage",
      text: "Residents above 65 years of age",
      xText: "Percentage of residents above 65 years of age",
    },
    {
      value: "worries_about_money_percentage",
      text: "Residents worried about money percentage",
      xText: "Percentage of residents who are worried about money",
    },
    {
      value: "has_debts_percentage",
      text: "Residents with debt percentage",
      xText: "Percentage of residents with debt",
    },
  ];
  categories.sort((a, b) => a.text.localeCompare(b.text));
  const districts = [
    {
      color: "rgba(125, 235, 0, 0.75)",
      name: "Tongelre",
    },
    {
      color: "rgba(255, 230, 0, 0.75)",
      name: "Strijp",
    },
    {
      color: "rgba(0, 214, 233, 0.75)",
      name: "Stratum",
    },
    {
      color: "rgba(255, 33, 66, 0.75)",
      name: "Woensel-Noord",
    },
    {
      color: "rgba(88, 135, 255, 0.75)",
      name: "Gestel",
    },
    {
      color: "rgba(255, 133, 88, 0.75)",
      name: "Centrum",
    },
    {
      color: "rgba(227, 88, 255, 0.75)",
      name: "Woensel-Zuid",
    },
  ];
  districts.sort((a, b) => a.name.localeCompare(b.name));

  const [checkedState, setCheckedState] = useState(
    new Array(districts.length).fill(false)
  );
  const [selectedDistricts, setSelectedDistricts] = useState([
    "Centrum",
    "Gestel",
    "Stratum",
    "Strijp",
    "Tongelre",
    "Woensel-Noord",
    "Woensel-Zuid",
  ]);

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
    if (arr === []) {
      setSelectedDistricts([
        "Centrum",
        "Gestel",
        "Stratum",
        "Strijp",
        "Tongelre",
        "Woensel-Noord",
        "Woensel-Zuid",
      ]);
    }
  };

  const location = useLocation();

  const { data } = useFetch(
    "http://127.0.0.1:7777" +
      location.pathname +
      "/text?category1=" +
      xCategory +
      "&category2=" +
      yCategory
  );

  function handleThumbsDown() {
    axios
      .get(
        "http://127.0.0.1:7777" +
          location.pathname +
          "/updatescore?category1=" +
          xCategory +
          "&category2=" +
          yCategory +
          "&update=minus",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(() => window.location.reload(false));
  }

  function handleThumbsUp() {
    axios
      .get(
        "http://127.0.0.1:7777" +
          location.pathname +
          "/updatescore?category1=" +
          xCategory +
          "&category2=" +
          yCategory +
          "&update=plus",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(() => window.location.reload(false));
  }

  return (
    <>
      <div className="row">
        <div className="col-3">
          <h5 className="text-light mt-2 ps-2">Select x-axis data:</h5>
          <select
            className="form-select mt-2"
            style={{ fontSize: "0.9rem" }}
            onChange={selectChangeX}
            defaultValue={xCategory}
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
            onChange={selectChangeY}
            defaultValue={yCategory}
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
        <div className="col-3">jooo</div>
      </div>
      <div className="row" style={{ width: "100%", margin: 0 }}>
        <div className="col-10">
          <BubbleChart
            xCategory={xCategory}
            yCategory={yCategory}
            xAxis={xAxis}
            yAxis={yAxis}
            districts={selectedDistricts}
          ></BubbleChart>
        </div>
        <div className="col-2 text-light pt-3">
          <h5 className="text-light ps-2">Select districts:</h5>
          {districts.map(({ name, color }, index) => {
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
                  <span
                    style={{ backgroundColor: color, color: color, opacity: 1 }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>{" "}
                  {name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <h5 className="text-light mt-2 ps-2">
        Open AI's opinion about the data:
      </h5>
      <p className="text-light my-2 ps-2" style={{ fontSize: "0.9rem" }}>
        {data}
      </p>
      <h5 className="text-light mt-2 ps-2">
        How do you think about this answer?
      </h5>
      <button
        className="btn btn-success ms-2 mb-5"
        style={{ fontSize: "0.9rem" }}
        onClick={handleThumbsUp}
      >
        &#128077;
      </button>
      <button
        className="btn btn-danger ms-2 mb-5"
        style={{ fontSize: "0.9rem" }}
        onClick={handleThumbsDown}
      >
        &#128078;
      </button>
    </>
  );
}

export default BubbleCategorySelect;
