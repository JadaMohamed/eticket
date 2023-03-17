import React from "react";
import QR from "../../../img/qrcode.svg";
import Bar from "../../../img/barcode.svg";
import "../../css/create post form/ticket_form.css";
const Tickets_form = ({ eventData }) => {
  return (
    <div className="preview-ticket-creation">
      <div className="labels">
        <div className="title">Preview ticket</div>
        <div className="instructions">
          Sit amet consectetur. Suspendisse tincidunt viverra olor sit amet
          consectetur.
        </div>
      </div>
      <div className="preview-ticket">
        <div className="preview-ticket-container">
          <div className="left-side">
            <div className="left-top">
              <div className="title">{eventData.eventTitle}</div>
              <div className="adress">
                {eventData.address1} {eventData.address2}
              </div>
              <div className="time">
                {eventData.date} {eventData.time}
              </div>
            </div>
            <div className="left-bottom">
              <div className="event-description">{eventData.description}</div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="right">
                <img src={QR} alt="" />
              </div>
              <div className="right">
                <img src={Bar} alt="" />
              </div>
              <div className="right">TICKET CATEGORY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets_form;
