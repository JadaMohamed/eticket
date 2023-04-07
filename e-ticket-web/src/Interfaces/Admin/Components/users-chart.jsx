import axios from 'axios';
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import React, { useContext, useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import "../../../../src/organizer/css/seats_sales.css";
import AuthContext from '../../../Auth/AuthContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Client', 'Oraganizer'],
    datasets: [
        {
            label: '# Tickets sales',
            data: [30, 10],
            backgroundColor: [
                'rgba(255,199,0,255)',
                'rgba(85,46,136,255)',
            ],
        },
    ],
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Seats Sales',
        },
        tooltip: {
            backgroundColor: '#552E88',
        },
    },
};

function UsersChart({usersCount}) {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.warn("usersCount in chart", usersCount);
    const {profile} = useContext(AuthContext);
    const [chartData, setChartData] = useState({
        labels: ['Client', 'Oraganizer'],
        datasets: [
            {
                label: '# Tickets sales',
                data: [parseInt(usersCount?.clientsCount), parseInt(usersCount?.organizersCount)],
                backgroundColor: [
                    'rgba(255,199,0,255)',
                    'rgba(85,46,136,255)',
                ],
            },
        ],
    });
    console.warn("chartData in chart", chartData);
    const totalUsers = parseInt(usersCount?.organizersCount) + parseInt(usersCount?.clientsCount) ?? 0;
    // console.warn("meow", usersCount);
    // useEffect(() => {
    //     // http://localhost:8000/api/admins/users/count/total
    //     const fetchUserCount = async () => {
    //         const res = await axios.get(`${apiUrl}/api/admins/users/count/total`, { withCredentials: true });
    //         setUsersCount(res.data.organizersCount + res.data.clientsCount);
    //     }
    //     fetchUserCount();
    // }, [])
    useEffect(() => {
        setChartData({
            labels: ['Client', 'Oraganizer'],
            datasets: [
                {
                    label: '# Tickets sales',
                    data: [parseInt(usersCount?.clientsCount), parseInt(usersCount?.organizersCount)],
                    backgroundColor: [
                        'rgba(255,199,0,255)',
                        'rgba(85,46,136,255)',
                    ],
                },
            ],
        });
    }, [profile])
    return (
        <div className='seats-sales-container'>
            <div className='header'>
                <div className='text-container'>
                    <h4>Platform users</h4>
                </div>
            </div>
            <div className='doughnut-chart'>
                <div className='chart-completion'>
                    <div className='chart-completion-percentage'>
                        <h2>{parseInt(usersCount?.organizersCount) + parseInt(usersCount?.clientsCount)}</h2>
                    </div>
                    <span style={{ fontSize: 12 }}>User</span>
                </div>
                <Doughnut data={chartData} options={chartOptions} />
            </div>
            <div className='legend'>

                <div className='legend-item'>
                    <div className="legend-color" style={{ backgroundColor: "#ffc700" }}></div>
                    <span>Client</span>
                    <span>{parseInt(usersCount?.clientsCount)}/{totalUsers}</span>
                    <span>{(parseInt(usersCount?.clientsCount) / totalUsers) * 100}%</span>
                </div>
                <div className='legend-item'>
                    <div className="legend-color" style={{ backgroundColor: "#552e88" }}></div>
                    <span>Organizer</span>
                    <span>{parseInt(usersCount?.organizersCount)}/{totalUsers}</span>
                    <span>{(parseInt(usersCount?.organizersCount) / totalUsers) * 100}%</span>
                </div>
            </div>
        </div>
    )
}

export default UsersChart