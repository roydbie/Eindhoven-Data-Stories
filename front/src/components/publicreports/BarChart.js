import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useFetch from "../../useFetch";
import { useLocation } from "react-router-dom";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function BarChart(props) {
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
          display: false,
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
          text: "Amount of reports per resident",
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
    "http://127.0.0.1:7777" + location.pathname + "/bar/" + props.category
  );

  if (loading)
    return (
      <div className="text-center" style={{ height: 500, marginTop: 50 }}>
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  if (error) console.log(error);

  if (data) {
    data.data.labels.length = 15;
    data.data.datasets[0].data.length = 15;
    return (
      <>
        <div style={{ height: 500, marginTop: 50 }}>
          <Bar data={data?.data} options={options} />
        </div>
      </>
    );
  }
}

export default BarChart;
