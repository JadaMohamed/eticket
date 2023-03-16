import React, { useState } from "react";
import logo from "../../img/log-dark.svg";
import logoShort from "../../img/log-dark-short.svg";
import "../css/side_bar.css";
import { useNavigate } from "react-router-dom";

function SideBar(props) {
  const Nav = useNavigate();
  const [sidebar, SetSidebar] = useState(true);
  return (
    <div className={`side-bar ${sidebar ? "active-side-bar" : ""}`}>
      <div className="sidebar-container">
        <div className="top-content">
          <div className="logo">
            <img src={sidebar ? logoShort : logo} alt="" />
          </div>
          <div className="top routes-btns">
            <div
              className={`btn ${
                props.activeBtn === "dashboard" ? "active" : ""
              }`}
              onClick={() => {
                Nav("/organizer/dashboard");
              }}
            >
              <div className="btn-container">
                <span className="material-symbols-outlined">dashboard</span>
                <div className="name">Dashboard</div>
              </div>
            </div>
            <div
              className={`btn ${props.activeBtn === "events" ? "active" : ""}`}
              onClick={() => {
                Nav("/organizer/events");
              }}
            >
              <div className="btn-container">
                <span className="material-symbols-outlined">
                  calendar_month
                </span>{" "}
                <div className="name">Events</div>
              </div>
            </div>
            <div
              className={`btn ${props.activeBtn === "sales" ? "active" : ""}`}
              onClick={() => {
                Nav("/organizer/sales");
              }}
            >
              <div className="btn-container">
                <span className="material-symbols-outlined">sell</span>{" "}
                <div className="name">Sales</div>
              </div>
            </div>
            <div
              className={`btn ${props.activeBtn === "tickets" ? "active" : ""}`}
              onClick={() => {
                Nav("/organizer/tickets");
              }}
            >
              <div className="btn-container">
                <span className="material-symbols-outlined">
                  confirmation_number
                </span>{" "}
                <div className="name">Tickets</div>
              </div>
            </div>
            <div
              className={`btn ${props.activeBtn === "qr" ? "active" : ""}`}
              onClick={() => {
                Nav("/organizer/manageqr");
              }}
            >
              <div className="btn-container">
                <span className="material-symbols-outlined">
                  qr_code_scanner
                </span>{" "}
                <div className={`name ${sidebar ? "active-name" : ""}`}>
                  Manage QR
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bottom routes-btns">
          <div className="btn">
            <div className="btn-container">
              <span className="material-symbols-outlined">logout</span>
              <div className="name">Log out</div>
            </div>
          </div>
        </div> */}
        <div
          className="pin-unpin"
          onClick={() => {
            SetSidebar(!sidebar);
          }}
        >
          <div className="pin-unpin-container">
            <span className="material-symbols-outlined">
              {sidebar ? "arrow_forward_ios" : "arrow_back_ios"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
