import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import "./Settings.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Auth/AuthContext";
import axios from "axios";

function Settings() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { profile, setProfile } = useContext(AuthContext);
  const [first_name, setFirstName] = useState(profile?.account?.first_name);
  const [last_name, setLastName] = useState(profile?.account?.last_name);
  const [email, setEmail] = useState(profile?.account?.email);
  const [city, setCity] = useState(profile?.user?.city);
  const [avatar, setAvatar] = useState(profile?.account?.avatar);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [phone_number, setPhoneNumber] = useState(
    profile?.account?.phone_number
  );
  const [fieldError, setfieldError] = useState("");

  const UpdatePersonaldetails = async (event) => {
    event.preventDefault();
    const updatedAccount = {
      first_name,
      last_name,
      email,
      phone_number,
      avatar,
    };
    try {
      //update accounte
      const response = await axios.put(
        `${apiUrl}/api/accounts/${profile.account.account_id}`,
        updatedAccount,
        { withCredentials: true }
      );

      // update the account in profile
      setProfile((prevProfile) => {
        return {
          ...prevProfile,
          account: {
            ...prevProfile.account,
            ...response.data,
          },
        };
      });

      //update user
      let id;
      switch (profile.account.account_type) {
        case "client":
          id = profile.user.client_id;
          break;
        case "organizer":
          id = profile.user.org_id;
          break;
        default:
          id = profile.user.ad_id;
          break;
      }
      const response2 = await axios.put(
        `${apiUrl}/api/${profile.account.account_type}s/${id}`,
        { city },
        { withCredentials: true }
      );
      //update the user in profile
      setProfile((prevProfile) => {
        return {
          ...prevProfile,
          user: {
            ...prevProfile.user,
            ...response2.data,
          },
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const validateSecurityDetails = () => {
    if (!currentPassword) {
      setfieldError("please inter your current password");
      return false;
    }

    if (currentPassword !== profile.account.password) {
      setfieldError("current password is not correct");
      return false;
    }

    if (!newPassword1) {
      setfieldError("please enter a new password");
      return false;
    }

    if (newPassword1.length < 8) {
      setfieldError("new password should containe 8 characters at lest");
      return false;
    }

    if (newPassword1 !== newPassword2) {
      setfieldError("New Password and Confirm Password are not mach");
      return false;
    }

    if (!phone_number) {
      setfieldError("Please enter your phone number");
      return false;
    }
    if (!/^\d{10}$/.test(phone_number)) {
      setfieldError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const UpdateSecurityDetails = async (event) => {
    const isValid = validateSecurityDetails();
    if (!isValid) {
      return;
    } else {
      setfieldError("");
    }
    try {
      const updatedData = {
        phone_number,
        password: newPassword1,
      };
      //update accounte
      const response = await axios.put(
        `${apiUrl}/api/accounts/${profile.account.account_id}`,
        updatedData,
        { withCredentials: true }
      );
      // update the account in profile
      setProfile((prevProfile) => {
        return {
          ...prevProfile,
          account: {
            ...prevProfile.account,
            ...response.data,
          },
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  ////upload image
  const [imageIds, setImageIds] = useState();
  const loadImages = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/images`);
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadImages();
  }, []);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };
  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await fetch(`${apiUrl}/api/images/upload/`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      console.log(uploadedResponse.data);
    } catch (erroe) {}
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className="settings-page">
        <div className="settings-page-container">
          <div className="settings-section-title">Personal info</div>
          <div className="settings-section-sub-title">
            Update your photo and personal details here.
          </div>
          <div className="personal-info-section section-settings">
            <div className="section-settings-top">
              <div className="first-last-name-collector">
                <div className="collect-data">
                  <div className="label">First Name</div>
                  <input
                    className="collector-50"
                    type="text"
                    id="first-name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={first_name}
                  />
                </div>
                <div className="collect-data">
                  <div className="label">Last Name</div>
                  <input
                    className="collector-50"
                    type="text"
                    id="last-name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="email-collector">
                <div className="collect-data">
                  <div className="label">Email</div>
                  <div className="email-input">
                    <span className="material-symbols-outlined">mail</span>
                    <input
                      className="collector-100"
                      type="text"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                </div>
              </div>
              <div className="city-collector">
                <div className="collect-data">
                  <div className="label">City</div>
                  <div className="city-drop">
                    <span className="material-symbols-outlined">distance</span>
                    <select
                      name="cities"
                      id="cities"
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value={city}>{city}</option>
                      <option value="Agadir">Agadir</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Tanger">Tanger</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="avatar-collector">
                <div className="collect-data">
                  <div className="label">Avatar</div>
                  <div className="display">
                    <div className="current-avatar">
                      <div className="avatar-cont">
                        {previewSource && <img src={previewSource} />}
                        <img src={avatar} alt="avatar" />
                      </div>
                    </div>
                    <div className="drag-drop-space">
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        value={fileInputState}
                      />
                      <div className="upload-icon">
                        <span className="material-symbols-outlined">
                          cloud_upload
                        </span>
                      </div>
                      <div className="instructions">
                        <span>Click to upload</span> or drag and drop SVG, PNG,
                        JPG or GIF (max, 800x800px)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="personal-infos-bottom">
              <div className="cancel-btn" title="Cancel">
                <div>Cancel</div>
              </div>
              <div
                className="save-change-btn"
                title="Save Changes"
                onClick={handleSubmitFile}
              >
                {/* <div onClick={UpdatePersonaldetails}>Save Changes</div> */}
                <div>Save Changes</div>
              </div>
            </div>
          </div>
          <div className="settings-section-title">Security</div>
          <div className="settings-section-sub-title">
            Update your password and phone number details here.
          </div>
          <div className="security-section section-settings">
            <div className="section-settings-top">
              <div className="password-collector collector-section">
                <div className="collect-data">
                  <div className="label">Current Password</div>
                  <input
                    className="collector-100 collector-input"
                    type="password"
                    id="current-password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                  />
                </div>
                <div className="collect-data">
                  <div className="label">New Password</div>
                  <input
                    className="collector-100 collector-input"
                    type="password"
                    id="new-password1"
                    onChange={(e) => setNewPassword1(e.target.value)}
                    value={newPassword1}
                  />
                </div>
                <div className="collect-data">
                  <div className="label">Confirm Password</div>
                  <input
                    className="collector-100 collector-input"
                    type="password"
                    id="new-password2"
                    onChange={(e) => setNewPassword2(e.target.value)}
                    value={newPassword2}
                  />
                </div>
                <div className="instructions">
                  8 characters or longer. Combine upper and lowercase letters
                  and numbers.
                </div>
              </div>
              <div className="phone-collector collector-section">
                <div className="collect-data">
                  <div className="label">Phone Number</div>
                  <div className="phone-input">
                    <span className="material-symbols-outlined">call</span>
                    <input
                      className="collector-100"
                      type="text"
                      id="phone-n"
                      value={phone_number}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="instructions">Verification required</div>
              </div>
            </div>
            <div style={{ color: "red" }}>{fieldError}</div>
            <div className="personal-infos-bottom">
              <div className="cancel-btn" title="Cancel">
                <div>Cancel</div>
              </div>
              <div className="save-change-btn" title="Save Changes">
                <div onClick={UpdateSecurityDetails}>Save Changes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
