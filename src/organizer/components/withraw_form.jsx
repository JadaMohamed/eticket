import React, { useContext, useEffect, useRef, useState } from "react";
import "../../css/payment_form.css";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const WithrawForm = React.forwardRef(
  ({ setWithdraw, organizer, eventId, profit, fetchAllOrganizerEventProfits }, ref) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [loader, setLoader] = useState(false);
    const { profile } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isSendWithraw, setIsSendWithraw] = useState(false);



    //card information
    const cardNumber = useRef(null);
    const cardOwner = useRef(null);
    const cvc = useRef(null);
    const expirationYear = useRef(null);
    const expirationDay = useRef(null);

    const currentYear = new Date().getFullYear();
    const years = [];
    const days = [];
    for (let i = 0; i < 20; i++) {
      years.push(currentYear + i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }

    //this function will check if a string contanis only digits
    function isStringOfDigits(str) {
      const regex = /^\d+$/;
      return regex.test(str);
    }


    const valideWithdrawData = () => {
      //validate card number
      // if (eventAndSeat_Ids.length === 0) {
      //   setErrorMsg("Please select an item from your cart");
      //   setLoader(false);
      //   return false;
      // }
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

    const handelWithdraw = async () => {
      setLoader(true);
      if (isSendWithraw) {
        return;
        // setLoader(false);
      }

      //set the data for the test now
      cardNumber.current.value = "6666555544443333";
      cardOwner.current.value = "AYOUB ELOUAIZI";
      cvc.current.value = "123";
      expirationYear.current.value = 2024;
      expirationDay.current.value = 31;

      const isValid = valideWithdrawData();
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
      const eventProfitData = {
        withdrawnAt: new Date().toISOString(),
        withdrawn: profit,
      }
      console.log(cardInfo)
      console.log(eventProfitData)

      try {
        setIsSendWithraw(true);
        setErrorMsg("");
        const response = await axios.post(
          `${apiUrl}/api/event-profit/withraw/${eventId}`,
          { eventProfitData, cardInfo },
          { withCredentials: true }
        );

        if (response) {
          setLoader(false);
          console.log(response.data);
          fetchAllOrganizerEventProfits();
          setWithdraw(false);
        }
      } catch (error) {
        const errorData = error.response.data;
        if (errorData.error) {
          setErrorMsg(errorData.error);
          // console.log(errorData.error);
        } else {
          console.error(error);
        }
        setIsSendWithraw(false);
        setLoader(false);
      }
    };

    return (
      <div className="withdraw">
        <div
          className="payment "
          ref={ref}
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <div className="payment-container">
            <div className="side">
              <div className="payment-details">
                <div className="title-date">
                  <div className="title">Withdraw details</div>
                  <div className="date">{Date()}</div>
                </div>
                <div className="det-container">
                  <div className="withdraw-amount">
                    <table
                      style={{
                        fontWeight: "500",
                        textAlign: "center !important",
                      }}
                    >
                      <tr style={{ padding: "10px !important" }}>
                        <td>Amount</td>
                        <td className="td">{profit} MAD</td>
                      </tr>
                      <tr>
                        <td>Fees</td>
                        <td className="td">{profit / 10} MAD</td>
                      </tr>
                      <tr>
                        <td>Net Amount</td>
                        <td className="td">{profit - profit / 10} MAD</td>
                      </tr>
                    </table>
                  </div>
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
                      <select
                        className="small"
                        ref={expirationDay}
                      >
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
                  </div>

                  <div>
                    <span style={{ color: "red" }}>{errorMsg}</span>
                  </div>
                </div>
                <div className="sub-title">
                  Withdraw information about you will be kept confidential.
                </div>
                <div className="btns">
                  <div className="chekout btn"
                    onClick={() => {
                      handelWithdraw();
                    }}
                  >
                    <span>{loader ? "loading" : "Withdraw"}</span>
                  </div>
                  <div
                    className="cancel btn"
                    onClick={() => {
                      setWithdraw(false);
                    }}
                  >
                    <span>Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default WithrawForm;
