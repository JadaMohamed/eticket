import React, { useEffect, useState } from "react";
import "../../css/eventcard_cart.css";
import CountdownDate from "../common/countdown";
import { Image } from "cloudinary-react";
import Axios from "axios";

function EventCard_Cart(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [isSelected, setSelected] = useState(
    props.selectedCards.find((value) => value === props.order_id) ? true : false
  );
  const [seatCategories,] = useState(props.seatCategories);
  const [selectedSeat, setSelectedSeat] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;


  //  console.log(props)

  const triggerSelect = () => {
    if (!isSelected) {
      props.setCardSelected(props.order_id);
    } else {
      props.setCardUnSelected(props.order_id);
    }
    setSelected((prev) => !prev);
  };

  useEffect(() => {
    if (
      props.selectedCards.find((value) => value === props.order_id) !== undefined
    ) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [props.selectedCards]);



  const handleSeatChange = () => {

  }

  const incrementQuantity = () => {

  }

  const decrementQuantity = () => {

  }








  return (
    <div className="event-card-cart">
      <div className="event-card-cart-container">
        <div className="event-infos">
          <input
            type="checkbox"
            name="selected-product"
            className="more-event-on-mobile"
            checked={isSelected ? "checked" : ""}
            onChange={triggerSelect}
          />
          <div className="preview-image">
            <Image cloudName="djjwswdo4" publicId={props.image} />
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

              <select
                name="seat-category"
                id="seat-categories"
                onChange={handleSeatChange}
                value={selectedSeat?.seat_categ_id}
              >
                {seatCategories &&
                  seatCategories.map((val) => {
                    return (
                      <option key={val.seat_categ_id} value={val.seat_categ_id}>
                        {val.type_name} {val.type_price}MAD
                      </option>
                    );
                  })}
              </select>
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
            <div className="title-pricing">Total price</div>
            <div className="total-price">
              {props.totalPrice}
              <span>MAD</span>
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
