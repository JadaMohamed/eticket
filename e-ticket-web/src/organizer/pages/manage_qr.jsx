import react from "react";
import OrNavigationBar from "../components/navigation_bar";
import SideBar from "../components/side_bar";
import "../css/manage_qr.css";
import step1 from "../../img/step1.svg";
import step2 from "../../img/step2.svg";
import step3 from "../../img/step3.svg";
import QRSwiper from "../components/manage_qr_swiper";
function Manage_qr() {
  return (
    <div>
      <div>
        <OrNavigationBar />
        <SideBar activeBtn="qr" />
        <div className="manage-qr">
          <div className="manage-qr-container">
            <div className="top-manage-qr-container">
              <div className="title">3 Steps dolor sit amet consectetur</div>
              <div className="description">
                Lorem ipsum dolor sit amet consectetur. Egestas eget volutpat
                quam ipsum enim. Egestas consectetur tellus egestas sit neque
                pulvinar quisque.
              </div>
            </div>
            <div className="bottom-manage-qr-container">
              <div className="step">
                <div className="step-visuals">
                  <div className="image">
                    <img src={step1} alt="" />
                  </div>
                  <div className="step-title">Step title</div>
                </div>
                <div className="instructions-download">
                  <div className="instructions">
                    Lorem ipsum dolor sit amet consectetur. Tincidunt cursus
                    eget proin adipiscing
                  </div>
                </div>
                <div className="dwonload-app">
                  <span class="material-symbols-outlined">download</span>
                  <span>Download App</span>
                </div>
              </div>
              <div className="step">
                <div className="step-visuals">
                  <div className="image">
                    <img src={step2} alt="" />
                  </div>
                  <div className="step-title">Step title</div>
                </div>
                <div className="instructions">
                  Lorem ipsum dolor sit amet consectetur. Tincidunt cursus eget
                  proin adipiscing amet porttitor mattis.
                </div>
              </div>
              <div className="step">
                <div className="step-visuals">
                  <div className="image">
                    <img src={step3} alt="" />
                  </div>
                  <div className="step-title">Step title</div>
                </div>
                <div className="instructions">
                  Tincidunt cursus eget proin adipiscing amet porttitor mattis.
                </div>
              </div>
            </div>
            <QRSwiper />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manage_qr;
