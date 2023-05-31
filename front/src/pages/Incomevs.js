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
            style={{ display: "none" }}
          >
            <i className="bi bi-arrow-left"></i>
          </Link>
          <h1
            className="text-light"
            style={{ display: "inline-block", marginBottom: 0 }}
          >
            Eindhoven Data Stories
          </h1>
          <p className="text-light w-50 my-2" style={{ fontSize: "0.9rem" }}>
            In this lead generation tool we aim to uncover valuable insights
            from the vast collection of open data in Eindhoven. The tool
            automates the discovery of outliers within datasets, making this
            information accessible for everyone interested. Explore the
            generated stories below to gain intriguing leads for further
            investigation.
          </p>
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
