import React from "react";
import "../../css/cartheader.css";

function CartHeader({ cartLength, selectedItemsLength, selectedItems, deleteFromCart, selectAll }) {
  let price = 0;
  if(selectedItems.length > 0) {
    price = selectedItems.reduce((acc, curr) => {
      return acc + curr;
    })
  }

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
            <span>{selectedItemsLength}/{cartLength} Items</span> selected
          </div>
          <div className="pay-selected-incart" title="Chek out">
            <div>
              Check out{" "}
              <span className="price-section">
                ( <span className="total-price">{price}</span>
                <span className="curr"> MAD</span> )
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartHeader;
