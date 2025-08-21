import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";

const index = () => {
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="Signup-wrapper">
      <h2>
        Sign Up <span style={{ color: "var(--theme)" }}>ChiFinance</span>
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
        <Button text="Sign Up Using Email And Password" />
        <p style={{ textAlign: "center", marginTop: "0.5rem" }}>Or</p>
        <Button text="Sign Up Using Google" blue={true} />
      </form>
    </div>
  );
};

export default index;
