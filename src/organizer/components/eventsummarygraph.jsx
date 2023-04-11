import React, { useContext, useEffect, useState } from 'react'
import '../css/organizersummary.css';
import { Dropdown } from 'reactjs-dropdown-component';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';
import AuthContext from '../../Auth/AuthContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const chartOptions = {
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
        },
        y: {
            beginAtZero: true,
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
            display: true,
        },
        title: {
            display: false,
            text: 'Event Summary',
        },
        tooltip: {
            backgroundColor: '#552E88',
        },
    },
};

const labels = ['7 Feb', '8 Feb', '9 Feb', '10 Feb', '11 Feb', '12 Feb', '13 Feb'];

export const chartFakeData = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Sales',
            data: [56, 30, 43, 25, 114, 145, 135],
            borderColor: 'rgba(85, 46, 136, 1)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.3,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, "rgba(85, 46, 136, 1)");
                gradient.addColorStop(1, "rgba(131, 105, 164, 0.6)");

                return gradient;
            },
        },
    ],
};

const lastMonth = "last30days";
const lastWeek = "last7days";
const lastTwentyFourHours = "last24hours";
function EventSummaryGraph({ eventId }) {
    const [activeBtn, setActiveBtn] = useState(0);
    const [data, setData] = useState(chartFakeData);
    const { profile } = useContext(AuthContext);
    console.log("data is now : ", data);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        getSalesData();
    }, [profile])

    const getTimeFrameFromActiveBtn = () => {
        if (activeBtn === 0) {
            return lastMonth;
        } else if (activeBtn === 1) {
            return lastWeek;
        } else if (activeBtn === 2) {
            return lastTwentyFourHours
        } else {
            throw new Error("EventSummaryGraph: Invalid timeframe frontend side!");
        }
    }

    const getSalesData = async () => {
        try {
            const response = await Axios.get(
                `${apiUrl}/api/events/organizer/get-event-sales-seats/${profile.user.org_id}?eventId=${eventId}&timeframe=${getTimeFrameFromActiveBtn()}`
            );
            if (response.status == 200) {
                let labels = Object.keys(response.data)
                    .flatMap(category => Object.keys(response.data[category]))
                    .sort((a, b) => new Date(a) - new Date(b))
                    .map(date => date.slice(4, 10))
                    .filter((value, index, self) => self.indexOf(value) === index);

                let datasets = Object.keys(response.data).map(item => {
                    let localData = [];

                    for (const [key, value] of Object.entries(response.data[item])) {
                        localData.push({ x: key.slice(4, 10), y: value })
                    }

                    const r = Math.floor(Math.random() * 155 + 100);
                    const g = Math.floor(Math.random() * 155 + 100);
                    const b = Math.floor(Math.random() * 155 + 100);
                    const borderColor = `rgba(${r}, ${g}, ${b}, 1)`;
                    const backgroundColor = `rgba(${r - 32}, ${g + 116}, ${b + 99}, 0.5)`
                    return {
                        fill: true,
                        label: item,
                        data: localData,
                        borderColor: borderColor,
                        backgroundColor: backgroundColor,
                        tension: 0.2,
                        backgroundColor: context => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 200);

                            gradient.addColorStop(
                                0,
                                borderColor
                            );
                            gradient.addColorStop(
                                1,
                                `rgba(${r + 46}, ${g + 59}, ${b + 28}, 0.5)`
                            );
                            return gradient;
                        }
                    };

                });

                setData({
                    labels: labels,
                    datasets
                });
            }
        } catch (error) {
            console.error("EventSummaryGraph: Organizer get sales error : ", error);
        }
    };





    useEffect(() => {
        getSalesData();
    }, [activeBtn, eventId]);
    return (
        <div className='organizer-summary-container'>
            <div className='header'>
                <div className='text-container'>
                    <h4>Summary</h4>
                    <span>More details</span>
                </div>
                <div className='solo-event-id-container'>
                    <span>#{eventId}</span>
                </div>
            </div>
            <div className='summary-chart'>
                <Line options={chartOptions} data={data} />
            </div>
            <div className='summary-btns'>
                <div className={`summary-btn ${activeBtn === 0 ? "summary-btn-active" : ""}`} onClick={() => setActiveBtn(0)}>
                    <span>Last 30 days</span>
                </div>
                <div className={`summary-btn ${activeBtn === 1 ? "summary-btn-active" : ""}`} onClick={() => setActiveBtn(1)}>
                    <span>Last 7 days</span>
                </div>
                <div className={`summary-btn ${activeBtn === 2 ? "summary-btn-active" : ""}`} onClick={() => setActiveBtn(2)}>
                    <span>Last 24 hours</span>
                </div>
            </div>
        </div>
    )
}

export default EventSummaryGraph;