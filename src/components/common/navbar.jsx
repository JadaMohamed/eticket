import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./Modals/Login";
import AuthContext from "../../Auth/AuthContext";
import { Image } from "cloudinary-react";
import SignUpNav from "./Modals/SignUp";
import Alert from "./alert";
import BuyerSignUp from "./Modals/BuyerSignUp";

function Navbar(props) {
  const { profile, isLoggedIn } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [popupLogin, setpoupLogin] = useState(false);
  const [popupSignUp, setpopupSignup] = useState(false);
  const [popupSignUpClient, setpopupSignUpClient] = useState(false);
  const cart = JSON.parse(localStorage.getItem("cart"));
  const initialNumCartProducts = cart?.length ?? 0;

  const [numcartproducts, setNumcartproducts] = useState(
    initialNumCartProducts
  );
  const Nav = useNavigate();
  let menuRef = useRef();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setNumcartproducts(cart.length);
    }
  }, [localStorage.getItem("cart")]);
  const handleSearch = () => {
    Nav(`/search/${keyword}`, { replace: true });
  };
  const logoutSubmit = async (event) => {
    logout();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  const [alert, setAlert] = useState(false);
  const [alertParams, setAlertParams] = useState({
    color: "",
    msg: "",
    icon: "",
  });
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  return (
    <nav className="nav | bg-white fixed w-full top-0 z-[9999] border-b border-accent-50">
      <div className="nav-container | m-auto py-3 px-12 flex justify-between items-center w-full">
        <Alert
          color={alertParams.color}
          msg={alertParams.msg}
          icon={alertParams.icon}
          setAlert={setAlert}
          alert={alert}
        />
        <a className="" onClick={() => Nav("/home", { replace: true })}>
          <svg
            width="116"
            height="30"
            viewBox="0 0 116 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_371_9)">
              <path
                d="M25.1613 2.48507V27.5037C25.1613 28.8806 24.048 29.9888 22.6897 29.9888H20.296C17.2121 29.9888 17.2566 29.2052 16.032 27.6381C14.8964 26.1828 12.8812 26.25 12.614 26.2612C12.6029 26.2612 12.6029 26.2612 12.6029 26.2612H12.5918C12.3246 26.25 10.3094 26.1716 9.17385 27.6381C7.94919 29.2052 8.00485 29.9888 4.90979 29.9888H2.4716C1.11333 30 0 28.8806 0 27.5149V2.48507C0 1.1194 1.11333 0 2.4716 0H4.89866C7.98259 0 7.93805 0.783582 9.16272 2.35075C10.2983 3.80597 12.3134 3.73881 12.5806 3.72761H12.5918H12.6029C12.8701 3.73881 14.8852 3.81716 16.0208 2.35075C17.2455 0.783582 17.1898 0 20.2849 0H22.6786C24.048 0 25.1613 1.1194 25.1613 2.48507Z"
                fill="#552E88"
              />
              <path
                d="M17.9803 10.1865H7.29231C6.40164 10.1865 5.67798 9.45884 5.67798 8.56332C5.67798 7.6678 6.40164 6.94019 7.29231 6.94019H17.9803C18.871 6.94019 19.5946 7.6678 19.5946 8.56332C19.5946 9.45884 18.871 10.1865 17.9803 10.1865Z"
                fill="#EFE4FC"
              />
              <path
                d="M17.9803 23.0597H7.29231C6.40164 23.0597 5.67798 22.3321 5.67798 21.4366C5.67798 20.5411 6.40164 19.8135 7.29231 19.8135H17.9803C18.871 19.8135 19.5946 20.5411 19.5946 21.4366C19.5946 22.3321 18.871 23.0597 17.9803 23.0597Z"
                fill="#EFE4FC"
              />
              <path
                d="M20.4297 16.6791H17.4237C16.533 16.6791 15.8093 15.9515 15.8093 15.056C15.8093 14.1605 16.533 13.4329 17.4237 13.4329H20.4297C21.3203 13.4329 22.044 14.1605 22.044 15.056C22.044 15.9515 21.3203 16.6791 20.4297 16.6791Z"
                fill="#9982B8"
              />
              <path
                d="M12.1911 16.6791H4.73176C3.8411 16.6791 3.11743 15.9515 3.11743 15.056C3.11743 14.1605 3.8411 13.4329 4.73176 13.4329H12.1911C13.0817 13.4329 13.8054 14.1605 13.8054 15.056C13.8054 15.9515 13.0817 16.6791 12.1911 16.6791Z"
                fill="#9982B8"
              />
            </g>
            <path
              d="M37.808 24C37.472 24 37.16 23.92 36.872 23.76C36.584 23.584 36.44 23.328 36.44 22.992V7.464C36.44 7.128 36.584 6.88 36.872 6.72C37.16 6.544 37.472 6.456 37.808 6.456H46.352C46.704 6.456 46.952 6.6 47.096 6.888C47.256 7.176 47.336 7.48 47.336 7.8C47.336 8.184 47.248 8.512 47.072 8.784C46.912 9.056 46.672 9.192 46.352 9.192H39.56V13.992H43.208C43.528 13.992 43.768 14.12 43.928 14.376C44.104 14.616 44.192 14.904 44.192 15.24C44.192 15.512 44.112 15.784 43.952 16.056C43.808 16.312 43.56 16.44 43.208 16.44H39.56V21.264H46.352C46.672 21.264 46.912 21.4 47.072 21.672C47.248 21.944 47.336 22.272 47.336 22.656C47.336 22.976 47.256 23.28 47.096 23.568C46.952 23.856 46.704 24 46.352 24H37.808ZM49.0115 19.512C48.7235 19.512 48.4835 19.392 48.2915 19.152C48.1155 18.912 48.0275 18.608 48.0275 18.24C48.0275 17.872 48.1155 17.568 48.2915 17.328C48.4835 17.072 48.7235 16.944 49.0115 16.944H55.2515C55.4915 16.944 55.7155 17.072 55.9235 17.328C56.1315 17.568 56.2355 17.872 56.2355 18.24C56.2355 18.608 56.1315 18.912 55.9235 19.152C55.7155 19.392 55.4915 19.512 55.2515 19.512H49.0115ZM62.1005 24C61.7005 24 61.3405 23.92 61.0205 23.76C60.7005 23.584 60.5405 23.328 60.5405 22.992V9.264H57.0125C56.7085 9.264 56.4685 9.12 56.2925 8.832C56.1165 8.544 56.0285 8.216 56.0285 7.848C56.0285 7.512 56.1085 7.2 56.2685 6.912C56.4285 6.608 56.6765 6.456 57.0125 6.456H67.1645C67.5165 6.456 67.7645 6.608 67.9085 6.912C68.0685 7.2 68.1485 7.512 68.1485 7.848C68.1485 8.216 68.0605 8.544 67.8845 8.832C67.7245 9.12 67.4845 9.264 67.1645 9.264H63.6605V22.992C63.6605 23.328 63.4925 23.584 63.1565 23.76C62.8365 23.92 62.4845 24 62.1005 24ZM71.0407 10.056C70.5767 10.056 70.1767 9.904 69.8407 9.6C69.5047 9.28 69.3367 8.928 69.3367 8.544C69.3367 8.128 69.5047 7.776 69.8407 7.488C70.1767 7.184 70.5767 7.032 71.0407 7.032C71.5207 7.032 71.9207 7.184 72.2407 7.488C72.5607 7.776 72.7207 8.128 72.7207 8.544C72.7207 8.928 72.5607 9.28 72.2407 9.6C71.9207 9.904 71.5207 10.056 71.0407 10.056ZM71.0407 24C70.5927 24 70.2247 23.896 69.9367 23.688C69.6487 23.48 69.5047 23.248 69.5047 22.992V13.56C69.5047 13.272 69.6487 13.04 69.9367 12.864C70.2247 12.688 70.5927 12.6 71.0407 12.6C71.4727 12.6 71.8407 12.688 72.1447 12.864C72.4487 13.04 72.6007 13.272 72.6007 13.56V22.992C72.6007 23.248 72.4487 23.48 72.1447 23.688C71.8407 23.896 71.4727 24 71.0407 24ZM79.7896 24.216C78.5736 24.216 77.5816 24 76.8136 23.568C76.0456 23.136 75.4776 22.552 75.1096 21.816C74.7416 21.064 74.5576 20.224 74.5576 19.296V17.376C74.5576 16.448 74.7336 15.616 75.0856 14.88C75.4536 14.128 76.0216 13.536 76.7896 13.104C77.5736 12.672 78.5576 12.456 79.7416 12.456C80.4936 12.456 81.1576 12.544 81.7336 12.72C82.3096 12.896 82.7656 13.128 83.1016 13.416C83.4376 13.704 83.6056 14.008 83.6056 14.328C83.6056 14.52 83.5496 14.736 83.4376 14.976C83.3416 15.2 83.1976 15.4 83.0056 15.576C82.8296 15.752 82.6216 15.84 82.3816 15.84C82.2056 15.84 82.0216 15.784 81.8296 15.672C81.6536 15.56 81.4216 15.448 81.1336 15.336C80.8456 15.224 80.4616 15.168 79.9816 15.168C79.1656 15.168 78.5736 15.368 78.2056 15.768C77.8376 16.152 77.6536 16.688 77.6536 17.376V19.296C77.6536 19.984 77.8376 20.528 78.2056 20.928C78.5736 21.312 79.1736 21.504 80.0056 21.504C80.5016 21.504 80.8856 21.44 81.1576 21.312C81.4296 21.184 81.6536 21.064 81.8296 20.952C82.0216 20.84 82.2136 20.784 82.4056 20.784C82.6936 20.784 82.9336 20.864 83.1256 21.024C83.3336 21.184 83.4856 21.384 83.5816 21.624C83.6936 21.848 83.7496 22.056 83.7496 22.248C83.7496 22.568 83.5736 22.88 83.2216 23.184C82.8856 23.488 82.4136 23.736 81.8056 23.928C81.2136 24.12 80.5416 24.216 79.7896 24.216ZM86.8844 24C86.4524 24 86.0924 23.896 85.8044 23.688C85.5164 23.48 85.3724 23.248 85.3724 22.992V6.912C85.3724 6.624 85.5164 6.392 85.8044 6.216C86.0924 6.04 86.4524 5.952 86.8844 5.952C87.3324 5.952 87.7084 6.04 88.0124 6.216C88.3164 6.392 88.4684 6.624 88.4684 6.912V16.968L93.0044 12.72C93.1644 12.56 93.3644 12.48 93.6044 12.48C93.8444 12.48 94.0764 12.56 94.3004 12.72C94.5404 12.864 94.7324 13.048 94.8764 13.272C95.0364 13.496 95.1164 13.728 95.1164 13.968C95.1164 14.064 95.0924 14.168 95.0444 14.28C95.0124 14.376 94.9484 14.464 94.8524 14.544L92.0204 17.112L95.5724 22.152C95.6844 22.328 95.7404 22.496 95.7404 22.656C95.7404 22.896 95.6444 23.136 95.4524 23.376C95.2604 23.616 95.0284 23.816 94.7564 23.976C94.4844 24.12 94.2204 24.192 93.9644 24.192C93.6444 24.192 93.3884 24.056 93.1964 23.784L89.9804 19.032L88.4684 20.376V22.992C88.4684 23.248 88.3164 23.48 88.0124 23.688C87.7084 23.896 87.3324 24 86.8844 24ZM102.373 24.216C101.237 24.216 100.229 24.016 99.3489 23.616C98.4849 23.2 97.8049 22.624 97.3089 21.888C96.8129 21.136 96.5649 20.272 96.5649 19.296V17.256C96.5649 16.392 96.7969 15.6 97.2609 14.88C97.7409 14.144 98.3729 13.56 99.1569 13.128C99.9569 12.68 100.845 12.456 101.821 12.456C102.717 12.456 103.533 12.648 104.269 13.032C105.021 13.416 105.629 13.944 106.093 14.616C106.557 15.288 106.789 16.072 106.789 16.968C106.789 17.656 106.677 18.152 106.453 18.456C106.229 18.744 105.941 18.928 105.589 19.008C105.253 19.072 104.901 19.104 104.533 19.104H99.6609V19.464C99.6609 20.152 99.9169 20.712 100.429 21.144C100.957 21.56 101.637 21.768 102.469 21.768C102.997 21.768 103.437 21.688 103.789 21.528C104.141 21.368 104.445 21.216 104.701 21.072C104.957 20.928 105.197 20.856 105.421 20.856C105.661 20.856 105.869 20.936 106.045 21.096C106.221 21.256 106.357 21.448 106.453 21.672C106.549 21.88 106.597 22.064 106.597 22.224C106.597 22.496 106.421 22.792 106.069 23.112C105.733 23.416 105.245 23.68 104.605 23.904C103.981 24.112 103.237 24.216 102.373 24.216ZM99.6609 17.28H103.165C103.437 17.28 103.621 17.24 103.717 17.16C103.829 17.064 103.885 16.888 103.885 16.632C103.885 16.264 103.781 15.936 103.573 15.648C103.381 15.36 103.125 15.136 102.805 14.976C102.501 14.816 102.157 14.736 101.773 14.736C101.405 14.736 101.061 14.816 100.741 14.976C100.421 15.12 100.157 15.336 99.9489 15.624C99.7569 15.896 99.6609 16.224 99.6609 16.608V17.28ZM113.037 24C111.597 24 110.493 23.688 109.725 23.064C108.973 22.44 108.597 21.448 108.597 20.088V8.472C108.597 8.184 108.765 7.952 109.101 7.776C109.437 7.6 109.781 7.512 110.133 7.512C110.517 7.512 110.869 7.6 111.189 7.776C111.525 7.952 111.693 8.184 111.693 8.472V12.6H114.525C114.781 12.6 114.973 12.72 115.101 12.96C115.245 13.184 115.317 13.44 115.317 13.728C115.317 14.016 115.245 14.28 115.101 14.52C114.973 14.744 114.781 14.856 114.525 14.856H111.693V20.088C111.693 20.568 111.789 20.904 111.981 21.096C112.189 21.288 112.541 21.384 113.037 21.384H113.973C114.421 21.384 114.749 21.52 114.957 21.792C115.181 22.064 115.293 22.36 115.293 22.68C115.293 23.016 115.181 23.32 114.957 23.592C114.749 23.864 114.421 24 113.973 24H113.037Z"
              fill="#552E88"
            />
            <defs>
              <clipPath id="clip0_371_9">
                <rect width="25.1613" height="30" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </a>
        <div>
          <div className="flex items-center rounded-full border border-accent-50 overflow-hidden bg-[#fafafa]">
            <input
              className="px-5 focus-within:outline-purple-500 rounded-s-full py-1 font-medium placeholder:text-accent-200"
              type="text"
              id="search"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div
              onClick={handleSearch}
              className="px-3 py-1 cursor-pointer"
              title="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  className="stroke-accent-500"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="">
            <div className="flex items-center gap-2">
              <div
                onClick={() => Nav("/home", { replace: true })}
                className="home-mobile btn flex flex-col items-center p-2 duration-300 ease-in hover:cursor-pointer rounded-full hover:bg-secondary-50"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 17H16M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
                    className="stroke-accent-600"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div
                onClick={() => Nav("/cart", { replace: true })}
                className={`btn flex flex-col items-center p-2 duration-300 ease-in hover:cursor-pointer rounded-full hover:bg-secondary-50 crt | relative ${
                  props.active === "cart" ? "active" : ""
                }`}
                id="cart"
                title="Cart"
              >
                {numcartproducts ? (
                  <div className="nbprd | bg-red-700 text-white border border-white text-xs absolute p-1 rounded-full top-[-2px] right-[-1px]">
                    {" "}
                    {numcartproducts}{" "}
                  </div>
                ) : (
                  ""
                )}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.9996 8C15.9996 9.06087 15.5782 10.0783 14.828 10.8284C14.0779 11.5786 13.0605 12 11.9996 12C10.9387 12 9.92131 11.5786 9.17116 10.8284C8.42102 10.0783 7.99959 9.06087 7.99959 8M3.63281 7.40138L2.93281 15.8014C2.78243 17.6059 2.70724 18.5082 3.01227 19.2042C3.28027 19.8157 3.74462 20.3204 4.33177 20.6382C5.00006 21 5.90545 21 7.71623 21H16.283C18.0937 21 18.9991 21 19.6674 20.6382C20.2546 20.3204 20.7189 19.8157 20.9869 19.2042C21.2919 18.5082 21.2167 17.6059 21.0664 15.8014L20.3664 7.40138C20.237 5.84875 20.1723 5.07243 19.8285 4.48486C19.5257 3.96744 19.0748 3.5526 18.5341 3.29385C17.92 3 17.141 3 15.583 3L8.41623 3C6.85821 3 6.07921 3 5.4651 3.29384C4.92433 3.5526 4.47349 3.96744 4.17071 4.48486C3.82689 5.07243 3.76219 5.84875 3.63281 7.40138Z"
                    className="stroke-accent-600"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div
                onClick={() => Nav("/mytickets", { replace: true })}
                className={`btn flex flex-col items-center p-2 duration-300 ease-in hover:cursor-pointer rounded-full hover:bg-secondary-50 ${
                  props.active === "mytickets" ? "active" : ""
                }`}
                id="mytickets"
                title="My Tickets"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V21L17.25 19L14.75 21L12 19L9.25 21L6.75 19L4 21V7.8Z"
                    className="stroke-accent-600"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              {isLoggedIn ? (
                <div
                  className="btn flex flex-col items-center p-2 duration-300 ease-in hover:cursor-pointer rounded-full hover:bg-secondary-50 menu-trigger user-infos"
                  onClick={() => {
                    setOpen(!open);
                  }}
                  id="me"
                  title={`${profile?.account?.first_name} ${profile?.account?.last_name}`}
                  ref={menuRef}
                >
                  <div className="user-infos-container">
                    <div className="avatar">
                      <Image
                        className="w-7 h-7 aspect-square flex rounded-full"
                        cloudName="djjwswdo4"
                        publicId={profile?.account?.avatar}
                      />
                    </div>
                    <div className="right-side"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => {
                      setOpen(!open);
                    }}
                    className="btn flex flex-col items-center p-2 duration-300 ease-in hover:cursor-pointer rounded-full hover:bg-secondary-50 menu-trigger"
                    id="me"
                    title="Me"
                    ref={menuRef}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                        className="stroke-accent-600"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </div>
          {isLoggedIn ? (
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              <div className="px-3">
                <div className="">
                  <div className="text-accent-400 mb-2 text-sm ">Account</div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Image
                        className="w-7 h-7 aspect-square flex rounded-full"
                        cloudName="djjwswdo4"
                        publicId={profile?.account?.avatar}
                      />
                    </div>
                    <div>
                      <div className="text-accent-700 text-sm font-medium">
                        {profile?.account?.first_name}{" "}
                        {profile?.account?.last_name}
                      </div>
                      <div className="text-accent-400 text-xs">
                        {profile?.account?.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg mt-4 overflow-hidden">
                  {profile.account.account_type === "organizer" ? (
                    <>
                      <div
                        className="dropdown-item"
                        onClick={() => Nav("/home", { replace: true })}
                      >
                        <div>
                          <span className="material-symbols-outlined">
                            home
                          </span>
                        </div>
                        Home
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() =>
                          Nav("/organizer/dashboard", { replace: true })
                        }
                      >
                        <div>
                          <span className="material-symbols-outlined">
                            dashboard
                          </span>
                        </div>
                        Dashboard
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div
                    className="flex gap-2 text-accent-500 text-sm py-2 cursor-pointer duration-300 px-2 hover:bg-accent-50 font-medium "
                    onClick={() => Nav("/settings", { replace: true })}
                  >
                    <div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"
                          className="stroke-accent-500"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"
                          className="stroke-accent-500"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    Settings
                  </div>
                  <div
                    className="flex gap-2 text-accent-500 text-sm py-2 cursor-pointer duration-300 px-2 hover:bg-accent-50 font-medium"
                    onClick={() => {
                      logoutSubmit();
                    }}
                  >
                    <div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 16.9999L21 11.9999M21 11.9999L16 6.99994M21 11.9999H9M12 16.9999C12 17.2955 12 17.4433 11.989 17.5713C11.8748 18.9019 10.8949 19.9968 9.58503 20.2572C9.45903 20.2823 9.31202 20.2986 9.01835 20.3312L7.99694 20.4447C6.46248 20.6152 5.69521 20.7005 5.08566 20.5054C4.27293 20.2453 3.60942 19.6515 3.26118 18.8724C3 18.2881 3 17.5162 3 15.9722V8.02764C3 6.4837 3 5.71174 3.26118 5.12746C3.60942 4.34842 4.27293 3.75454 5.08566 3.49447C5.69521 3.29941 6.46246 3.38466 7.99694 3.55516L9.01835 3.66865C9.31212 3.70129 9.45901 3.71761 9.58503 3.74267C10.8949 4.0031 11.8748 5.09798 11.989 6.42855C12 6.55657 12 6.70436 12 6.99994"
                          className="stroke-accent-500"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    Sign Out
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              <div className="min-w-[130px] px-2 rounded-lg overflow-hidden">
                <div
                  className="flex gap-2 text-accent-500 text-sm py-2 cursor-pointer duration-300 px-2 hover:bg-accent-50 font-medium"
                  onClick={() => {
                    setpopupSignup(true);
                  }}
                >
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20C4.33579 17.5226 7.50702 16 11 16M15.5 7.5C15.5 9.98528 13.4853 12 11 12C8.51472 12 6.5 9.98528 6.5 7.5C6.5 5.01472 8.51472 3 11 3C13.4853 3 15.5 5.01472 15.5 7.5Z"
                        className="stroke-accent-600"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 20V14M15 17H21"
                        className="stroke-accent-600"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  Sign Up
                </div>
                <div
                  className="flex gap-2 text-accent-500 text-sm py-2 cursor-pointer duration-300 px-2 hover:bg-accent-50 font-medium"
                  onClick={() => {
                    setpoupLogin(true);
                  }}
                >
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20C4.33579 17.5226 7.50702 16 11 16M15.5 7.5C15.5 9.98528 13.4853 12 11 12C8.51472 12 6.5 9.98528 6.5 7.5C6.5 5.01472 8.51472 3 11 3C13.4853 3 15.5 5.01472 15.5 7.5Z"
                        className="stroke-accent-600"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 20L21 17M21 17L18 14M21 17H15"
                        className="stroke-accent-600"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  Sign in
                </div>
              </div>
            </div>
          )}
          <div></div>
        </div>
      </div>
      {popupLogin && (
        <LoginPopup setTrigger={setpoupLogin} signup={setpopupSignup} />
      )}
      {popupSignUp && (
        <SignUpNav
          setTrigger={setpopupSignup}
          signUpClient={setpopupSignUpClient}
        />
      )}
      {popupSignUpClient && (
        <BuyerSignUp
          setTrigger={setpopupSignUpClient}
          login={setpoupLogin}
          alert={alert}
          setAlert={setAlert}
          setAlertParams={setAlertParams}
        />
      )}
    </nav>
  );
}
export default Navbar;
