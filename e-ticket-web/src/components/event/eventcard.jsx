import React from "react";
import "../../css/card.css";
import { useNavigate } from "react-router-dom";
import CountdownDate from "../common/countdown";
import Image from "../../img/event-image.jpg";

function Card(props) {
  const Nav = useNavigate();

  return (
    <div
      className="cardevent"
      key={props.id}
      onClick={() => Nav("/events", { replace: true })}
    >
      <div className="previewimage">
        <img src={Image} alt="" />
      </div>
      <div className="event-infos">
        <div className="infos-container">
          <div className="event-title">{props.title}</div>
          <div className="local inf">
            <span className="material-symbols-outlined">distance</span>
            {props.location}
          </div>
          <div className="date inf">
            <span className="material-symbols-outlined">hourglass_top</span>
            <CountdownDate date={props.date} />
          </div>
          <div className="event-category">{props.category}</div>
          <div className="shopping">
            <div className="priceing">
              <span className="start-at">Start at</span>
              <div className="eventprice">
                <span className="price">{props.price}</span>
                <span className="curr">MAD</span>
              </div>
            </div>
            <div className="action">
              {/* <div className="buy-btn">Buy now</div> */}
              <div className="add-to-cart-btn">
                <span className="material-symbols-outlined">
                  add_shopping_cart
                </span>
                ADD TO CART
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
