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
  //this is for the checkout
  const [totalPriceCheckOut, setTotalPriceCheckOut] = useState(0);


  const getClientNonPaidOrders = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/orders-cart/not-paid/client/${profile.user.client_id}`,
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
  }, [profile])





  useEffect(() => {
    const totalPriceCheckOut = cart.reduce((acc, curr) => acc + curr.total_price, 0);
    setTotalPriceCheckOut(totalPriceCheckOut);
  }, [cart]);


  const selectCard = (order_id) => {
    if (selectedCards.includes(order_id)) return;
    setSelectedCards((e) => [...e, order_id]);
  };

  const unSelectCard = (order_id) => {
    setSelectedCards((e) => selectedCards.filter((val) => val !== order_id));
  };

  useEffect(() => {
    console.log(selectedCards)
  }, [selectedCards])


  const deleteFromCart = async () => {
    console.log('trying to delete ..')
    const newCart = cart.filter(
      (item) => !selectedCards.includes(item.order_id)
    );
    setCart(newCart);
    setAllCart(newCart);
    console.log('selectedCards', selectedCards)

    //delete it in data base also
    try {
      const response = await axios.post(
        `${apiUrl}/api/orders-cart/delete-many`,
        { selectedCards },
        { withCredentials: true, },
      );
      if (response) {
        console.log(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectAll = () => {
    setSelectedCards(cart.map((val) => val.order_id));
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
        totalPriceCheckOut={totalPriceCheckOut}
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
                    order_id={item.order_id}
                    date={item.Event.start_time}
                    title={item.Event.title}
                    eventCategory={item.Event.event_type}
                    location={item.Event.location}
                    image={item.Event.Event_Images[0].img_url}
                    quantity={item.quantity}
                    seatCategories={item.Event.SeatCategory}
                    totalPrice={item.total_price}
                    selectedCards={selectedCards}
                    setCardSelected={selectCard}
                    setCardUnSelected={unSelectCard}
                    seat_categ_id={item.seat_categ_id}
                    totalPriceCheckOut={totalPriceCheckOut}
                    setTotalPriceCheckOut={setTotalPriceCheckOut}
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
          totalPriceCheckOut={totalPriceCheckOut}
          ref={myRef}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Cart;
