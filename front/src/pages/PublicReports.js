import { Link } from "react-router-dom";
import DataLeadText from "../components/DataLeadText";
import ScatterCategorySelect from "../components/publicreports/ScatterCategorySelect";
import BarCategorySelect from "../components/publicreports/BarCategorySelect";
import D3BarChart from "../components/publicreports/D3BarChart";

function PublicReports() {
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
        <h1 className="text-light ms-5">Public Reports</h1>
        <div className="container-fluid">
          <DataLeadText
            title={"Introduction"}
            text={
              "The city of Eindhoven is one of the largest and most vibrant cities in the Netherlands, and it is known for its innovation, design, and technology. As with any city, there are various public reports that citizens can make regarding issues in the city's public spaces, such as potholes, broken streetlights, or litter. These reports are important because they allow the city to identify and address issues in a timely manner, which can improve the quality of life for residents and visitors.\n\nThe city of Eindhoven has made these public reports available in a public database, which allows citizens, researchers, and other interested parties to access and analyze the data. This database contains information on the location and nature of the reports, as well as other relevant details such as the date of the report, the neighbourhood, and the type of issue.\n\nIn this analysis, we will explore the public reports in the city of Eindhoven, with the aim of gaining insights into the issues that are most commonly reported and the areas of the city that are most affected. By doing so, we hope to contribute to the ongoing efforts to improve the city's public spaces and make Eindhoven an even better place to live, work, and visit."
            }
          ></DataLeadText>
          <h3 className="text-light" style={{ marginTop: 50 }}>
            Chart 1: Average amount of reports per resident
          </h3>
          <BarCategorySelect></BarCategorySelect>
          <h3 className="text-light" style={{ marginTop: 50 }}>
            Chart 2: Public reports per amount of residents
          </h3>
          <ScatterCategorySelect></ScatterCategorySelect>
          <br></br>
          <br></br>
          <D3BarChart></D3BarChart>
        </div>
      </div>
    </div>
  );
}

export default PublicReports;
