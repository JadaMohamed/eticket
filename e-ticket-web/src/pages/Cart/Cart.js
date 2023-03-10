import CartHeader from "../../components/cart/cartheader";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import ProductsHeader from "../../components/cart/productsheader";
import EventCard_Cart from "../../components/cart/eventcard_cart";
import "./Cart.css";
import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  return (
    <>
      <Navbar active="cart" />
      <SubNavbar />
      <CartHeader />
      <div className="content-cart-page">
        <div className="content-cart-page-container">
          <div className="event-card-cart-table">
            {/* {cart.length > 0 ? <ProductsHeader /> : ""} */}
            {cart.length > 0 ? (
              cart.map((item) => (
                <EventCard_Cart
                  eventId={item.eventId}
                  date={item.date}
                  title={item.title}
                  eventCategory={item.eventCategory}
                  location={item.address}
                  image={item.imagePublicId}
                  quantity={item.quantity}
                  seatCategory={item.seatCategory}
                />
              ))
            ) : (
              <div className="empty-cart">Nothing to show</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
