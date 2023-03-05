import React from "react";

const BasicInfos = () => {
  return (
    <>
      <div className="row2">
        <div className="column">
          <div className="label">First name *</div>
          <input type="text" />
        </div>
        <div className="column">
          <div className="label">Last name *</div>
          <input type="text" />
        </div>
      </div>
      <div className="row1">
        <div className="label">Email *</div>
        <div className="iconed-input">
          <div className="icon">
            <span class="material-symbols-outlined">mail</span>
          </div>
          <input type="text" />
        </div>
      </div>
      <div className="row1">
        <div className="label">City *</div>
        <div className="iconed-input">
          <div className="icon">
            <span class="material-symbols-outlined">location_on</span>
          </div>
          <input type="text" />
        </div>
      </div>
      <div className="row1">
        <div className="label">Avatar</div>
        <div className="row2">
          <div className="preview-avatar"></div>
          <div className="import-btn">
            <span class="material-symbols-outlined icon">cloud_upload</span>
            <span className="content">
              <span>Click to upload</span> or drag and drop PNG or JPG (max,
              720x720px)
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfos;
