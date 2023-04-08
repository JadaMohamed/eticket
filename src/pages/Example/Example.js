import React from "react";
import { useParams } from "react-router-dom";
import "./Example.css";

function Example() {
  let { meow } = useParams(); // this has to much what we put after (:) in this case :meow
  console.log(meow);
  return (
    <div>
      <h1>{meow ? meow : "YOU CAN ADD A MEOW PARAMETER"}</h1>
    </div>
  );
}

export default Example;
