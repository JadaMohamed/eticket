import React, { useState } from "react";
import "../../css/eventcard_cart.css";
import CountdownDate from "../common/countdown";
import EventImage from "../../img/event-image.jpg";

function EventCard_Cart(props) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      console.log(quantity);
    }
  };

  return (
    <div className="event-card-cart">
      <div className="event-card-cart-container">
        <div className="event-infos">
          <input
            type="checkbox"
            name="selected-product"
            className="more-event-on-mobile"
          />
          <div className="preview-image">
            <img src={EventImage} alt="" />
          </div>
          <div className="event-inf">
            <div className="event-title">{props.title}</div>
            <div className="local inf">
              <span className="material-symbols-outlined">location_on</span>
              {props.location}
            </div>
            <div className="date inf">
              <span className="material-symbols-outlined">hourglass_top</span>
              <CountdownDate date={props.date} />
            </div>
            <div className="event-category">{props.eventCategory}</div>
          </div>
        </div>
        <div className="shopping-infos">
          <div className="slecting-cat-quan">
            <div className="seat-category">
              <span className="seat-static-title">Category : </span>
              Standar
            </div>
            <div className="quantity">
              <span
                className="decrement btn"
                title="Decrement"
                onClick={decrementQuantity}
              >
                -
              </span>
              <span className="quantity-to-set">{quantity}</span>
              <span
                className="increment btn"
                title="Increment"
                onClick={incrementQuantity}
              >
                +
              </span>
            </div>
          </div>
          <div className="pricing">
            <div className="title-pricing">Total Price :</div>
            <div className="total-price">
              299<span>MAD</span>
            </div>
          </div>
          <div className="actions" title="More events">
            <input
              type="checkbox"
              name="selected-product"
              className="active-on-mobile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard_Cart;
