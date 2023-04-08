import React from "react";

const SearchUser = ({ userTypeFilter, setUserTypeFilter }) => {
  return (
    <div className="search-user">
      <div className="search-user-container">
        <div className="search-left-side">
          <div className="iconed-input">
            <input type="text" placeholder="Search user" />
            <span class="material-symbols-outlined">search</span>
          </div>
          <div className="filter">
            <div className="filter-container">
              <div
                className={`organizer user ${
                  userTypeFilter === "organizer" ? "active" : ""
                }`}
                onClick={() => setUserTypeFilter("organizer")}
              >
                Organizer
              </div>
              <div
                className={`all-users user ${
                  userTypeFilter === "all" ? "active" : ""
                }`}
                onClick={() => setUserTypeFilter("all")}
              >
                All
              </div>
              <div
                className={`client user ${
                  userTypeFilter === "client" ? "active" : ""
                }`}
                onClick={() => setUserTypeFilter("client")}
              >
                Client
              </div>
            </div>
          </div>
        </div>
        <div className="search-right-side">
          <div className="stats">
            FOUND <span>103,948</span> USER
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
