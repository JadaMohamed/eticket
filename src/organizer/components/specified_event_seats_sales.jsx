import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import '../css/seats_sales.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Dropdown } from 'reactjs-dropdown-component';
import AuthContext from '../../Auth/AuthContext';
import Axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# Tickets sales',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 34, 180, 1)',
                'rgba(85, 46, 136, 1)',
                'rgba(255, 199, 0, 1)',
                'rgba(255, 34, 180, 0.1)',
                'rgba(85, 46, 136, 0.1)',
                'rgba(255, 159, 64, 0.2)',
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
function SpecifiedEventSeatSales({eventId}) {
    const [ticketsSales, setTicketsSales] = useState(null);
    const [salesData, setSalesData] = useState(null);
    const { profile } = useContext(AuthContext);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    const apiUrl = process.env.REACT_APP_API_URL;

    let oldColors = useRef([]);
    const getTicketsSales = async () => {
        if(!eventId) 
            return;

        try {
            const response = await Axios.get(
                `${apiUrl}/api/events/organizer/get-ticket-sales/${eventId}`,
            );

            let labels = Object.keys(response.data)
            const data = Object.values(response.data).map((item) => item[0]);
            let colors
            if(oldColors.current.length != data.length ) {
                colors = Array.from({ length: data.length }, () => '#' + Math.floor(Math.random() * 16777215).toString(16));
            }
            oldColors.current = [...colors];
            setSalesData({ labels, colors, data: Object.values(response.data) });

            setTicketsSales({
                labels,
                datasets: [
                    {
                        label: '# Tickets sales',
                        data: data,
                        backgroundColor: colors,
                    },
                ],
            });
            let sumPercentage = 0;
            Object.values(response.data).forEach(element => {
                sumPercentage += (parseInt(element[0]) / parseInt(element[1])) * 100
            });
            setCompletionPercentage(parseFloat(sumPercentage / (Object.values(response.data).length)).toPrecision(2));
        } catch (error) {
            console.error("OrganizerSummary: Organizer don't have any events yet");
        }
    };



    useEffect(() => {
        getTicketsSales();
    }, [eventId, profile])


    return (
        <div className='seats-sales-container'>
            <div className='header'>
                <div className='text-container'>
                    <h4>Seats Sales</h4>
                    <span>More details</span>
                </div>
                <div className='solo-event-id-container'>
                    <span>#{eventId}</span>
                </div>
            </div>
            <div className='doughnut-chart'>
                <div className='chart-completion'>
                    <div className='chart-completion-percentage'>
                        <h2>{completionPercentage}</h2>
                        %
                    </div>
                    <span style={{fontSize: 12}}>Completion</span>
                </div>
                <Doughnut data={ticketsSales ? ticketsSales : data} options={chartOptions} />
            </div>
            <div className='legend'>
                {salesData && salesData.data.map((item, index) => {
                    if (item[0] == 0) {
                        return;
                    }
                    return (
                        <div className='legend-item'>
                            <div className="legend-color" style={{ backgroundColor: salesData.colors[index] }}></div>
                            <span style={{width: 50}}>{salesData.labels[index]}</span>
                            <span style={{width: 20}}>{item[0]}/{item[1]}</span>
                            <span style={{width: 10}}>{(item[0] / item[1]) * 100}%</span>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default SpecifiedEventSeatSales;