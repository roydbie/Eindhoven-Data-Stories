import { Link } from "react-router-dom";
import PlaygroundImage from "../assets/playgrounds.png";
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
          <DataLeadText
            title={
              "Chart 1: Off-leash Dog Areas, Children's Play Areas, and Demographics"
            }
            text={
              "Based on the scatter plot matrix analysis, I have plotted various variables against each other, including off-leash dog areas, children's play areas, and the percentages of children, adults, and seniors in each neighborhood. The graphs reveal that there is one neighborhood that has a higher proportion of seniors than children or adults, which is an outlier. Additionally, it appears that certain neighborhoods have a high percentage of children but lack adequate play areas."
            }
          ></DataLeadText>
          <img src={PlaygroundImage} alt="react logo" className="w-100" />
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Playgrounds;
