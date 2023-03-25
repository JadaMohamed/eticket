import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../Auth/AuthContext';
import '../css/eventsdropdown.css'
import Axios from 'axios';
import ArrowDown from '../../img/arrow-down.svg';
export default function EventsDropDown({ orgEvents, eventId }) {
    const centerStyle = { display: "flex", justifyContent: "center", alignItems: "center", gap: 5 };
    const [seatCategories, setSeatCategories] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const { profile } = useContext(AuthContext);
    const formatDate = (dt) => {
        if (!dt) {
            return;
        }

        const date = new Date(dt);
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "UTC",
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        return formatter.format(date);
    };

    const getTicketsSales = async () => {
        try {
            const response = await Axios.get(
                `${apiUrl}/api/events/organizer/get-ticket-sales/${eventId}`,
            );
            setSeatCategories(Object.keys(response.data));
        } catch (error) {
            console.error("OrganizerSummary: Organizer don't have any events yet");
        }
    };

    useEffect(() => {
        getTicketsSales();
    }, [profile])
    return (
        <div className="events-dropdown-container">
            <div className='event-image-container'>
                <img src={orgEvents?.brand_url ?? ""} className="event-image" />
            </div>
            {/* //Column */}
            <div className='event-infos-container'>
                {/* //Row */}
                <div className='event-primary-infos'>
                    <h4>{orgEvents?.title}</h4>

                    <div style={centerStyle}>
                        <span className="head-span">Event ID: </span><span className="event-id-span">{orgEvents?.event_id}</span>
                    </div>
                </div>
                {/* //Row */}
                <div className='event-secondary-infos'>
                    <div style={centerStyle}>
                        <span className="head-span">Start: </span><span className="sec-span"> {formatDate(orgEvents?.start_time)}</span>
                    </div>
                    <div style={centerStyle}>
                        <span className="head-span">At: </span><span className="sec-span"> {orgEvents?.location}</span>
                    </div>
                    <div style={centerStyle}>
                        <span className="head-span">Seat categories: </span><span className="sec-span"> {seatCategories?.length}</span>
                    </div>
                    <div style={centerStyle}>
                        <span className="head-span">Created: </span><span className="sec-span"> {formatDate(orgEvents?.created_at)}</span>
                    </div>

                </div>
            </div>
                <div className='arrow-down-container'>
                    <svg width="12" height="8" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L4.65217 5L8 1" stroke="black" />
                    </svg>
                </div>
        </div>
    )
}
