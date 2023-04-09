import react from "react";
import OrNavigationBar from "../components/navigation_bar";
import SideBar from "../components/side_bar";
import "../css/manage_qr.css";
import step1 from "../../img/step1.svg";
import step2 from "../../img/step2.svg";
import step3 from "../../img/step3.svg";
import QRSwiper from "../components/manage_qr_swiper";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";

function Manage_qr() {
  return (
    <div>
      <div>
        <Navbar />
        <SideBar activeBtn="qr" />
        <div className="manage-qr">
          <div className="manage-qr-container">
            <div className="top-manage-qr-container">
              <div className="title">3 Steps to manage your event gate</div>
              <div className="description">
                Here is the instruction to follow for managing smoothly your
                event attendances.
              </div>
            </div>
            <div className="bottom-manage-qr-container">
              <div className="step">
                <div className="step-visuals">
                  <div className="image">
                    <img src={step1} alt="" />
                  </div>
                  <div className="step-title">Scanner</div>
                </div>
                <div className="instructions-download">
                  <div className="instructions">
                    Download your and install E-Ticket Scanner application on
                    your mobile (camera required)
                  </div>
                </div>
                <div className="dwonload-app">
                  <span className="material-symbols-outlined">download</span>
                  <span>Download App</span>
                </div>
              </div>
              <div className="step">
                <div className="step-visuals">
                  <div className="image">
                    <img src={step2} alt="" />
                  </div>
                  <div className="step-title">Authenifiate</div>
                </div>
                <div className="instructions">
                  Login to the application using your email and password.
                </div>
              </div>
              <div className="step">
                <div className="step-visuals">
                  <div className="image">
                    <img src={step3} alt="" />
                  </div>
                  <div className="step-title">Start managing</div>
                </div>
                <div className="instructions">
                  Select your event and start scanning QR code in your visitors
                  tickets.
                </div>
              </div>
            </div>
            {/* <QRSwiper /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manage_qr;
