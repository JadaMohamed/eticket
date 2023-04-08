import React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

export const EventsDropDown = () => {
  const dropdownitem = (props:any) => {
    return (
      <div className="dropdown-item">
        <div className="item-container">
          <div className="imag">{props.Name}</div>
          <div className="content">{props.Last}</div>
        </div>
      </div>
    );
  }; 
  return (
    <div>
      
    </div>
  );
};
const ex=[{
  "Name":"textxtxt",
  "Last": "JHEgjhzkjf",
},
{
  "Name":"textxtxtzfzjfz",
  "Last": "JHEgzzezeetzethzkjf",
},
]