import { useSearchParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function DataLeadDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = searchParams.get("url");

  const { data, loading, error } = useFetch(
    "http://127.0.0.1:7777/" + url + "/1.1+Afvalbak"
  );

  if (loading)
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
        <div className="col">
          <h1 className="text-light ms-5">{data?.title}</h1>
          <div className="container-fluid">
            <div className="spinner-border text-light" role="status"></div>
          </div>
        </div>
      </div>
    );
  if (error) console.log(error);

  if (data)
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
          <h1 className="text-light ms-5">{data?.title}</h1>
          <div className="container-fluid">
            <ul>
              {data?.components.map((component, index) => {
                if (component.type === "text") {
                  return (
                    <p
                      className="text-light"
                      key={index}
                      style={{
                        whiteSpace: "pre-line",
                        marginTop: 25,
                      }}
                    >
                      {component.text}
                    </p>
                  );
                } else if (component.type === "chart") {
                  return (
                    <div style={{ height: 600, marginTop: 50 }} key={index}>
                      <Scatter
                        data={component.data}
                        options={component.options}
                      />
                    </div>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    );
}

export default DataLeadDetails;
