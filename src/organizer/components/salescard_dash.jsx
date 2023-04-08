import react from "react";
import "../css/salescard_dash.css";

function SalesCardDash(props) {
  const reached = ((props.sales * 100) / props.totalSeats).toFixed(1);
  return (
    <div className="SalesCardDash">
      <div className="SalesCardDash-container">
        <div className="counted-sales">
          <div className="total">
            <div className="sales">{props.sales}</div>
            <div className="of">/{props.totalSeats}</div>
          </div>
          <span className="material-symbols-outlined">toll</span>
        </div>
        <div className="label">All Time Sales</div>
        <div className="progress-bar">
          <div className="counting">
            <div>0%</div>
            <div className="reached">{isNaN(reached) ? 0 : reached}%</div>
          </div>
          <div className="bar">
            <div
              className="progress"
              style={{ width: ` ${isNaN(reached) ? 0 : reached}% ` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesCardDash;
