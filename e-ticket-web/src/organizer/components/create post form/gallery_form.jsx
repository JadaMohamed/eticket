import React from "react";
import "../../css/create post form/gallery_form.css";

const Gallery_form = () => {
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
            <div className="import-card">
              <div className="import-card-container">
                <span class="material-symbols-outlined icon">cloud_upload</span>
                <span className="content">
                  <span>Click to upload</span> or drag and drop PNG or JPG(max,
                  720x360px)
                </span>
              </div>
            </div>
            <div className="import-card">
              <div className="import-card-container">
                <span class="material-symbols-outlined icon">cloud_upload</span>
                <span className="content">
                  <span>Click to upload</span> or drag and drop PNG or JPG(max,
                  720x360px)
                </span>
              </div>
            </div>
            <div className="import-card">
              <div className="import-card-container">
                <span class="material-symbols-outlined icon">cloud_upload</span>
                <span className="content">
                  <span>Click to upload</span> or drag and drop PNG or JPG(max,
                  720x360px)
                </span>
              </div>
            </div>
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
