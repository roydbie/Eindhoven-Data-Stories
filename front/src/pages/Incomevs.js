import { Link } from "react-router-dom";
import BubbleChart from "../components/income/BubbleChart";
import DataLeadText from "../components/DataLeadText";

function Incomevs() {
  return (
    <>
      <div className="row">
        <div className="col-3 ps-3">
          <Link
            to="/"
            className="btn btn-sm btn-outline-light mt-2"
            style={{ float: "right" }}
          >
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
        <div className="col-7">
          <h1 className="text-light ms-5">Income vs health</h1>
          <div className="container-fluid"></div>
        </div>
      </div>
      <div className="row">
        <div className="col-10 mx-auto">
          <BubbleChart></BubbleChart>
          <br></br>
        </div>
      </div>
    </>
  );
}

export default Incomevs;
