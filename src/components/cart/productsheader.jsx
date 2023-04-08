import React from "react";
import '../../css/cartheader.css'

function ProducstHeader(){
    return(
        <div className="products-header">
            <div className="products-header-container">
                <div className="head">
                <span className="mobile-disable">Event</span>
                <span className="mobile-disable">Seat Category</span>
                <span className="mobile-disable">Quantity</span>
                <span className="mobile-disable">Price</span>
                </div>
            </div>
        </div>
    );
}

export default ProducstHeader;