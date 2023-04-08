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
            display: false,
        },
        title: {
            display: false,
            text: 'Events Summary',
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
                // gradient.addColorStop(1, "rgba(217, 217, 217, 0)");
                return gradient;
            },
        },
    ],
};

const locations = [
    {
        label: 'New York',
        value: 'newYork',
    },
    {
        label: 'Oslo',
        value: 'oslo',
    },
    {
        label: 'Istanbul',
        value: 'istanbul',
    }
];
const lastMonth = "last30days";
const lastWeek = "last7days";
const lastTwentyFourHours = "last24hours";
function OrganizerSummary({title, width, height, summaryChartStyle}) {
    const [activeBtn, setActiveBtn] = useState(0);
    const [orgEvents, setOrgEvents] = useState(null);
    const [data, setData] = useState(chartFakeData);
    const [options, setOptions] = useState([{ label: "All Events", value: "all" }]);
    const [eventId, setEventId] = useState('all');
    const { profile } = useContext(AuthContext);

    const apiUrl = process.env.REACT_APP_API_URL;

    const getOrganizerEvents = async () => {
        try {
            const response = await Axios.get(
                `${apiUrl}/api/events/organizer/${profile.user.org_id}/all-events`,
            );
            setOrgEvents(response.data);
        } catch (error) {
            console.error("OrganizerSummary: Organizer don't have any events yet", error);
        }
    };
    useEffect(() => {
        getOrganizerEvents();
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
            throw new Error("OrganizerSummary: Invalid timeframe frontend side!");
        }
    }
    const getSalesData = async () => {
        try {
            const response = await Axios.get(
                `${apiUrl}/api/events/organizer/get-event-sales/${profile.user.org_id}${eventId !== 'all' ? "?eventId=" + eventId : "?"}&timeframe=${getTimeFrameFromActiveBtn()}`,
            );
            let labels = Object.keys(response.data)
            labels = labels.map(val => val.slice(4, 10))
            const data = Object.values(response.data);
            console.log("labels: ", labels, "data: ", data);
            setData({
                labels,
                datasets: [
                    {
                        fill: true,
                        label: 'Sales',
                        data: data,
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
            })
        } catch (error) {
            console.error("OrganizerSummary: Organizer get sales error : ", error);
        }
    }

    useEffect(() => {
        // getOrganizerEvents();
        
    }, []);

    useEffect(() => {
        if (orgEvents) {
            const _options = orgEvents.map(item => ({
                label: `${item.event_id} - ${item.title}`,
                value: `${item.event_id}`
            }))
            console.log("hmm ? ", _options);
            setOptions([{ label: "All Events", value: "all" }, ..._options])
        }
    }, [orgEvents]);

    useEffect(() => {
        getSalesData();
    }, [activeBtn, eventId]);

    const handleDropDownChange = (val) => {
        setEventId(val.value);
    }
    return (
        <div className='organizer-summary-container' style={{width: width ?? 723, height: height ?? 482}}>
            <div className='header'>
                <div className='text-container'>
                    <h4>{title}</h4>
                    <span>More details</span>
                </div>
                <Dropdown
                    name=""
                    title="All Events"
                    list={options}
                    onChange={handleDropDownChange}
                    styles={{
                        wrapper: {
                            width: 'fit-content',
                            minWidth: '160px',
                            maxHeight: '34px',
                        },
                        headerTitle: {
                            fontFamily: 'Segoe UI',
                            fontWeight: 600,
                            fontSize: '14px'
                        },
                        listItem: {
                            fontSize: '14px',
                        },
                    }}
                />
            </div>
            <div className='summary-chart' style={summaryChartStyle ?? {}}>
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

export default OrganizerSummary;