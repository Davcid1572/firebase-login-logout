import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const index = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.success("Sign-out successful.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <div className="navbar">
      <p className="logo">Chifinance</p>
      {user ? (
        <p className="logo link" onClick={handleSignOut}>
          Logout
        </p>
      ) : null}
    </div>
  );
};

export default index;
