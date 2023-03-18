import React, { useEffect } from "react";
import "../../css/payment_form.css";
const PaymentForm = React.forwardRef(({ setCheckOut, client, totalPrice }, ref) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 20; i++) {
    years.push(currentYear + i);
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
                  <input type="text" placeholder="Card Number" />
                </div>
              </div>
              <div className="row first-last">
                <div className="labled-input">
                  <label>Card Owner</label>
                  <input type="text" placeholder="Card Owner" />
                </div>
              </div>
              <div className="row date">
                <div className="labled-input">
                  <label>Expire date</label>
                  <select className="small">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <select className="small">
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
                  <input type="text" className="small" />
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
                <tr>
                  <td className="head">Order ID :</td>
                  <td>HEF7NEF6E</td>
                </tr>
                <tr>
                  <td className="head">Amount :</td>
                  <td>{totalPrice} MAD</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="client-details det">
            <div className="title">Order details</div>
            <div className="rows">
              <table>
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
              </table>
            </div>
          </div>
          <div className="btns">
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
