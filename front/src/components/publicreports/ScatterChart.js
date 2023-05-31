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

function ScatterChart(props) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
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
    location.pathname + "/scatter/" + props.category
  );
  if (loading)
    return (
      <div className="text-center" style={{ height: 500, marginTop: 50 }}>
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  if (error) console.log(error);
  if (data)
    return (
      <>
        <div style={{ height: 500, marginTop: 50 }}>
          <Scatter data={data?.data} options={options} />
        </div>
      </>
    );
}

export default ScatterChart;
