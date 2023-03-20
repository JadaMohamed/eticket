import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/searchorganizer.css";

const SearchOrganizer = ({ setAllEvents, allFechedEvents, ph }) => {
  const Nav = useNavigate();
  const [keyword, setKeyword] = useState("");

  function ConvertDate(isodate) {
    const date = new Date(isodate);
    const options = { day: 'numeric', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  function SearchOrganizerEvent(event) {
    const searchKeyword = event.target.value;
    setKeyword(searchKeyword);
    setAllEvents(allFechedEvents.filter((event) =>
      event.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      event.location.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      ConvertDate(event.start_time).toLowerCase().includes(searchKeyword.toLowerCase())
    ));
  }



  return (
    <div className="search-create-nav">
      <div className="searchbar-organizer">
        <input type="text" value={keyword} onChange={SearchOrganizerEvent} placeholder={`Search ${ph}`} />
        <span className="material-symbols-outlined">search</span>
      </div>
      <div className="create-event-btn">
        <div
          className="btn-container"
          onClick={() => {
            Nav("/organizer/events/createevent", { replace: true });
          }}
        >
          <span className="material-symbols-outlined icon">add_circle</span>{" "}
          <span> Create Event</span>
        </div>
      </div>
    </div>
  );
};

export default SearchOrganizer;
