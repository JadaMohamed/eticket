import react from "react";
import OrNavigationBar from "../components/navigation_bar";
import SideBar from "../components/side_bar";
import "../css/sales.css";

function Sales() {
  return (
    <div>
      <div>
        <div className="Route-who-i-m">Sales</div>
        <OrNavigationBar />
        <SideBar activeBtn="sales" />
      </div>
    </div>
  );
}

export default Sales;
