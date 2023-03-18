import React, { useState } from "react";

const SecurityInfos = ({ formData, setFormData }) => {
  const [password, setPassword] = useState(formData.password);
  const [visibility, setVisibility] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(
    formData.confirmPassword
  );
  const [phoneNumber, setPhoneNumber] = useState(formData.phone_number);

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
    setFormData({ ...formData, phone_number: event.target.value });
  };

  return (
    <>
      <div className="row1 pass">
        <div className="label">Password *</div>
        <div className="iconed-input">
          <span
            class="material-symbols-outlined btn"
            onClick={() => {
              setVisibility(!visibility);
            }}
          >
            {visibility ? "visibility" : "visibility_off"}
          </span>
          <input
            type={`${visibility ? "text" : "password"}`}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
      </div>
      <div className="row2">
        <div className="column">
          <div className="label">Confirm password *</div>
          <input
            type={`${visibility ? "text" : "password"}`}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <div className="instructions">
            8 characters or longer. Combine upper and lowercase letters and
            numbers.
          </div>
        </div>
      </div>
      <div className="row1">
        <div className="label">Phone *</div>
        <div className="iconed-input">
          <span class="material-symbols-outlined">phone</span>
          <input
            type="number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
      </div>
    </>
  );
};

export default SecurityInfos;
