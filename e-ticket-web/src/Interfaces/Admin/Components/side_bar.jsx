import React, { useState } from "react";
import "../CSS/admin-sidebar.css";
import { useNavigate } from "react-router-dom";

function SideBar(props) {
  const Nav = useNavigate();
  const [sidebar, SetSidebar] = useState(true);
  return (
    <div className={`side-bar ${sidebar ? "active-side-bar" : ""}`}>
      <div className="sidebar-container">
        <div className="top-content">
          <div className="top routes-btns">
            <div
              className={`btn ${
                props.activeBtn === "dashboard" ? "active" : ""
              }`}
              onClick={() => {
                Nav("/admin/dashboard");
              }}
            >
              <div className="btn-container">
                <span className="material-symbols-outlined">dashboard</span>
                <div className="name">Dashboard</div>
              </div>
            </div>
            <div
              className={`btn ${props.activeBtn === "users" ? "active" : ""}`}
              onClick={() => {
                Nav("/admin/manageuser");
              }}
            >
              <div className="btn-container">
                <span className="material-symbols-outlined">group</span>{" "}
                <div className="name">Users</div>
              </div>
            </div>
            <div
              className={`btn ${props.activeBtn === "sales" ? "active" : ""}`}
              onClick={() => {
                Nav("/admin/sales");
              }}
            >
              <div className="btn-container">
                <span className="material-symbols-outlined">sell</span>{" "}
                <div className="name">Sales</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom routes-btns">
          <div className="btn">
            <div className="btn-container">
              <span className="material-symbols-outlined">settings</span>
              <div className="name">Settings</div>
            </div>
          </div>
          <div className="btn">
            <div className="btn-container">
              <span className="material-symbols-outlined">logout</span>
              <div className="name">Log out</div>
            </div>
          </div>
        </div>
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
