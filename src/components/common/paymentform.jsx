import React, { useContext, useEffect, useRef, useState } from "react";
import "../../css/payment_form.css";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const PaymentForm = React.forwardRef(
  ({ setCheckOut, client, totalPriceCheckOut, checkedCarts }, ref) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { profile } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;
    const currentYear = new Date().getFullYear();
    const years = [];
    const days = [];
    for (let i = 0; i < 20; i++) {
      years.push(currentYear + i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }

    //this table will containe eventid and seat categorieid from each checkedCarts
    const [eventAndSeat_Ids, setEventAndSeat_Ids] = useState([]);

    //to check if the client already send data for payment
    const [isSendPayment, setIsSendPayment] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
      //checkedCarts contain all info of the carts that user selected
      // console.log('checkedCarts', checkedCarts);

      //fill the eventAndSeat_Ids table when checkedCarts change
      // Create a new array with the event_id and seat_categ_id of each item in checkedCarts
      const eventAndSeatIds = checkedCarts.map((item) => {
        // console.log(item)
        return {
          event_id: item.Event.event_id,
          seat_categ_id: item.seat_categ_id,
          orgId: item.org_id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        };
      });
      // Set the state of the eventAndSeat_Ids variable
      setEventAndSeat_Ids(eventAndSeatIds);
      // console.log(checkedCarts)
    }, [checkedCarts]);

    //card information
    const cardNumber = useRef(null);
    const cardOwner = useRef(null);
    const cvc = useRef(null);
    const expirationYear = useRef(null);
    const expirationDay = useRef(null);

    //this function will check if a string contanis only digits
    function isStringOfDigits(str) {
      const regex = /^\d+$/;
      return regex.test(str);
    }

    const validaPaymentData = () => {
      //validate card number
      if (eventAndSeat_Ids.length === 0) {
        setErrorMsg("Please select an item from your cart");
        setLoader(false);
        return false;
      }
      if (!cardNumber.current.value) {
        setErrorMsg("Please enter a card number");
        setLoader(false);
        return false;
      }
      if (!isStringOfDigits(cardNumber.current.value)) {
        setErrorMsg("card number should containe only digits");
        setLoader(false);
        return false;
      }
      if (cardNumber.current.value.trim().length !== 16) {
        setErrorMsg("card number should containe 16 digit");
        setLoader(false);
        return false;
      }

      //validate card owner
      if (cardOwner.current.value.trim().length < 2) {
        setErrorMsg("Please enter Owner Name");
        setLoader(false);
        return false;
      }

      //validate cvc
      if (!cvc.current.value) {
        setErrorMsg("Please enter the CVC");
        setLoader(false);
        return false;
      }
      if (!isStringOfDigits(cvc.current.value)) {
        setErrorMsg("CVC should containe only digits");
        setLoader(false);
        return false;
      }
      if (cvc.current.value.length !== 3) {
        setErrorMsg(" CVC should containe 3 digit");
        setLoader(false);
        return false;
      }

      return true;
    };

    const handelValidatePayment = async () => {
      setLoader(true);
      if (isSendPayment) {
        return;
        setLoader(false);
      }
      const isValid = validaPaymentData();
      if (!isValid) {
        return;
        setLoader(false);
      }

      //creating object to hold card info
      const cardInfo = {
        cardNumber: cardNumber.current.value,
        cardOwner: cardOwner.current.value,
        cvc: cvc.current.value,
        expirationYear: expirationYear.current.value,
        expirationDay: expirationDay.current.value,
      };
      //
      // console.log(cardInfo)
      // console.log(eventAndSeat_Ids)

      try {
        setIsSendPayment(true);
        setErrorMsg("");
        const response = await axios.post(
          `${apiUrl}/api/orders-cart/pay-orders/${profile.user.client_id}`,
          { totalPriceCheckOut, cardInfo, eventAndSeat_Ids },
          { withCredentials: true }
        );

        if (response) {
          setLoader(false);
          console.log(response.data);

          navigate("/mytickets");
        }
      } catch (error) {
        const errorData = error.response.data;
        if (errorData.error) {
          setErrorMsg(errorData.error);
          // console.log(errorData.error);
        } else {
          console.error(error);
        }
        setIsSendPayment(false);
        setLoader(false);
      }
    };

    useEffect(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
      <div className="payment" ref={ref}>
        <div className="payment-container">
          <div className="side">
            <div className="payment-details">
              <div className="title-date">
                <div className="title">Payment details</div>
                <div className="date">{Date()}</div>
              </div>
              <div className="det-container">
                <div className="card-number row">
                  <div className="labled-input">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      ref={cardNumber}
                    />
                  </div>
                </div>
                <div className="row first-last">
                  <div className="labled-input">
                    <label>Card Owner</label>
                    <input
                      type="text"
                      placeholder="Michel Angelo"
                      ref={cardOwner}
                    />
                  </div>
                </div>
                <div className="row date">
                  <div className="labled-input">
                    <label>Expire date</label>
                    <select className="small" ref={expirationDay}>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select className="small" ref={expirationYear}>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row cvc">
                  <div className="labled-input">
                    <label>CVC</label>
                    <input
                      type="text"
                      className="small"
                      ref={cvc}
                      placeholder="000"
                    />
                  </div>
                </div>
                <div>
                  <span style={{ color: "red" }}>{errorMsg}</span>
                </div>
              </div>
              <div className="sub-title">
                Payment information about you will be kept confidential.
              </div>
            </div>
          </div>
          <div className="side right">
            <div className="client-details det">
              <div className="title">Order details</div>
              <div className="rows">
                <table>
                  <tbody>
                    <tr>
                      <td className="head">Name :</td>
                      <td>
                        {client.account.first_name} {client.account.last_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="head">Email :</td>
                      <td>{client.account.email}</td>
                    </tr>
                    <tr>
                      <td className="head">Phone :</td>
                      <td>{client.account.phone_number}</td>
                    </tr>
                    <tr>
                      <td className="head">Amount :</td>
                      <td>{totalPriceCheckOut} MAD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div onClick={handelValidatePayment} className="btns">
              <div className="chekout btn">
                <span>{loader ? "Loading" : "Validate payment"}</span>
              </div>
              <div
                className="cancel btn"
                onClick={() => {
                  setCheckOut(false);
                }}
              >
                <span>Cancel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default PaymentForm;
