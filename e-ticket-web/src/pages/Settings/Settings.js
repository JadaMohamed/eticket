import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import "./Settings.css";

function Settings() {
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
                    value={"Olay"}
                  />
                </div>
                <div className="collect-data">
                  <div className="label">Last Name</div>
                  <input
                    className="collector-50"
                    type="text"
                    id="last-name"
                    value={"Mouriss"}
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
                      value={"olaymouriss@email.com"}
                      
                    />
                  </div>
                </div>
              </div>
              <div className="city-collector">
                <div className="collect-data">
                  <div className="label">City</div>
                  <div className="city-drop">
                    <span className="material-symbols-outlined">distance</span>
                    <select name="cities" id="cities">
                      <option value="ag">Agadir</option>
                      <option value="ra">Rabat</option>
                      <option value="ca">Casablanca</option>
                      <option value="ta">Tanger</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="avatar-collector">
                <div className="collect-data">
                  <div className="label">Avatar</div>
                  <div className="display">
                    <div className="current-avatar">
                      <img src="" alt="" />
                    </div>
                    <div className="drag-drop-space">
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
              <div className="save-change-btn" title="Save Changes">
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
                    type="text"
                    id="current-password"
                  />
                </div>
                <div className="collect-data">
                  <div className="label">New Password</div>
                  <input
                    className="collector-100 collector-input"
                    type="text"
                    id="new-password1"
                  />
                </div>
                <div className="collect-data">
                  <div className="label">Confirm Password</div>
                  <input
                    className="collector-100 collector-input"
                    type="text"
                    id="new-password2"
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
                      value={"+212 67-93872652"}
                    />
                  </div>
                </div>
                <div className="instructions">Verification required</div>
              </div>
            </div>
            <div className="personal-infos-bottom">
              <div className="cancel-btn" title="Cancel">
                <div>Cancel</div>
              </div>
              <div className="save-change-btn" title="Save Changes">
                <div>Save Changes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
