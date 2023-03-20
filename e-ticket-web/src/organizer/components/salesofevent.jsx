import react from "react";
import "../css/salesofevent.css";

function SalesCard(props) {
  const reached = ((props.sales * 100) / props.totalSeats).toFixed(1);
  return (
    <div className="SalesCard">
      <div className="SalesCard-container">
        <div className="counted-sales">
          <div className="total">
            <div className="sales">{props.sales}</div>
            <div className="of">/{props.totalSeats}</div>
          </div>
          <span className="material-symbols-outlined">sell</span>
        </div>
        <div className="label">
          <span>Total Sales</span>
          <span className="more-details">See more details</span>
        </div>
        <div className="progress-bar">
          <div className="counting">
            <div>0%</div>
            <div className="reached">{reached}%</div>
          </div>
          <div className="bar">
            <div className="progress" style={{ width: ` ${reached}% ` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesCard;
