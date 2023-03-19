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
            Sit amet consectetur. Suspendisse tincidunt viverra olor sit amet
            consectetur.
          </div>
        </div>
        <TicketComponent ref={ticketRef} eventData={eventData}/>
      </div>
    </>
  );
};

export default Tickets_form;
