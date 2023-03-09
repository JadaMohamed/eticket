import React, { useRef, useState } from "react";

const BrandInfos = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);

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

  // data to send//
  const Description = useRef("");
  const Twitter = useRef("");
  const Facebook = useRef("");
  const Instagram = useRef("");
  return (
    <>
      <div className="row2">
        <div className="column">
          <div className="label">Description *</div>
          <textarea rows="5" ref={Description}></textarea>
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
                  <i class="fa-brands fa-instagram"></i>
                  <input
                    id={`instagram-link-${index}`}
                    type="text"
                    value={socialLink.link}
                    onChange={(event) => handleLinkChange(event, index)}
                    ref={Instagram}
                  />
                  <button type="button" onClick={() => handleDeleteLink(index)}>
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              )}

              {socialLink.platform === "facebook" && (
                <div className="social-media">
                  <i class="fa-brands fa-facebook-f"></i>
                  <input
                    id={`facebook-link-${index}`}
                    type="text"
                    value={socialLink.link}
                    onChange={(event) => handleLinkChange(event, index)}
                    ref={Facebook}
                  />
                  <button type="button" onClick={() => handleDeleteLink(index)}>
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              )}

              {socialLink.platform === "twitter" && (
                <div className="social-media">
                  <i class="fa-brands fa-twitter"></i>
                  <input
                    id={`twitter-link-${index}`}
                    type="text"
                    value={socialLink.link}
                    onChange={(event) => handleLinkChange(event, index)}
                    ref={Twitter}
                  />
                  <button type="button" onClick={() => handleDeleteLink(index)}>
                    <i class="fa-regular fa-trash-can"></i>
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
