import { Link } from "react-router-dom";
import PlaygroundImage1 from "../assets/playgrounds.png";
import PlaygroundImage2 from "../assets/playgrounds2.png";
import DataLeadText from "../components/DataLeadText";

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
          <DataLeadText
            title={"Introduction"}
            text={
              "In the city of Eindhoven, there are many areas with both dog off-leash areas and playgrounds for children. To understand how the availability of these facilities is related to the age groups of residents, we collected data on these areas and the age groups of residents in each neighborhood. Using a scatter matrix, we found a strong correlation between the number of dog off-leash areas and the number of playgrounds. We also identified one neighborhood with a higher proportion of seniors than adults or children. This suggests that there may be a lower demand for playgrounds and dog off-leash areas in this neighborhood, and a greater need for public spaces suitable for seniors. By understanding the unique needs of each neighborhood, the city of Eindhoven can make informed decisions about where to invest in improving public spaces, and ultimately enhance the quality of life for all residents."
            }
          ></DataLeadText>
          <h3
            className="text-light"
            style={{ marginTop: 50, marginBottom: 25 }}
          >
            Scatterchart 1
          </h3>
          <img src={PlaygroundImage1} alt="react logo" className="w-100" />
          <h3
            className="text-light"
            style={{ marginTop: 50, marginBottom: 25 }}
          >
            Scatterchart 2
          </h3>
          <img src={PlaygroundImage2} alt="react logo" className="w-100" />
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Playgrounds;
