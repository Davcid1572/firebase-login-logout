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
          placeholder="John Doe"
          state={state}
          setState={setState}
          type="text"
        />
        <Input
          label="Email"
          placeholder="John@example.com"
          state={email}
          setState={setEmail}
          type="email"
        />
        <Input
          label="Password"
          placeholder="123password"
          state={password}
          setState={setPassword}
          type="password"
        />
        <Input
          label="Confirm Password"
          placeholder="123password"
          state={confirmPassword}
          setState={setConfirmPassword}
          type="password"
        />
      </form>
    </div>
  );
};

export default index;
