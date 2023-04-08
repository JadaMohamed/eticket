import React, { useContext, useEffect, useState } from "react";
import I from "../../../img/total-activity.svg";
import '../../../../src/organizer/css/organizersummary.css';
import AuthContext from "../../../Auth/AuthContext";
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    x: {
      ticks: {
        font: {
          family: 'Segoe UI',
          size: 14,
        },
        color: 'rgba(128, 128, 128, 0.5)',
        padding: 10
      },
      grid: {
        display: true
      }
    },
    y: {
      ticks: {
        font: {
          family: 'Segoe UI',
          size: 14,
        },
        color: 'rgba(128, 128, 128, 0.5)',
        padding: 10
      },
      grid: {
        display: false
      }
    },

  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};
const data = {
  labels: ["7 Feb", "8 Feb", "9 Feb", "10 Feb"],
  datasets: [
    {
      label: 'Clients',
      data: [10, 5, 4, 10],
      backgroundColor: 'rgba(255,199,0,255)',
    },
    {
      label: 'Organizers',
      data: [6, 10, 1, 4],
      backgroundColor: 'rgba(85,46,136,255)',
    },
  ],
};
const TotalActivity = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [usersData, setUsersData] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const { profile } = useContext(AuthContext);
  const [chartData, setChartData] = useState();
  useEffect(() => {
    const fetchUserCount = async (timeframe) => {
      const res = await axios.get(`${apiUrl}/api/accounts/get-stats-account?timeframe=${timeframe}`, { withCredentials: true });
      setUsersData(res.data);
      let clientsData = Object.keys(res.data).map((item) => {
        return res.data[item].client;
      })
      let organizerData = Object.keys(res.data).map((item) => {
        return res.data[item].organizer;
      })

      setChartData({
        labels: Object.keys(res.data).map(val => val.slice(0, 10)),
        datasets: [
          {
            label: 'Clients',
            data: clientsData,
            backgroundColor: 'rgba(255,199,0,255)',
          },
          {
            label: 'Organizers',
            data: organizerData,
            backgroundColor: 'rgba(85,46,136,255)',
          },
        ],
      });
    }

    switch (activeBtn) {
      case 0:
        fetchUserCount("lifetime");
        break;
      case 1:
        fetchUserCount("last30days");
        break;
    }

  }, [profile, activeBtn])
  return (
    <div className='organizer-summary-container' style={{ width: "100%", height: "100%" }}>
      <div className='header'>
        <div className='text-container'>
          <h4>Total Activity</h4>
        </div>
      </div>
      <div className='summary-chart'>
        <Bar options={options} data={chartData ?? data} />
      </div>
      <div className='summary-btns'>
        <div className={`summary-btn ${activeBtn === 0 ? "summary-btn-active" : ""}`} onClick={() => setActiveBtn(0)}>
          <span>Lifetime</span>
        </div>
        <div className={`summary-btn ${activeBtn === 1 ? "summary-btn-active" : ""}`} onClick={() => setActiveBtn(1)}>
          <span>Last 30 days</span>
        </div>

      </div>
    </div>
  );
};

export default TotalActivity;
