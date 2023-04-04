import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppService } from "../services/app.service";
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

export const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
};

function PublicReports() {
  const [chartData, setChartData] = useState<any>();
  const functions = new AppService();

  const GetNeighbourhoodInfo = async () => {
    const Neighbourhoods = await functions.GetNeighbourhoodInfo();
    const arr: { name: any; code: string }[] = [];
    Neighbourhoods.records.forEach((element: any) => {
      arr.push({
        name: element.fields.buurtnaam,
        code: "BU07721" + element.fields.buurtcode,
      });
    });

    const PublicRecords = await functions.GetPublicReports();
    var i;
    for (i = 0; i < PublicRecords.length; i++) {
      PublicRecords[i].code = PublicRecords[i]["x"];
      delete PublicRecords[i].x;
    }

    const map = new Map();
    arr.forEach((item) => map.set(item.code, item));
    PublicRecords.forEach((item: { code: any }) =>
      map.set(item.code, { ...map.get(item.code), ...item })
    );

    const mergedArr = Array.from(map.values());

    const Residents = await functions.GetResidents();
    const arr2: { residents: any; code: string }[] = [];
    Residents.records.forEach((element: any) => {
      if (element.fields.buurtcode != undefined) {
        arr2.push({
          residents: element.fields.totaal_aantal_inwoners,
          code: "BU07721" + element.fields.buurtcode,
        });
      }
    });

    const map2 = new Map();
    mergedArr.forEach((item) => map2.set(item.code, item));
    arr2.forEach((item: { code: any }) => {
      map2.set(item.code, { ...map2.get(item.code), ...item });
    });

    const mergedArr2 = Array.from(map2.values());

    const iets: {
      label: string;
      data: [{ x: number; y: number }];
      backgroundColor: string;
      borderColor: string;
    }[] = [];

    mergedArr2.forEach((element: any) => {
      if (
        element.publicreports != undefined &&
        element.residents != undefined
      ) {
        iets.push({
          label: element.name,
          data: [{ x: element.residents, y: element.publicreports }],
          backgroundColor: "#ffcc00",
          borderColor: "#ffcc00",
        });
        console.log(element.residents);
      }
    });

    setChartData({
      datasets: iets,
    });

    useEffect(() => {
      GetNeighbourhoodInfo();
    }, []);
  };

  return (
    <div className="row">
      <div className="col-2 ps-5">
        <Link to="/" className="btn btn-sm btn-outline-danger px-4 ms-5">
          Back
        </Link>
      </div>
      <div className="col">
        <h1 className="text-light ms-5">Public reports</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            GetNeighbourhoodInfo();
          }}
        >
          Get info
        </button>
        <div className="w-75">
          {chartData ? <Scatter options={options} data={chartData} /> : null}
        </div>
      </div>
    </div>
  );
}

export default PublicReports;
