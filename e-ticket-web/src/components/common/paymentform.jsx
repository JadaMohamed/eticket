import React, { useContext, useEffect, useRef, useState } from "react";
import "../../css/payment_form.css";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";

const PaymentForm = React.forwardRef(({ setCheckOut, client, totalPriceCheckOut, checkedCarts }, ref) => {
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
  const [eventAndSeat_Ids, setEventAndSeat_Ids] = useState([])

  useEffect(() => {
    //checkedCarts contain all info of the carts that user selected
    console.log('checkedCarts', checkedCarts);

    //fill the eventAndSeat_Ids table when checkedCarts change
    // Create a new array with the event_id and seat_categ_id of each item in checkedCarts
    const eventAndSeatIds = checkedCarts.map(item => {
      console.log(item)
      return {
        event_id: item.Event.event_id,
        seat_categ_id: item.seat_categ_id
      }
    })
    // Set the state of the eventAndSeat_Ids variable
    setEventAndSeat_Ids(eventAndSeatIds)
  }, [checkedCarts])


  const cardNumber = useRef(null);
  const cardOwner = useRef(null);
  const cvc = useRef(null);
  const expirationYear = useRef(null);
  const expirationDay = useRef(null);

  const handelValidatePayment = async () => {
  
    const cardInfo = {
      cardNumber: cardNumber.current.value,
      cardOwner: cardOwner.current.value ,
      cvc: cvc.current.value,
      expirationYear: expirationYear.current.value ,
      expirationDay: expirationDay.current.value ,
    }
    //
    console.log(cardInfo)

    try {
      const response = await axios.post(
        `${apiUrl}/api/user/registerclient`,
        {

        },
        { withCredentials: true, }
      );

    } catch (error) {
      const errorData = error.response.data;
      if (errorData.errors) {
        // setErrors(errorData.errors);
      } else {
        console.error(error);
      }

    }
  }

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [])

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
                  <input type="text" placeholder="Card Number" ref={cardNumber} />
                </div>
              </div>
              <div className="row first-last">
                <div className="labled-input">
                  <label>Card Owner</label>
                  <input type="text" placeholder="Card Owner" ref={cardOwner} />
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
                  <input type="text" className="small" ref={cvc} />
                </div>
              </div>
            </div>
            <div className="sub-title">
              Payment information about you will be kept confidential.
            </div>
          </div>
        </div>
        <div className="side right">
          <div className="order-details det">
            <div className="title">Order details</div>
            <div className="rows">
              <table>
                <tbody>
                  <tr>
                    <td className="head">Order ID :</td>
                    <td>HEF7NEF6E</td>
                  </tr>
                  <tr>
                    <td className="head">Amount :</td>
                    <td>{totalPriceCheckOut} MAD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
                </tbody>
              </table>
            </div>
          </div>
          <div onClick={handelValidatePayment} className="btns">
            <div className="chekout btn">
              <span>Validate payment</span>
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
});

export default PaymentForm;
