import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Auth/AuthContext";
import { Image } from "cloudinary-react";
import Alert from "../alert";
import SignUpNav from "../SignUpNav";
import SignUpClient from "../sign_up";
import LoginModal from "../Modals/Login";

function NNavbar(props) {
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
    <nav className="bg-white fixed w-full top-0 z-[9999] border-b border-accent-50">
      <div className="m-auto py-3 px-12 flex justify-between items-center w-full">
        <Alert
          color={alertParams.color}
          msg={alertParams.msg}
          icon={alertParams.icon}
          setAlert={setAlert}
          alert={alert}
        />
        <a className="" onClick={() => Nav("/home", { replace: true })}>
          <svg
            width="97"
            height="24"
            viewBox="0 0 97 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_433_2079"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="29"
              height="24"
            >
              <path d="M28.609 0H0V24H28.609V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_433_2079)">
              <path
                d="M2.36679 0H26.2215C27.5294 0 28.5882 1.05882 28.5882 2.36678V4.65052C28.5882 7.59862 27.8408 7.55709 26.346 8.71972C24.955 9.79931 25.0173 11.7301 25.0381 11.9792C25.0381 12 25.0381 12 25.0381 12V12.0208C25.0173 12.2699 24.955 14.2007 26.346 15.2803C27.8408 16.4429 28.5882 16.4014 28.5882 19.3495V21.6747C28.609 22.9619 27.5294 24.0415 26.2215 24.0415H2.34603C1.03807 24.0415 -0.020752 22.9827 -0.020752 21.6747V19.3702C-0.020752 16.4221 0.726653 16.4637 2.22146 15.301C3.61247 14.2215 3.55018 12.2907 3.52942 12.0415V12.0208V12C3.55018 11.7509 3.61247 9.82007 2.22146 8.74048C0.747414 7.55709 9.29267e-06 7.59862 9.29267e-06 4.65052V2.36678C9.29267e-06 1.05882 1.05883 0 2.36679 0Z"
                fill="#562F88"
              />
              <path
                d="M9.71624 6.85127V17.045C9.71624 17.8963 9.03112 18.5814 8.15914 18.5814C7.28717 18.5814 6.60205 17.8963 6.60205 17.045V6.85127C6.60205 6.00006 7.28717 5.31494 8.15914 5.31494C9.03112 5.31494 9.71624 6.00006 9.71624 6.85127Z"
                fill="#EEE3F0"
              />
              <path
                d="M21.9861 6.85127V17.045C21.9861 17.8963 21.301 18.5814 20.429 18.5814C19.5571 18.5814 18.8927 17.8963 18.8927 17.045V6.85127C18.8927 6.00006 19.5778 5.31494 20.4498 5.31494C21.3218 5.31494 21.9861 6.00006 21.9861 6.85127Z"
                fill="#EEE3F0"
              />
              <path
                d="M15.9031 4.50508V7.37013C15.9031 8.22135 15.218 8.90647 14.346 8.90647C13.4741 8.90647 12.7889 8.22135 12.7889 7.37013V4.50508C12.7889 3.65387 13.4741 2.96875 14.346 2.96875C15.218 2.96875 15.9031 3.65387 15.9031 4.50508Z"
                fill="#9983B8"
              />
              <path
                d="M15.9031 12.3737V19.4948C15.9031 20.3461 15.218 21.0312 14.346 21.0312C13.4741 21.0312 12.7889 20.3461 12.7889 19.4948V12.3737C12.7889 11.5225 13.4741 10.8374 14.346 10.8374C15.218 10.8374 15.9031 11.5225 15.9031 12.3737Z"
                fill="#9983B8"
              />
            </g>
            <path
              d="M37 18.4503V5H46.9582V7.27048H39.7086V10.2447H46.467V12.5284H39.7086V16.1798H47.2238V18.437H37V18.4503Z"
              fill="#562F88"
            />
            <path
              d="M53.9688 8.70454V10.7626H52.2029V14.6795V15.4098C52.2029 15.516 52.2029 15.6753 52.2294 15.8878C52.2427 16.1002 52.3224 16.2728 52.4817 16.3923C52.6012 16.4852 52.7472 16.5251 52.9199 16.5251C53.1589 16.5251 53.5041 16.4454 53.9555 16.2861L54.168 18.2777C53.5705 18.53 52.8933 18.6628 52.1365 18.6628C51.1539 18.6628 50.4635 18.384 50.0652 17.813C49.8925 17.574 49.7731 17.2421 49.6934 16.8172C49.6403 16.4852 49.6137 15.8878 49.6137 14.9981V10.7493H48.432V8.70454H49.6137V6.766L52.2029 5.26562V8.70454H53.9688Z"
              fill="#562F88"
            />
            <path
              d="M55.748 7.38998V5H58.3239V7.38998H55.748ZM55.748 18.4503V8.70447H58.3239V18.4503H55.748Z"
              fill="#562F88"
            />
            <path
              d="M69.4639 11.5856L66.9146 12.0504C66.742 11.028 66.1577 10.5234 65.1619 10.5234C63.7545 10.5234 63.0508 11.4794 63.0508 13.4047C63.0508 15.5158 63.7678 16.578 65.1885 16.578C66.1976 16.578 66.8216 15.954 67.0473 14.7192L69.5701 15.1441C69.039 17.4942 67.5386 18.6626 65.0557 18.6626C63.5553 18.6626 62.4002 18.1846 61.5769 17.2286C60.7803 16.3125 60.382 15.1042 60.382 13.5773C60.382 12.0371 60.7803 10.8155 61.5769 9.91265C62.4134 8.95666 63.5952 8.49194 65.1088 8.49194C67.4058 8.49194 68.8531 9.5276 69.4639 11.5856Z"
              fill="#562F88"
            />
            <path
              d="M71.3228 18.4503V5H73.8986V12.1301L76.9126 8.70447H80.086L76.7533 12.2629L80.325 18.4503H77.55L75.1069 14.0819L73.8986 15.33V18.4503H71.3228Z"
              fill="#562F88"
            />
            <path
              d="M87.4949 15.3432L90.0575 15.7681C89.3804 17.6934 87.9596 18.6626 85.8219 18.6626C84.1224 18.6626 82.8743 18.105 82.0644 17.0029C81.4138 16.1266 81.0951 14.998 81.0951 13.6437C81.0951 12.1831 81.4669 10.9749 82.2104 10.0322C83.0204 9.00977 84.1357 8.49194 85.5564 8.49194C87.2028 8.49194 88.4244 9.06288 89.2077 10.218C89.8849 11.2271 90.2036 12.5947 90.177 14.3076H83.7241C83.7373 14.998 83.9232 15.5557 84.2685 15.9938C84.6535 16.4851 85.1713 16.7241 85.8352 16.7241C86.6717 16.7374 87.2294 16.2727 87.4949 15.3432ZM87.641 12.7408C87.6277 12.1035 87.4684 11.5724 87.163 11.1608C86.8178 10.696 86.3398 10.457 85.729 10.457C85.1049 10.457 84.627 10.6828 84.2685 11.1475C83.9365 11.5724 83.7772 12.1035 83.7905 12.7408H87.641Z"
              fill="#562F88"
            />
            <path
              d="M96.7627 8.70454V10.7626H94.9968V14.6795V15.4098C94.9968 15.516 94.9968 15.6753 95.0234 15.8878C95.0366 16.1002 95.1163 16.2728 95.2756 16.3923C95.3951 16.4852 95.5412 16.5251 95.7138 16.5251C95.9528 16.5251 96.298 16.4454 96.7495 16.2861L96.9619 18.2777C96.3644 18.53 95.6872 18.6628 94.9304 18.6628C93.9479 18.6628 93.2574 18.384 92.8591 17.813C92.6865 17.574 92.567 17.2421 92.4873 16.8172C92.4342 16.4852 92.4077 15.8878 92.4077 14.9981V10.7493H91.226V8.70454H92.4077V6.766L94.9968 5.26562V8.70454H96.7627Z"
              fill="#562F88"
            />
          </svg>
        </a>
        <div>
          <div className="flex items-center rounded-full border border-accent-50 overflow-hidden">
            <input
              className="px-5 text-sm focus-within:outline-purple-500 rounded-s-full py-2 font-medium placeholder:text-accent-200 border-e border-accent-50"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {isLoggedIn ? (
                <div
                  className="btn flex flex-col items-center p-1 duration-300 ease-in hover:cursor-pointer rounded-full hover:bg-secondary-50 menu-trigger user-infos"
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"
                          className="stroke-accent-500"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 20V14M15 17H21"
                        className="stroke-accent-600"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 20L21 17M21 17L18 14M21 17H15"
                        className="stroke-accent-600"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  Sign in
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {popupLogin && (
        <LoginModal setTrigger={setpoupLogin} signup={setpopupSignup} />
      )}
      {popupSignUp && (
        <SignUpNav
          setTrigger={setpopupSignup}
          signUpClient={setpopupSignUpClient}
        />
      )}
      {popupSignUpClient && (
        <SignUpClient
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
export default NNavbar;
