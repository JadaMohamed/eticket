import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import rolling from "../../../../img/rolling.svg";

export default function LoginModal(props) {
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const userName = useRef("");
  const password = useRef("");
  const { login, errorLogin, setErrorLogin } = useContext(AuthContext);
  const Nav = useNavigate();

  useEffect(() => {
    if (errorLogin === "Login successfully") {
      setErrorLogin("");
      props.setTrigger(false);
    }
  }, [errorLogin]);

  const loginSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    let payload = {
      email: userName.current.value,
      password: password.current.value,
    };
    await login(payload);
    setLoading(false);
  };

  const toggleVisibility = () => {
    if (isVisible) setVisible(false);
    else setVisible(true);
  };

  return (
    <div className="h-screen fixed w-full bg-[rgba(0,0,0,0.2)] backdrop-blur-sm top-0 left-0 flex justify-center items-center select-none">
      <div className="relative m-5 p-8 w-full max-w-md bg-white rounded-lg flex gap-8 flex-col shadow-sm">
        <div
          className="absolute top-3 right-3 text-accent-300 select-none cursor-pointer"
          onClick={() => props.setTrigger(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </div>
        <div>
          <div className="text-2xl font-semibold text-primary-700">Sign In</div>
          <div className="text-accent-400">Welcome back!</div>
        </div>
        <div className="gap-5 flex flex-col">
          <div className="flex flex-col gap-1">
            <label className="text-accent-400 text-sm" htmlFor="email">
              Email
            </label>
            <div className="flex w-full border-accent-100 border rounded-lg overflow-hidden focus-within:outline outline-primary-400">
              <span className="p-[10px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                    className="stroke-accent-400"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                className="outline-none bg-transparen w-full px-2 placeholder:text-accent-200 font-medium text-[15px] text-accent-800"
                type="email"
                id="email"
                ref={userName}
                required
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-accent-400 text-sm mb-1" htmlFor="password">
              Password
            </label>
            <div className="flex w-full relative border-accent-100 border rounded-lg overflow-hidden focus-within:outline outline-primary-400">
              <span className="p-[10px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"
                    className="stroke-accent-400"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                className="outline-none bg-transparen w-full px-2 placeholder:text-accent-200 font-medium text-[15px] text-accent-800"
                type={isVisible ? "" : "password"}
                id="first-name"
                ref={password}
                required
                placeholder="***********"
              />
              <span
                className="p-2 cursor-pointer top-[2px] bg-white absolute rounded-full right-0"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                      className="stroke-accent-600"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                      className="stroke-accent-600"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213"
                      className="stroke-accent-600"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <div className="submit">
            {errorLogin && (
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-red-600">
                  {errorLogin == "Please wait for Loading response ..."
                    ? ""
                    : errorLogin}
                </span>
                <Link
                  to="/reset-password/msg"
                  className="text-secondary-600 underline "
                >
                  Forgot password ?
                </Link>
              </div>
            )}
            <div
              className="bg-secondary-600 min-h-[36px] flex justify-center items-center text-white font-medium rounded-lg cursor-pointer"
              onClick={loginSubmit}
            >
              {loading ? (
                <img src={rolling} style={{ width: "20px" }} />
              ) : (
                "Sign In"
              )}
            </div>
          </div>
          <div className="text-xs font-medium text-center text-accent-600">
            Don't have account ?{" "}
            <span
              className="text-primary-600 underline cursor-pointer"
              onClick={() => {
                props.setTrigger(false);
                props.signup(true);
              }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
