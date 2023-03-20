import React from "react";
import QRCode from "react-qr-code";
const QrCodeViewer = (props) => {
  const handle = () => {
    props.view(false);
  };
  return (
    <div className="poup-qrcode">
      <div className="poup-qrcode-container">
        <QRCode value={props.code} />
        <div className="close" onClick={handle}>
          <span className="material-symbols-outlined">cancel</span>
        </div>
      </div>
    </div>
  );
};

export default QrCodeViewer;
