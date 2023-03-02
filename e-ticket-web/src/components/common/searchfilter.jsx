import React, { useState } from "react";
import "../../css/searchfilter.css";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const SearchFilter = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filters, setFilters] = useState([]);

  const categories = [
    { value: "Festival | Concert", label: "Festival | Concert" },
    { value: "Family", label: "Family" },
    { value: "Theater | Cinema", label: "Theater | Cinema" },
    { value: "Sport", label: "Sport" },
    { value: "Course | Lecture", label: "Course | Lecture" },
  ];

  const cities = [
    { value: "Agadir", label: "Agadir" },
    { value: "Rabat", label: "Rabat" },
    { value: "Casablanca", label: "Casablanca" },
    { value: "Fes", label: "Fes" },
  ];

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (!filters.includes(category) && category !== "") {
      setSelectedCategory(category);
      setFilters([...filters, category]);
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    if (!filters.includes(city) && city !== "") {
      setSelectedCity(city);
      setFilters([...filters, city]);
    }
  };

  const handleDeleteFilter = (filter) => {
    const newFilters = filters.filter((f) => f !== filter);
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters([]);
    setSelectedCategory("");
    setSelectedCity("");
  };
  return (
    <div className="search-filter">
      <div className="search-filter-container">
        <div className="top-search-filter">
          <div className="search-keyword">Apply filter : </div>
          <div className="filter-input">
            <span class="material-symbols-outlined">category</span>
            <select value="" onChange={handleCategoryChange}>
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-input">
            <span class="material-symbols-outlined">pin_drop</span>
            <select value="" onChange={handleCityChange}>
              <option value="">City</option>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bottom-search-filter">
          <div className="left-side">
            <div className="search-keyword">
              Search result for : <span>"{props.searchKeyword}"</span>
            </div>
            {filters.map((filter) => (
              <div key={filter} className="filter">
                <div
                  onClick={() => handleDeleteFilter(filter)}
                  className="close"
                  title="Cancel Filter"
                >
                  <span class="material-symbols-outlined">cancel</span>
                </div>
                <span className="content">{filter}</span>
              </div>
            ))}
          </div>
          <div className="right-side">
            {filters.length ? (
              <div onClick={handleClearAllFilters}>Clear All Filters</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
