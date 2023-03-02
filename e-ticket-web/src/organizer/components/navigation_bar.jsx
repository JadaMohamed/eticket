import react from "react";
import "../css/navigation_bar.css";

function OrNavigationBar() {
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
        <div className="account-infos">
          <div className="account-infos-container">
            <div className="left-side"></div>
            <div className="right-side">
              <div className="account-name">Eticket Production</div>
              <div className="account-type">Organizer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrNavigationBar;
