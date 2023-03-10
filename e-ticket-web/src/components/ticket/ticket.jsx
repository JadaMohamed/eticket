import React from "react";
import "../../css/ticket.css";
import CountdownDate from "../common/countdown";

function Ticket({ ticket }) {
  return (
    <div className="ticket-card-table">
      <div className="ticket-card">
        <div className="ticket-card-container">
          <div className="ticket-infos">
            <input
              type="checkbox"
              name="selected-product"
              className="disable-on-mobile"
              title="Select"
            />
            <div className="preview-image">
              <img src={ticket.Event.brand_url} alt="" />
            </div>
            <div className="event-inf">
              <div className="event-title">{ticket.Event.title}</div>

              <div className="local inf">
                <span className="material-symbols-outlined">location_on</span>
                {ticket.Event.location}
              </div>
              <div className="date inf">
                <span className="material-symbols-outlined">hourglass_top</span>
                <CountdownDate date={ticket.Event.start_time} />
              </div>
              <div className="event-category">{ticket.Event.event_type}</div>
            </div>
          </div>
          <div className="ticket-consult">
            <div className="btns">
              <div className="download-ticket btn">
                <span className="material-symbols-outlined">download</span>
                Download
              </div>
              <div className="preview-ticket btn">
                <span className="material-symbols-outlined">
                  qr_code_scanner
                </span>
                View
              </div>
            </div>
            <input
              type="checkbox"
              name="selected-product"
              className="select-ticket-mobile"
            />
          </div>
        </div>
      </div>
      {/* <div className="ticket-card">
                <div className="ticket-card-container">
                    <div className="ticket-infos">
                        <input type="checkbox" name="selected-product" className="disable-on-mobile" title="Select" />
                        <div className="preview-image">
                            <img src="" alt="" />
                        </div>
                        <div className="event-inf">
                            <div className="event-title">
                                This suppose to be a title
                            </div>
                            <div className="event-category">
                                Theater | Cinema
                            </div>
                            <div className="local inf">
                                <span className="material-symbols-outlined">location_on</span>
                                Megarama Agadir
                            </div>
                            <div className="date inf">
                                <span className="material-symbols-outlined">hourglass_top</span>
                                2022-05-12T23:50:21
                            </div>
                        </div>
                    </div>
                    <div className="ticket-consult">
                        <div className="btns">
                            <div className="download-ticket btn">
                                <span className="material-symbols-outlined">download</span>
                                Download
                            </div>
                            <div className="preview-ticket btn">
                                <span className="material-symbols-outlined">qr_code_scanner</span>
                                View
                            </div>
                        </div>
                        <input type="checkbox" name="selected-product" className="select-ticket-mobile" />
                    </div>
                </div>
            </div> */}
    </div>
  );
}

export default Ticket;
