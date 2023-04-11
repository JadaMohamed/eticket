import React from "react";

const EarningRow = ({
  setWithdraw,
  setEventId,
  setProfit,
  id,
  title,
  profit,
  withdrawn,
  withdrawn_date,
  eventStart_data,
  trigerTheAlert,
}) => {

  const isReadyTowithraw = new Date(eventStart_data) < new Date(Date.now() - 48 * 60 * 60 * 1000);

  const handleWithdraw = () => {
    //check if the event start time has passed by 48h
    if ( isReadyTowithraw&& withdrawn === 0) {
      console.log('the event is already passed')
      setEventId(id);
      setProfit(profit)
      setWithdraw(true);
    } else {
      console.log("the event has not passed by 48h to withraw")
      trigerTheAlert("red", "the event has not passed by 48h to withdraw", "error");
    }
  };


  return (
    <tr>
      <td>{id}</td>
      <td style={{ maxWidth: "200px" }}>{title}</td>
      <td style={{ fontWeight: "600" }}>
        {profit ? profit : "00"}<span className="curr">MAD</span>
      </td>
      <td style={{ fontWeight: "600" }}>
        {withdrawn ? withdrawn : "00"}.00 <span className="curr">MAD</span>
      </td>
      <td>{withdrawn_date ? withdrawn_date : "-"}</td>
      <td style={{ maxWidth: "67px" }}>
        {withdrawn_date ? (
          "-"
        ) : (
          <span
            style={{
              fontSize: "13px",
              padding: "7px 15px",
                backgroundColor: isReadyTowithraw ? "#76F41F" : "var(--white)",
              borderRadius: "8px",
              color: "var(--Purple)",
              fontWeight: "500",
              cursor: "pointer",
              border: "1px solid var(--Purple)",
            }}
            onClick={() => {
              handleWithdraw();
            }}
          >
            withdraw
          </span>
        )}
      </td>
    </tr >
  );
};

export default EarningRow;
