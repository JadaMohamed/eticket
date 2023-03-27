import React, { useEffect, useState } from 'react'

const Alert = ({color, msg, icon, setAlert, alert}) => {

  return (
        <div className={`alert ${color}  ${alert==false ? "hide" : "show"}`}>
        <div className="icon">
        {icon==="check" && <i class="fa-regular fa-circle-check"></i>}
        {icon==="clock" && <i class="fa-regular fa-clock"></i>}
        {icon==="error" && <i class="fa-regular fa-circle-xmark"></i>}
        </div>
        <div className="message">{msg} !</div>
        <div className="close" onClick={() => setAlert(false)}>
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
  )
}

export default Alert
