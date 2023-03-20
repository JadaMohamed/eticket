import React, { useState } from "react";

const BrandInfos = ({ formData, setFormData }) => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);

  //data to send
  const [Description, setDescription] = useState(formData.Description);
  const [Instagram, setInstagram] = useState(formData.Instagram);
  const [Facebook, setFacebook] = useState(formData.Facebook);
  const [Twitter, setTwitter] = useState(formData.Twitter);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setFormData({ ...formData, Description: event.target.value });
  };

  const handleInstagramChange = (event) => {
    setInstagram(event.target.value);
    setFormData({ ...formData, Instagram: event.target.value });
  };

  const handleFacebookChange = (event) => {
    setFacebook(event.target.value);
    setFormData({ ...formData, Facebook: event.target.value });
  };

  const handleTwitterChange = (event) => {
    setTwitter(event.target.value);
    setFormData({ ...formData, Twitter: event.target.value });
  };

  const handlePlatformChange = (event) => {
    const platform = event.target.value;
    if (platform !== "") {
      if (!socialLinks.some((link) => link.platform === platform)) {
        setSelectedPlatform(platform);
        setSocialLinks([...socialLinks, { platform, link: "" }]);
      }
    }
  };

  const handleLinkChange = (event, index) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index].link = event.target.value;
    setSocialLinks(newSocialLinks);
  };

  const handleDeleteLink = (index) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks.splice(index, 1);
    setSocialLinks(newSocialLinks);
  };
  return (
    <>
      <div className="row2">
        <div className="column">
          <div className="label">Description *</div>
          <textarea rows="5" onChange={handleDescriptionChange} value={Description}></textarea>
        </div>
      </div>
      <div>
        <div className="label">Social links </div>
        <select
          id="social-platform"
          value="Add social link"
          onChange={handlePlatformChange}
        >
          <option value="Add social link">Add social link</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
        </select>
        <div className="socials">
          {socialLinks.map((socialLink, index) => (
            <div key={index}>
              {socialLink.platform === "instagram" && (
                <div className="social-media">
                  <i className="fa-brands fa-instagram"></i>
                  <input
                    id={`instagram-link-${index}`}
                    type="text"
                    //I remove the socialLink.link beause when you goback and return to link ???????
                    //the value disapeare from the input .
                    //but when using the value={Instagram} the values keep even if you navigate back

                    // value={socialLink.link}
                    value={Instagram}
                    onChange={(event) => {
                      handleLinkChange(event, index);
                      handleInstagramChange(event);
                    }}
                  />
                  <button type="button" onClick={() => handleDeleteLink(index)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              )}

              {socialLink.platform === "facebook" && (
                <div className="social-media">
                  <i className="fa-brands fa-facebook-f"></i>
                  <input
                    id={`facebook-link-${index}`}
                    type="text"
                    //value={socialLink.link}
                    value={Facebook}
                    onChange={(event) => {
                      handleLinkChange(event, index);
                      handleFacebookChange(event);
                    }} />
                  <button type="button" onClick={() => handleDeleteLink(index)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              )}

              {socialLink.platform === "twitter" && (
                <div className="social-media">
                  <i className="fa-brands fa-twitter"></i>
                  <input
                    id={`twitter-link-${index}`}
                    type="text"
                    //value={socialLink.link}
                    value={Twitter}
                    onChange={(event) => {
                      handleLinkChange(event, index);
                      handleTwitterChange(event);
                    }} />
                  <button type="button" onClick={() => handleDeleteLink(index)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrandInfos;
