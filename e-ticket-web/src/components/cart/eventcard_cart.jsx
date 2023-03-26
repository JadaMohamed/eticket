import React, { useEffect, useState } from "react";
import "../../css/eventcard_cart.css";
import CountdownDate from "../common/countdown";
import { Image } from "cloudinary-react";
import axios from "axios";

function EventCard_Cart(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [quantity, setQuantity] = useState(props.quantity);
  const [totalPrice, setTotalPrice] = useState(props.totalPrice);
  const [isSelected, setSelected] = useState(
    props.selectedCards.find((value) => value === props.order_id) ? true : false);
  const [isSelectedPrev, setSelectedPrev] = useState(false);
  const [seatCategories,] = useState(props.seatCategories);
  const [seatCategory, setseatCategory] = useState(seatCategories.find(val => val.seat_categ_id === parseInt(props.seat_categ_id)));

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



  const updateOrdersCart = async () => {
    //update the cart here //I donot need to update the seat info in the steat because we donot need it
    //in this cas like seat_categ_id and unite price 
    //this second arg is the new total price in this cart 
    props.updateCartQuantity(quantity, parseInt(quantity) * parseFloat(seatCategory.type_price));

    //update in data base here
    try {
      const response = await axios.put(
        `${apiUrl}/api/orders-cart/${props.order_id}`,
        {
          quantity: parseInt(quantity),
          total_price: parseInt(quantity) * parseFloat(seatCategory.type_price),
          seat_categ_id: parseInt(seatCategory.seat_categ_id),
        },
        { withCredentials: true, }
      );
      if (response) {
        // console.log(response.data);
      }

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    ///when the quantity or the seatCategory changed by the user
    //seatCategory will be update when update the id of seat when use make new change
    //update the totale price first
    setTotalPrice(parseInt(quantity) * parseFloat(seatCategory.type_price));
    //update the cart in state and database also
    updateOrdersCart();
  }, [seatCategory, quantity]);





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
                value={seatCategory.seat_categ_id}
                onChange={(e) => setseatCategory(seatCategories.find(val => val.seat_categ_id === parseInt(e.target.value)))}
              >
                {seatCategories.map((val) => (
                  <option key={val.seat_categ_id} value={val.seat_categ_id}>
                    {val.type_name} {val.type_price}MAD
                  </option>
                ))}
              </select>

            </div>
            <div className="quantity">
              <span
                className="decrement btn"
                title="Decrement"
                onClick={() => { quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1) }}
              >
                -
              </span>
              <span className="quantity-to-set">{quantity}</span>
              <span
                className="increment btn"
                title="Increment"
                onClick={() => { setQuantity(quantity + 1) }}
              >
                +
              </span>
            </div>
          </div>
          <div className="pricing">
            <div className="title-pricing">Total price</div>
            <div className="total-price">
              {totalPrice}
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
