import React, { useState } from "react";

function SeatCategoriesForm() {
  const [categories, setCategories] = useState([{ name: "", price: "" }]);

  function handleAddCategory() {
    const newCategories = [...categories, { name: "", price: "" }];
    setCategories(newCategories);
  }

  function handleRemoveCategory(index) {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
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

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Category name"
            value={category.name}
            onChange={(event) => handleCategoryNameChange(index, event)}
          />
          <input
            type="number"
            placeholder="Price"
            value={category.price}
            onChange={(event) => handleCategoryPriceChange(index, event)}
          />
          <button onClick={() => handleRemoveCategory(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddCategory}>Add Seat Category</button>
    </div>
  );
}

export default SeatCategoriesForm;
