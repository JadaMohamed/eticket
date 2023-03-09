import React from "react";

const SecurityInfos = () => {
  return (
    <>
      <div className="row1 pass">
        <div className="label">Email *</div>
        <div className="iconed-input">
          <div className="icon">
            <span class="material-symbols-outlined btn">visibility_off</span>
          </div>
          <input type="text" />
        </div>
      </div>
      <div className="row2">
        <div className="column">
          <div className="label">Confirm password *</div>
          <input type="text" />
          <div className="instructions">
            8 characters or longer. Combine upper and lowercase letters and
            numbers.
          </div>
        </div>
      </div>
      <div className="row1">
        <div className="label">Phone *</div>
        <div className="iconed-input">
          <div className="icon">
            <span class="material-symbols-outlined">phone</span>
          </div>
          <input type="text" />
        </div>
      </div>
    </>
  );
};

export default SecurityInfos;
