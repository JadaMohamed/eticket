import React, { useRef } from "react";

import "../../css/create post form/ticket_form.css";
import TicketComponent from "./ticket_comp";
const Tickets_form = ({ eventData }) => {
  const ticketRef = useRef(null);
  return (
    <>

      <div className="preview-ticket-creation">
        <div className="labels">
          <div className="title">Preview ticket</div>
          <div className="instructions">
            Your Event tickets will look like.
          </div>
        </div>
        <TicketComponent ref={ticketRef} eventData={eventData}/>
      </div>
    </>
  );
};

export default Tickets_form;
