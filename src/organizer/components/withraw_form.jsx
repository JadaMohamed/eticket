import React, { useContext, useEffect, useRef, useState } from "react";
import "../../css/payment_form.css";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const WithrawForm = React.forwardRef(
  ({ setWithdraw, organizer, eventid }, ref) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [loader, setLoader] = useState(false);
    const { profile } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;
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
                        <td className="td">4100.00 MAD</td>
                      </tr>
                      <tr>
                        <td>Fees</td>
                        <td className="td">410.00 MAD</td>
                      </tr>
                      <tr>
                        <td>Net Amount</td>
                        <td className="td">3690.00 MAD</td>
                      </tr>
                    </table>
                  </div>
                  <div className="card-number row">
                    <div className="labled-input">
                      <label>Card Number</label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        //   ref={cardNumber}
                      />
                    </div>
                  </div>
                  <div className="row first-last">
                    <div className="labled-input">
                      <label>Card Owner</label>
                      <input
                        type="text"
                        placeholder="Michel Angelo"
                        //   ref={cardOwner}
                      />
                    </div>
                  </div>
                  <div className="row date">
                    <div className="labled-input">
                      <label>Expire date</label>
                      <select
                        className="small"
                        //  ref={expirationDay}
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
                  <div className="chekout btn">
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
