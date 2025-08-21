import React from "react";
import "./styles.css";

const index = ({ label, placeholder, state, setState, type }) => {
  return (
    <div className="input-wrapper">
      <p className="input-label">{label}</p>
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default index;
