import React from "react";

const EarningRow = ({
  setWithdraw,
  setEventId,
  id,
  title,
  profit,
  withdrawn,
  withdrawn_date,
}) => {
  const handleWithdraw = () => {
    // setEventId(id);
    setWithdraw(true);
  };
  // console.log("setWithdraw:", setWithdraw);
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
              backgroundColor: "var(--White)",
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
    </tr>
  );
};

export default EarningRow;
