import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import useFetch from "../../useFetch";
import { useLocation } from "react-router-dom";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function SelectCategoryScatterChart() {
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
  const location = useLocation();

  const { data, loading, error } = useFetch(
    "http://127.0.0.1:7777" + location.pathname + "/1.1+Afvalbak"
  );
  if (loading)
    return (
      <div className="text-center">
        <div className="spinner-border text-light my-3" role="status"></div>
      </div>
    );
  if (error) console.log(error);
  if (data)
    return (
      <>
        <h3 className="text-light" style={{ marginTop: 50 }}>
          Public reports per amount of residents
        </h3>
        <div style={{ height: 500, marginTop: 50 }}>
          <Scatter data={data?.data} options={options} />
        </div>
      </>
    );
}

export default SelectCategoryScatterChart;
