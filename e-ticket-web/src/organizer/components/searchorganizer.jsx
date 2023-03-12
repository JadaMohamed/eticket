import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/searchorganizer.css";

const SearchOrganizer = (props) => {
  const Nav = useNavigate();
  return (
    <div className="search-create-nav">
      <div className="searchbar-organizer">
        <input type="text" placeholder={`Search ${props.ph}`} />
        <span class="material-symbols-outlined">search</span>
      </div>
      <div className="create-event-btn">
        <div
          className="btn-container"
          onClick={() => {
            Nav("/organizer/events/createevent", { replace: true });
          }}
        >
          <span class="material-symbols-outlined icon">add_circle</span>{" "}
          <span> Create Event</span>
        </div>
      </div>
    </div>
  );
};

export default SearchOrganizer;
