import { Link } from "react-router-dom";
import BubbleCategorySelect from "../components/income/BubbleCategorySelect";

function Incomevs() {
  return (
    <>
      <div className="row">
        <div className="col-11 mx-auto">
          <Link
            to="/"
            className="btn btn-sm btn-outline-light mb-3"
            style={{ display: "inline-block" }}
          >
            <i className="bi bi-arrow-left"></i>
          </Link>
          <h1
            className="text-light ms-5"
            style={{ display: "inline-block", marginBottom: 0 }}
          >
            Income & health
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-11 mx-auto">
          <BubbleCategorySelect></BubbleCategorySelect>
          <br></br>
        </div>
      </div>
    </>
  );
}

export default Incomevs;
