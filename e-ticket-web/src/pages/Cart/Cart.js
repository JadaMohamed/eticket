import CartHeader from "../../components/cart/cartheader";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import ProductsHeader from "../../components/cart/productsheader";
import EventCard_Cart from "../../components/cart/eventcard_cart";
import "./Cart.css";
import AuthContext from "../../Auth/AuthContext";
import { useContext, useRef, useState } from "react";
import PaymentForm from "../../components/common/paymentform";

function Cart() {
  const { profile, isLoggedIn } = useContext(AuthContext);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  console.log("cart ", cart);
  const [checkOut, setCheckOut] = useState(false);
  const [checkOutData, setCheckOutData] = useState();
  const [selectedCards, setSelectedCards] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const totalPriceHandler = (old, newP) => {
    if (isNaN(newP) || isNaN(old)) return;
    setTotalPrice((prev) => prev - old + newP);
  };
  const selectCard = (eventId) => {
    if (selectedCards.includes(eventId)) return;
    setSelectedCards((e) => [...e, eventId]);
  };

  const unSelectCard = (eventId) => {
    setSelectedCards((e) => selectedCards.filter((val) => val != eventId));
  };

  const deleteFromCart = () => {
    const newCart = cart.filter(
      (item) => !selectedCards.includes(item.eventId)
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setSelectedCards((prevSelectedCards) =>
      prevSelectedCards.filter(
        (eventId) => !newCart.find((item) => item.eventId === eventId)
      )
    );
  };

  const selectAll = () => {
    setSelectedCards(cart.map((val) => val.eventId));
  };

  return (
    <>
      <Navbar active="cart" />
      <SubNavbar />
      <CartHeader
        cartLength={cart.length}
        selectedItemsLength={selectedCards.length}
        selectedItems={selectedCards}
        deleteFromCart={deleteFromCart}
        selectAll={selectAll}
        totalPrice={totalPrice}
        setCheckOut={setCheckOut}
      />
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
                  totalPrice={totalPrice}
                  selectedCards={selectedCards}
                  setCardSelected={selectCard}
                  setCardUnSelected={unSelectCard}
                  totalPriceHandler={totalPriceHandler}
                />
              ))
            ) : (
              <div className="empty-cart">Nothing to show</div>
            )}
          </div>
        </div>
      </div>
      {checkOut ? (
        <PaymentForm
          setCheckOut={setCheckOut}
          client={profile}
          totalPrice={totalPrice}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Cart;
