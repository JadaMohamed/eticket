import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Header /> */}
    <App />
    <div style={{ marginTop: "50px" }}></div>
    {/* <Footer /> */}
  </React.StrictMode>
);
