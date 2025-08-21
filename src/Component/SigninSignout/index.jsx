import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";

const index = () => {
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="Signup-wrapper">
      <h2>
        Sign Up <span style={{ color: "var(--theme)" }}>ChiFinance</span> Using
        Email
      </h2>
      <form action="">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          state={state}
          setState={setState}
          type="text"
        />
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          state={state}
          setState={setState}
          type="text"
        />
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          state={state}
          setState={setState}
          type="text"
        />
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          state={state}
          setState={setState}
          type="text"
        />
      </form>
    </div>
  );
};

export default index;
