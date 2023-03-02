import React, { useState } from "react";
import "../../css/create post form/pricing.css";

const Pricing_form = () => {
  const [categories, setCategories] = useState([
    { name: "", price: "", numSeats: "" },
  ]);

  function handleAddCategory(event) {
    event.preventDefault();
    const newCategories = [
      ...categories,
      { name: "", price: "", numSeats: "" },
    ];
    setCategories(newCategories);
  }

  function handleRemoveCategory(index) {
    if (categories.length > 1) {
      const newCategories = [...categories];
      newCategories.splice(index, 1);
      setCategories(newCategories);
    }
  }

  function handleCategoryNameChange(index, event) {
    const newCategories = [...categories];
    newCategories[index].name = event.target.value;
    setCategories(newCategories);
  }

  function handleCategoryPriceChange(index, event) {
    const newCategories = [...categories];
    newCategories[index].price = event.target.value;
    setCategories(newCategories);
  }

  function handleCategoryNumSeatsChange(index, event) {
    const newCategories = [...categories];
    newCategories[index].numSeats = event.target.value;
    setCategories(newCategories);
  }
  return (
    <>
      <div className="row-section">
        <div className="left-side-row-section">
          <div className="title">Seat Categories</div>
          <div className="instructions">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
            quidem aspernatur.
          </div>
        </div>
        <div className="right-side-row-section collectors">
          {categories.map((category, index) => (
            <div key={index} className="collector-row">
              <input
                type="text"
                placeholder="Category name"
                value={category.name}
                onChange={(event) => handleCategoryNameChange(index, event)}
              />
              <div className="pricing-input">
                <input
                  type="number"
                  placeholder="Price"
                  value={category.price}
                  onChange={(event) => handleCategoryPriceChange(index, event)}
                />
                <span> MAD</span>
              </div>
              <input
                type="number"
                placeholder="Number of seats"
                value={category.numSeats}
                onChange={(event) => handleCategoryNumSeatsChange(index, event)}
              />
              <button
                type="button"
                onClick={() => handleRemoveCategory(index)}
                disabled={categories.length === 1 && index === 0}
              >
                <span class="material-symbols-outlined">remove</span>
              </button>
            </div>
          ))}
          <div className="add-btn">
            <button type="button" onClick={handleAddCategory}>
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing_form;
