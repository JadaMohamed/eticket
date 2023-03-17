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
    console.log("cart : ",cart);
    const [selectedCards, setSelectedCards] = useState([]);

  const selectCard = (eventId) => {
    setSelectedCards(e => [...e, eventId]);
  }
  
  const unSelectCard = (eventId) => {
    setSelectedCards(e => selectedCards.filter(val => val != eventId));
  }

  const deleteFromCart = () => {
    const newCart = cart.filter((item) => !selectedCards.includes(item.eventId));
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setSelectedCards((prevSelectedCards) =>
    prevSelectedCards.filter((eventId) => !newCart.find((item) => item.eventId === eventId))
  );
  };

  const selectAll = () => {
    setSelectedCards(cart.map(val => val.eventId));
  }
  
  return (
    <>
      <Navbar active="cart" />
      <SubNavbar />
      <CartHeader cartLength={cart.length} selectedItemsLength={selectedCards.length} selectedItems={selectedCards} deleteFromCart={deleteFromCart} selectAll={selectAll}/>
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
                  totalPrice={item.totalPrice}
                  selectedCards={selectedCards}
                  setCardSelected={selectCard}
                  setCardUnSelected={unSelectCard}
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
