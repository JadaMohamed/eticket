import React, { useState, useEffect, useRef } from "react";
import logo from "../../img/logo.svg";
import "../../css/navbar.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../Constants";
import Search from "../../pages/Search/Search";
import LoginPopup from "./loginpopup";

function Navbar(props) {
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [popupLogin, setpoupLogin] = useState(false);
  const Nav = useNavigate();
  let menuRef = useRef();

  const handleSearch = () => {
    if (keyword?.length) Nav(`/search/${keyword}`, { replace: true });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <nav className="nav">
      <div className="nav-container">
        <a
          className="logoImage"
          onClick={() => Nav("/home", { replace: true })}
        >
          <img
            src={logo}
            alt="e-tickets.logo"
            className="Logo_"
            title="e-ticket.com"
          />
        </a>
        <div className="nav-search">
          <div className="nav-search-container">
            <input
              type="text"
              id="search"
              placeholder="Search E-tickets"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div onClick={handleSearch} className="btn" title="Search">
              <span className="material-symbols-outlined">search</span>
            </div>
          </div>
        </div>
        <div className="navmenu">
          <div className="float-btns">
            <div className="float-btns-container">
              <div
                onClick={() => Nav("/home", { replace: true })}
                className="home-mobile btn"
              >
                <span className="material-symbols-outlined">home</span>
              </div>
              <div
                onClick={() => Nav("/cart", { replace: true })}
                className={`btn ${props.active === "cart" ? "active" : ""}`}
                id="cart"
                title="Cart"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <div
                onClick={() => Nav("/mytickets", { replace: true })}
                className={`btn ${
                  props.active === "mytickets" ? "active" : ""
                }`}
                id="mytickets"
                title="My Tickets"
              >
                <span className="material-symbols-outlined">
                  local_activity
                </span>
              </div>
              <div
                onClick={() => {
                  setOpen(!open);
                }}
                className="btn menu-trigger"
                id="me"
                title="Me"
                ref={menuRef}
              >
                <span className="material-symbols-outlined">person_pin</span>
              </div>
            </div>
          </div>
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <div className="dropdown-items">
              <div
                className="dropdown-item"
                onClick={() => Nav("/settings", { replace: true })}
              >
                <div>
                  <span className="material-symbols-outlined">edit_square</span>
                </div>
                Settings
              </div>
              <div className="dropdown-item">
                <div>
                  <span className="material-symbols-outlined">language</span>
                </div>
                English
              </div>
              <div className="dropdown-item">
                <div>
                  <span className="material-symbols-outlined">
                    contact_support
                  </span>
                </div>
                Support
              </div>
              <div
                className="dropdown-item"
                onClick={() => {
                  setpoupLogin(true);
                }}
              >
                <div>
                  <span className="material-symbols-outlined">login</span>
                </div>
                Sign in
              </div>
              <div
                className="dropdown-item"
                onClick={() => {
                  Nav("/registration", { replace: false });
                }}
              >
                <div>
                  <span className="material-symbols-outlined">login</span>
                </div>
                Sign Up
              </div>
            </div>
          </div>
          <div>
            <div className="humber-menu btn">
              <span className="material-symbols-outlined">menu_open</span>
            </div>
          </div>
        </div>
      </div>
      {popupLogin && <LoginPopup setTrigger={setpoupLogin} />}
    </nav>
  );
}
export default Navbar;
