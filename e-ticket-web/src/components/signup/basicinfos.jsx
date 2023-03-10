import React, { useState } from "react";

const BasicInfos = ({ formData, setFormData }) => {

  const [firstName, setFirstName] = useState(formData.first_name);
  const [lastName, setLastName] = useState(formData.last_name);
  const [email, setEmail] = useState(formData.email);
  const [city, setCity] = useState(formData.city);
  const [avatar, setAvatar] = useState(formData.avatar);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFormData({ ...formData, first_name: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setFormData({ ...formData, last_name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setFormData({ ...formData, email: event.target.value });
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setFormData({ ...formData, city: event.target.value });
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
    setFormData({ ...formData, avatar: event.target.value });
  };
  //
  return (
    <>
      <div className="row2">
        <div className="column">
          <div className="label">First name *</div>
          <input type="text" value={firstName} onChange={handleFirstNameChange} required />
        </div>
        <div className="column">
          <div className="label">Last name *</div>
          <input type="text" value={lastName} onChange={handleLastNameChange} required />
        </div>
      </div>
      <div className="row1">
        <div className="label">Email *</div>
        <div className="iconed-input">
          <div className="icon">
            <span class="material-symbols-outlined">mail</span>
          </div>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
      </div>
      <div className="row1">
        <div className="label">City *</div>
        <div className="iconed-input">
          <div className="icon">
            <span class="material-symbols-outlined">location_on</span>
          </div>
          <input type="text" value={city} onChange={handleCityChange} required />
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
