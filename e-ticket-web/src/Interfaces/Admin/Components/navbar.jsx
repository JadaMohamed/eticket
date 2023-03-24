import react, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../Auth/AuthContext";
import { Image } from "cloudinary-react";
import "../CSS/admin-navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../img/logo.svg";

function AdminNavigationBar() {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { profile, isLoggedIn } = useContext(AuthContext);
  const Nav = useNavigate();
  let menuRef = useRef();
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
  const logoutSubmit = async (event) => {
    logout();
  };
  return (
    <div className="adminnavigation-bar">
      <div className="adminnavigation-bar-container">
        <div className="logo">
          <a
            className="logoImage"
            onClick={() => Nav("/home", { replace: true })}
          >
            <img src={logo} alt="e-tickets.logo" title="e-ticket.com" />
          </a>
        </div>
        <>
          {/* <div className="btns">
            <div className="dark-light-mode btn">
              <span className="material-symbols-outlined">dark_mode</span>
            </div>
            <div className="notifications btn">
              <span className="material-symbols-outlined">notifications</span>
            </div>
          </div> */}
          <div
            className="account-infos"
            onClick={() => {
              setOpen(!open);
            }}
            ref={menuRef}
            title={`${profile?.account?.first_name} ${profile?.account?.last_name}`}
          >
            <div className="account-infos-container">
              <div className="left-side"></div>
              <div className="right-side">
                <div className="account-name">Eticket Production</div>
                <div className="account-type">Admin</div>
              </div>
            </div>
          </div>
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <div className="dropdown-items">
              <div className="user-infos">
                <div className="label">ACCOUNT</div>
                <div className="user-infos-container">
                  <div className="avatar">
                    <Image
                      cloudName="djjwswdo4"
                      publicId={profile?.account?.avatar}
                    />
                  </div>
                  <div className="right-side">
                    <div className="name-last">
                      {profile?.account?.first_name}{" "}
                      {profile?.account?.last_name}
                    </div>
                    <div className="email">{profile?.account?.email}</div>
                  </div>
                </div>
              </div>

              <div
                className="dropdown-item"
                onClick={() => Nav("/home", { replace: true })}
              >
                <div>
                  <span className="material-symbols-outlined">home</span>
                </div>
                Home
              </div>
              <div
                className="dropdown-item"
                onClick={() => Nav("/settings", { replace: true })}
              >
                <div>
                  <span className="material-symbols-outlined">edit_square</span>
                </div>
                Settings
              </div>
              {/* <div className="dropdown-item">
                <div>
                  <span className="material-symbols-outlined">
                    contact_support
                  </span>
                </div>
                Support
              </div> */}
              <div
                className="dropdown-item"
                onClick={() => {
                  logoutSubmit();
                }}
              >
                <div>
                  <span className="material-symbols-outlined">logout</span>
                </div>
                Sign Out
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default AdminNavigationBar;
