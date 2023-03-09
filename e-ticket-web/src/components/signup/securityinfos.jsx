import React, { useState } from "react";

const SecurityInfos = ({ formData, setFormData }) => {
  const [password, setPassword] = useState(formData.password);
  const [confirmPassword, setConfirmPassword] = useState(formData.confirmPassword);
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFormData({ ...formData, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setFormData({ ...formData, confirmPassword: event.target.value });
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setFormData({ ...formData, phoneNumber: event.target.value });
  };

  return (
    <>
      <div className="row1 pass">
        <div className="label">Password *</div>
        <div className="iconed-input">
          <div className="icon">
            <span class="material-symbols-outlined btn">visibility_off</span>
          </div>
          <input type="text" value={password} onChange={handlePasswordChange} required />
        </div>
      </div>
      <div className="row2">
        <div className="column">
          <div className="label">Confirm password *</div>
          <input type="text" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
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
          <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} required />
        </div>
      </div>
    </>
  );
};

export default SecurityInfos;
