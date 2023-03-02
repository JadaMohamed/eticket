import React from "react";
import '../../css/mytickets_comps.css'

function TicketsHead(){
    return(
        <div className="mytickets-products-header">
            <div className="mytickets-products-header-container">
                <div className="head">
                <span className="disable-on-mobile">Ticket</span>
                <span className="disable-on-mobile">Actions</span>
                </div>
            </div>
        </div>
    );
}

export default TicketsHead;