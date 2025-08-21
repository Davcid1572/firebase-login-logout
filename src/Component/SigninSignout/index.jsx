import React from "react";
import "./styles.css";
import Input from "../Input";

const index = () => {
  return (
    <div className="Signup-wrapper">
      <h2>
        Sign Up <span style={{ color: "var(--theme)" }}>ChiFinance</span> Using
        Email
      </h2>
      <form action="">
        <Input />
      </form>
    </div>
  );
};

export default index;
