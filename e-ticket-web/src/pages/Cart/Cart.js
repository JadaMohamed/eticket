import CartHeader from "../../components/cart/cartheader";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import ProductsHeader from "../../components/cart/productsheader";
import EventCard_Cart from "../../components/cart/eventcard_cart";
import "./Cart.css";
import AuthContext from "../../Auth/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import PaymentForm from "../../components/common/paymentform";
import Header from "../../components/common/Header";
import axios from "axios";


function Cart() {
  const { profile, isLoggedIn } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [Allcart, setAllCart] = useState([]);
  const [cart, setCart] = useState([]);
  const myRef = useRef(null);
  const [checkOut, setCheckOut] = useState(false);
  const [checkOutData, setCheckOutData] = useState();
  const [selectedCards, setSelectedCards] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  const getClientNonPaidOrders = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/orders-cart/not-paid/client/${profile.user.account_id}`,
        { withCredentials: true, }
      );
      if (response) {
        setCart(response.data);
        setAllCart(response.data);
      }
    } catch (error) {  
        console.error(error); 
    }
  };

  useEffect(() => {
    getClientNonPaidOrders();
    console.log('cart',cart)
  }, [profile])


 


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
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!cart) {
      return;
    }
    //chearch card
    setCart(
      Allcart.filter(
        (cart) =>
          cart.Event.location.toLowerCase().includes(keyword.toLowerCase()) ||
          cart.Event.event_type.toLowerCase().includes(keyword.toLowerCase()) ||
          cart.Event.title.toLowerCase().includes(keyword.toLowerCase())
        // cart.seatCategory.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [keyword]);

  return (
    <>
      <Navbar />
      <SubNavbar />
      {cart && <CartHeader
        keyword={keyword}
        setKeyword={setKeyword}
        cartLength={cart.length}
        selectedItemsLength={selectedCards.length}
        selectedItems={selectedCards}
        deleteFromCart={deleteFromCart}
        selectAll={selectAll}
        totalPrice={totalPrice}
        setCheckOut={setCheckOut}
        isLoggedIn={isLoggedIn}
      />}
      <div className="content-cart-page">
        <div className="content-cart-page-container">
          <div className="event-card-cart-table">
            {/* {cart.length > 0 ? <ProductsHeader /> : ""} */}

            {cart ? (
              cart.map((item) => {
                return (
                  <EventCard_Cart
                    key={item.order_id}
                    eventId={item.Event.event_id}
                    date={item.Event.start_time}
                    title={item.Event.title}
                    eventCategory={item.Event.event_type}
                    location={item.Event.location}
                    image={item.Event.Event_Images[0].img_url}
                    quantity={item.quantity}
                    // seatCategory={seatCategory}
                    totalPrice={item.total_price}
                    selectedCards={selectedCards}
                    setCardSelected={selectCard}
                    setCardUnSelected={unSelectCard}
                    totalPriceHandler={totalPriceHandler}
                  />
                );
              })
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
          ref={myRef}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Cart;
