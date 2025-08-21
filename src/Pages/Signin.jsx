import React from "react";
import Headers from "../Component/Header/index.jsx";
import SignSignout from "../Component/SigninSignout";

const Signin = () => {
  return (
    <div>
      <Headers />
      <div className="wrapper">
        <SignSignout />
      </div>
    </div>
  );
};

export default Signin;
