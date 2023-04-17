import { Link } from "react-router-dom";
import reactLogo from "../assets/grafiek.png";

function Playgrounds() {
  return (
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
        <h1 className="text-light ms-5">Playgrounds</h1>
        <div className="container-fluid">
          <p className="text-light">bla bla bla</p>
          <img src={reactLogo} alt="react logo" className="w-100" />
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Playgrounds;
