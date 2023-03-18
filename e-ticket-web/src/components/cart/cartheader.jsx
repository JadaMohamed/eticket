import React, { useState } from "react";
import "../../css/cartheader.css";
import PaymentForm from "../common/paymentform";
import LoginPopup from "../common/loginpopup";

function CartHeader({
  cartLength,
  selectedItemsLength,
  selectedItems,
  deleteFromCart,
  selectAll,
  totalPrice,
  setCheckOut,
  isLoggedIn,
}) {
  const [login, setpoupLogin] = useState(false);
  const handleCheckOut = () => {
    if (isLoggedIn) {
      setCheckOut(true);
      return;
    }
    setpoupLogin(true);
  };
  return (
    <div className="cartheader">
      <div className="cartheader-container">
        <div className="cartheader-left">
          <div className="cart-search">
            <input type="text" placeholder="Search in this cart" />
            <span className="material-symbols-outlined btn" title="Search">
              search
            </span>
          </div>
          <div className="btn" title="Filter List">
            <span className="material-symbols-outlined">filter_list</span>
          </div>
          <div className="btn" title="Select All" onClick={selectAll}>
            <span className="material-symbols-outlined">select_all</span>
          </div>
          <div className="btn" title="Delete" onClick={deleteFromCart}>
            <span className="material-symbols-outlined">delete</span>
          </div>
        </div>
        <div className="cartheader-right">
          <div className="much-selected">
            <span>
              {selectedItemsLength}/{cartLength} Items
            </span>{" "}
            selected
          </div>
          <div
            className="pay-selected-incart"
            title="Check out"
            onClick={() => {
              handleCheckOut();
            }}
          >
            <div>
              Check out{" "}
              <span className="price-section">
                ( <span className="total-price">{totalPrice}</span>
                <span className="curr"> MAD</span> )
              </span>
            </div>
          </div>
        </div>
      </div>

      {login ? <LoginPopup setTrigger={setpoupLogin} /> : ""}
    </div>
  );
}

export default CartHeader;
