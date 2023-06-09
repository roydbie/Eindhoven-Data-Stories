import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import useFetch from "../../useFetch";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function BubbleChart(props) {
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
        beginAtZero: true,
        border: { color: "white" },
        title: {
          display: true,
          text: props.yAxis,
          color: "#ffffff",
        },
        grid: {
          display: true,
          color: "#424242",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        beginAtZero: true,
        border: { color: "white" },
        title: {
          display: true,
          text: props.xAxis,
          color: "#ffffff",
        },
        grid: {
          color: "#424242",
          display: true,
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  const { data, loading, error } = useFetch(
    "http://127.0.0.1:7777/api/incomevs" +
      "?category1=" +
      props.xCategory +
      "&category2=" +
      props.yCategory +
      "&districts=" +
      props.districts
  );

  if (loading)
    return (
      <div className="text-center" style={{ height: 500, marginTop: 50 }}>
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  if (error) console.log(error);

  if (data) {
    return (
      <>
        <div style={{ height: 600 }}>
          <Bubble data={data?.data} options={options} />
        </div>
      </>
    );
  }
}

export default BubbleChart;
