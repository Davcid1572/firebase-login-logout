import React from "react";
import "./styles.css";

const index = ({ text, onClick, blue }) => {
  return (
    <div className={blue ? "btn btn-blue" : "btn"} onClick={onClick}>
      {text}
    </div>
  );
};

export default index;
