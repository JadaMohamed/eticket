import React from "react";
// import "./index.css";
import { useNavigate } from "react-router-dom";

function CategoriesRedirect() {
  const Nav = useNavigate();
  const navigate = useNavigate();
  const handleCategoryChange = (mycategory) => {
    navigate(`/search/` + mycategory);
  };

  return (
    <div className="ssubNavbar | border-b border-accent-50 bg-white">
      <div
        className="snavcontainer | m-auto max-w-7xl lg:px-12 px-5 py-3 flex justify-between items-center"
        id="snav-container"
      >
        <ul className="overflow-x-auto m-auto list-none flex gap-2">
          <li
            onClick={() => Nav("/home", { replace: true })}
            id="home_"
            className="text-accent-500 text-sm cursor-pointer py-1 px-3 border border-accent-50 rounded-full duration-300 whitespace-nowrap select-none hover:bg-primary-50"
          >
            All
          </li>
          <li
            onClick={() => {
              handleCategoryChange(" Festival | Concert");
            }}
            id="festival_concert"
            className="text-accent-500 text-sm cursor-pointer py-1 px-3 border border-accent-50 rounded-full duration-300 whitespace-nowrap select-none hover:bg-primary-50"
          >
            Festival | Concert
          </li>
          <li
            onClick={() => {
              handleCategoryChange(" Family");
            }}
            id="family_"
            className="text-accent-500 text-sm cursor-pointer py-1 px-3 border border-accent-50 rounded-full duration-300 whitespace-nowrap select-none hover:bg-primary-50"
          >
            Family
          </li>
          <li
            onClick={() => {
              handleCategoryChange(" Theater | Cinema");
            }}
            id="theater_cinema"
            className="text-accent-500 text-sm cursor-pointer py-1 px-3 border border-accent-50 rounded-full duration-300 whitespace-nowrap select-none hover:bg-primary-50"
          >
            Theater | Cinema
          </li>
          <li
            onClick={() => {
              handleCategoryChange(" Sport");
            }}
            id="sport_"
            className="text-accent-500 text-sm cursor-pointer py-1 px-3 border border-accent-50 rounded-full duration-300 whitespace-nowrap select-none hover:bg-primary-50"
          >
            Sport
          </li>
          <li
            onClick={() => {
              handleCategoryChange(" Course | Lecture");
            }}
            id="course_lecture"
            className="text-accent-500 text-sm cursor-pointer py-1 px-3 border border-accent-50 rounded-full duration-300 whitespace-nowrap select-none hover:bg-primary-50"
          >
            Course | Lecture
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CategoriesRedirect;
