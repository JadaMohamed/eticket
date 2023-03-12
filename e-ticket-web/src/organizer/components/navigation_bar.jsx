import react, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../Auth/AuthContext";
import { Image } from "cloudinary-react";
import "../css/navigation_bar.css";

function OrNavigationBar() {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { profile, isLoggedIn } = useContext(AuthContext);
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
    <div className="ornavigation-bar">
      <div className="ornavigation-bar-container">
        <div className="btns">
          <div className="dark-light-mode btn">
            <span className="material-symbols-outlined">dark_mode</span>
          </div>
          <div className="notifications btn">
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
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
              <div className="account-type">Organizer</div>
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
                    {profile?.account?.first_name} {profile?.account?.last_name}
                  </div>
                  <div className="email">{profile?.account?.email}</div>
                </div>
              </div>
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
            <div className="dropdown-item">
              <div>
                <span class="material-symbols-outlined">person_add</span>
              </div>
              Sign Up
            </div>
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
      </div>
    </div>
  );
}

export default OrNavigationBar;
