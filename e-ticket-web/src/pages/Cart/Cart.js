import CartHeader from "../../components/cart/cartheader";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import ProductsHeader from "../../components/cart/productsheader";
import EventCard_Cart from "../../components/cart/eventcard_cart";
import "./Cart.css";

function Cart() {
  return (
    <>
      <Navbar active="cart" />
      <SubNavbar />
      <CartHeader />
      <div className="content-cart-page">
        <div className="content-cart-page-container">
          <ProductsHeader />
          <div className="event-card-cart-table">
            <EventCard_Cart
              date="2023-08-05T15:00:00"
              title="Marrakech Art Exhibition"
              eventCategory="Art | Culture"
              location="Marrakech"
            />
            <EventCard_Cart
              date="2023-08-05T15:00:00"
              title="Marrakech Art Exhibition"
              eventCategory="Art | Culture"
              location="Marrakech"
            />
            <EventCard_Cart
              date="2023-08-05T15:00:00"
              title="Marrakech Art Exhibition"
              eventCategory="Art | Culture"
              location="Marrakech"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
