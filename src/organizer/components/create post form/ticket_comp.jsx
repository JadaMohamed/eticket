import React from "react";
import QR from "../../../img/qrcode.svg";
import Bar from "../../../img/barcode.svg";
import "../../css/create post form/ticket_form.css";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";

export default React.forwardRef(function TicketComponent(
  { eventData, ticketCategory, visible = true, width, qrCode },
  ref
) {
  const dateStr = eventData.start_time;
  const dateObj = new Date(dateStr);

  const formattedDate = `${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dateObj
    .getDate()
    .toString()
    .padStart(2, "0")}-${dateObj.getFullYear()}`;

  const formattedTime = `${dateObj
    .getHours()
    .toString()
    .padStart(2, "0")}:${dateObj.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div
      className="preview-ticket"
      ref={ref}
      style={{
        width: width ? width : "",
        position: visible ? "" : "absolute",
        marginTop: visible ? "" : "-100000%",
      }}
    >
      <div className="preview-ticket-container">
        <div className="left-side">
          <div className="left-top">
            <div className="title">
              {eventData.eventTitle ?? eventData.title}
            </div>
            <div className="adress">
              {eventData.address1 ?? eventData.location} {eventData.address2}
            </div>
            <div className="time">
              {eventData.date ?? formattedDate}{" "}
              {eventData.time ?? formattedTime}
            </div>
          </div>
          <div className="left-bottom">
            <div className="event-description">{eventData.description}</div>
          </div>
        </div>
        <div className="right-side">
          <div className="right-container">
            <div className="right">
              {qrCode ? (
                <QRCode value={qrCode} size={120} />
              ) : (
                <img src={QR} alt="" />
              )}
            </div>
            <div className="right">
              {qrCode ? (
                <Barcode
                  value={qrCode}
                  width={1}
                  height={32}
                  displayValue={false}
                />
              ) : (
                <img src={Bar} alt="" />
              )}
            </div>
            <div className="right">
              {ticketCategory ? ticketCategory : "TICKET CATEGORY"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
