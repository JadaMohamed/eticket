import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpNav(props) {
  const [isVisible, setVisible] = useState(false);
  const Nav = useNavigate();
  const toggleVisibility = () => {
    if (isVisible) setVisible(false);
    else setVisible(true);
  };

  return (
    <div className="h-screen fixed w-full bg-[rgba(0,0,0,0.2)] backdrop-blur-sm top-0 left-0 flex justify-center items-center select-none">
      <div className="relative m-5 p-8 w-full max-w-lg bg-white rounded-lg flex gap-8 flex-col shadow-sm">
        <div
          className="absolute top-3 right-3 text-accent-300 select-none cursor-pointer"
          onClick={() => props.setTrigger(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </div>
        <div>
          <div className="text-2xl font-semibold text-primary-700">Sign Up</div>
          <div className="text-accent-400 mt-2">
            You either be Organizer or Buyer!
          </div>
        </div>
        <div className="flex justify-between gap-4 h-full">
          <div
            className="bg-secondary-600 p-3 rounded-lg"
            onClick={() => {
              Nav("/registration", { replace: false });
            }}
          >
            <div className="text-white font-medium text-lg">Organizer</div>
            <div className=" text-secondary-100 text-sm font-light">
              Organize your events and sale your events's tickets.
            </div>
            <div className="p-2 rounded-full mt-2 border w-fit flex justify-center text-sm cursor-pointer text-secondary-100 border-secondary-100">
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
          <div
            className="bg-secondary-600 p-3 rounded-lg"
            onClick={() => {
              props.signUpClient(true);
              props.setTrigger(false);
            }}
          >
            <div className="text-white font-medium text-lg">Buyer</div>
            <div className=" text-secondary-100 text-sm font-light">
              Explore and reserve your seat to organized events.
            </div>
            <div className="p-2 rounded-full mt-2 border w-fit flex justify-center text-sm cursor-pointer text-secondary-100 border-secondary-100">
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
