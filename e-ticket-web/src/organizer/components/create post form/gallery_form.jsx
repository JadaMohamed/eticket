import React, { useEffect, useState } from "react";
import "../../css/create post form/gallery_form.css";

const Gallery_form = ({ imageCollector, setImages }) => {
  const [previewSources, setPreviewSources] = useState(imageCollector.images);
  const [fileInputStates, setFileInputStates] = useState(Array(3).fill(null));

  const previewFile = (file, index) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSources((prevSources) => {
        const newSources = [...prevSources];
        newSources[index] = reader.result;
        return newSources;
      });
    };
  };
  const handleFileInputChange = (e, index) => {
    const file = e.target.files[0];
    setImages((prevData) => ({
      ...prevData,
      images: [
        ...prevData.images.slice(0, index),
        file,
        ...prevData.images.slice(index + 1),
      ],
    }));
    previewFile(file, index);
  };

  useEffect(() => {
    console.log(previewSources);
  });
  return (
    <>
      <div className="event-gallery">
        <div className="labels">
          <div className="title">Event Gallery</div>
          <div className="instructions">
            Up to 3 images sit amet consectetur. Suspendisse tincidunt viverra
            olor sit amet consectetur.
          </div>
        </div>
        <div className="import-images">
          <div className="import-cards">
            {[0, 1, 2].map((index) => (
              <div className="import-card" key={index}>
                <input
                  type="file"
                  name={`image-${index}`}
                  onChange={(e) => handleFileInputChange(e, index)}
                  value={fileInputStates[index]}
                />
                <div
                  className="import-card-container"
                  style={{
                    padding: previewSources[index] !== null ? "0" : "20px",
                  }}
                >
                  {previewSources[index] ? (
                    <img src={previewSources[index]} alt={`Preview ${index}`} />
                  ) : (
                    <>
                      <span class="material-symbols-outlined icon">
                        cloud_upload
                      </span>
                      <span className="content">
                        <span>Click to upload</span> or drag and drop PNG or
                        JPG(max,720x360px)
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tandance-gallery">
        <div className="labels">
          <div className="title">Hot Events Gallery</div>
          <div className="instructions">
            Sit amet consectetur. Suspendisse tincidunt viverra olor sit amet
            consectetur.
          </div>
        </div>
        <div className="import-cards">
          <div className="import-card">
            <div className="import-card-container">
              <span class="material-symbols-outlined icon">cloud_upload</span>
              <span className="content">
                <span>Click to upload</span> or drag and drop PNG or JPG(max,
                720x720px)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery_form;
