import React from "react";
import "../css/eventcard.css";
const EventCard = () => {
  return (
    <div className="cardevent organizer-cardevent">
      <div className="previewimage with-title">
        <img src="" alt="" />
        <div className="event-title">Event title goes here</div>
      </div>
      <div className="oevent-infos-actions">
        <div className="oevent-infos">
          <div className="oinfos">
            <div className="start">
              Start: <span>21 Jan</span>
            </div>
            <div className="addres">
              At: <span>City goes here</span>
            </div>
          </div>
          <div className="sales-process">
            <div className="percent"></div>
          </div>
          <div className="svent-statu">
            Statu: <span> Selling</span>
          </div>
        </div>
        <div className="oevent-actions">
          <div className="change-statu">
            <div className="label">Stop selling</div>
          </div>
          <div className="actions">
            <div className="stats act">
              <span class="material-symbols-outlined">equalizer</span>
            </div>
            <div className="edit act">
              <span class="material-symbols-outlined">edit</span>
            </div>
            <div className="share act">
              <span class="material-symbols-outlined">share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
