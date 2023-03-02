import React, { useState } from "react";
import "../../css/event_preview.css";

function EventPreview() {
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
    <div className="event-preview">
      <div className="event-preview-container">
        <div className="leftside">
          <div className="images">
            <div className="selected-image"></div>
            <div className="image-slider">
              <div className="image"></div>
              <div className="image"></div>
              <div className="image"></div>
            </div>
          </div>
          <div className="event-title">Title goes here</div>
          <div className="description">
            <div className="title">
              <span>Description</span>
              <span className="line"></span>
            </div>
            <div className="description-content">
              Lorem ipsum dolor sit amet consectetur. Eu vulputate lorem nunc
              cras. Amet morbi vehicula nibh interdum. Felis nulla ut proin
              malesuada eget nunc pellentesque. Id mauris massa dignissim
              blandit. Fringilla maecenas sapien auctor et cras urna eget.
              Turpis rhoncus congue arcu eget.
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="right-side-container">
            <div className="data-collector">
              <div className="label">Seat Category</div>
              <select name="seat-category" id="seat-category">
                <option value="bas">Basic 200MAD</option>
                <option value="vip">VIP 300MAD</option>
                <option value="bst">Back Stage 500MAD</option>
              </select>
            </div>
            <div className="quantity-collector">
              <div className="quantity">
                <div className="label">Quantity</div>
                <div className="quantity-selector">
                  <div className="inc btn" onClick={incrementQuantity}>
                    <span>+</span>
                  </div>
                  <div className="selected-quant">{quantity}</div>
                  <div className="decr btn" onClick={decrementQuantity}>
                    <span>-</span>
                  </div>
                </div>
              </div>
              <div className="quantity-statu">In Stock</div>
            </div>
            <div className="event-infos">
              <div className="local inf">
                <span className="material-symbols-outlined">location_on</span>
                <div className="data"> Event local adress</div>
              </div>
              <div className="date inf">
                <span className="material-symbols-outlined">hourglass_top</span>

                <div className="data">100 d 21 h 27 min 03 sec</div>
              </div>
            </div>
            <div className="total-price">
              <div className="label">Total Price:</div>
              <div className="calculated-price">
                200 <span>MAD</span>
              </div>
            </div>
            <di className="btns">
              <div className="add-tocart-btn btn"> Add to Cart</div>
              <div className="buy-now-btn btn"> Buy Now</div>
              <div className="instruction">
                <span class="material-symbols-outlined">lock</span>
                Secure transaction
              </div>
            </di>
            <div className="organizer">
              Organized by <span>OrganizerName</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventPreview;
