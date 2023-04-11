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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Public reports to residents ratio",
      },
    },
    scales: {
      x: {
        border: { color: "white" },
        title: {
          display: true,
          text: "Amount of residents in the neighbourhood",
          color: "#ffffff",
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        border: { color: "white" },
        title: {
          display: true,
          text: "Amount of public reports in the neighbourhood",
          color: "#ffffff",
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

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
          <div className="container-fluid" style={{ height: 600 }}>
            <Scatter data={data?.data} options={options} />
          </div>
        </div>
      </div>
    );
}

export default DataLeadDetails;
