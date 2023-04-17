import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import { Bar } from "react-chartjs-2";
  import useFetch from "../../useFetch";
  import { useLocation } from "react-router-dom";
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  function BarChart() {
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
  

    const data = {
        labels: ["jan","jan","jan","jan","jan","jan","jan"],
        datasets: [{
          label: 'Reports per resident',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 205, 86, 0.2)'
          ],
          borderColor: [
            '#ffcc00',
            '#ffcc00',
            '#ffcc00',
            '#ffcc00',
            '#ffcc00',
            '#ffcc00',
            '#ffcc00'
          ],
          borderWidth: 1
        }]
      };
    if (data)
      return (
        <>
          <div style={{ height: 500, marginTop: 50 }}>
            <Bar data={data} options={options} />
          </div>
        </>
      );
  }
  
  export default BarChart;
  