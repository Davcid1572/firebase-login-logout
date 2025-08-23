import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(false);

  function signupFunction() {
    setLoading(true);
    console.log("name", name);
    console.log("email", email);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        console.log("Signing up with", { name, email, password });
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);
            toast.success("User signed up successfully!");
            navigate("/dashboard");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(`Error: ${errorMessage}`);
            // ..
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.error("Passwords do not match.");
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all fields.");
      setLoading(false);
    }
  }

  function signinFunction() {
    setLoading(true);
    console.log("Signing in with", { email, password });
    if (email !== "" && password !== "") {
      // Call your sign-in function here
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
          toast.success("User signed in successfully!");
          navigate("/dashboard");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(`Error: ${errorMessage}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Please fill in all fields.");
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="Signup-wrapper">
          <h2>
            Login In <span style={{ color: "var(--theme)" }}>ChiFinance</span>
          </h2>
          <form action="">
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
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Sign In Using Email And Password"}
              onClick={signinFunction}
            />
            <p style={{ textAlign: "center", marginTop: "0.5rem" }}>Or</p>
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Sign In Using Google"}
              blue={true}
            />
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "var(--theme)", cursor: "pointer" }}
                onClick={() => setLoginForm(false)}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className="Signup-wrapper">
          <h2>
            Sign Up <span style={{ color: "var(--theme)" }}>ChiFinance</span>
          </h2>
          <form action="">
            <Input
              label="Full Name"
              placeholder="John Doe"
              state={name}
              setState={setName}
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
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Sign Up Using Email And Password"}
              onClick={signupFunction}
            />
            <p style={{ textAlign: "center", marginTop: "0.5rem" }}>Or</p>
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Sign Up Using Google"}
              blue={true}
            />
            <p style={{ textAlign: "center" }}>
              {" "}
              Already have an account?{" "}
              <span
                style={{
                  color: "var(--theme)",
                  cursor: "pointer",
                }}
                onClick={() => setLoginForm(true)}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default index;
