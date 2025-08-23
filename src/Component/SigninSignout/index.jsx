import React, { use, useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  validatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, doc, setDoc, db, getDoc, provider } from "../../firebase";
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
          .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);
            toast.success("User signed up successfully!");
            navigate("/dashboard");
            createDoc(user);
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

  // async function signupFunction() {
  //   setLoading(true);
  //   console.log("name", name);
  //   console.log("email", email);

  //   if (
  //     name !== "" &&
  //     email !== "" &&
  //     password !== "" &&
  //     confirmPassword !== ""
  //   ) {
  //     if (password === confirmPassword) {
  //       try {
  //         // ✅ Validate password strength using Firebase Password Policy API
  //         const status = await validatePassword(auth, password);

  //         console.log("Password validation status:", status);

  //         if (!status.isValid) {
  //           // Collect feedback for the user
  //           let message = "Password does not meet the requirements: ";

  //           if (status.containsLowercaseLetter === false) {
  //             message += "Must contain a lowercase letter. ";
  //           }
  //           if (status.containsUppercaseLetter === false) {
  //             message += "Must contain an uppercase letter. ";
  //           }
  //           if (status.containsNumericCharacter === false) {
  //             message += "Must contain a number. ";
  //           }
  //           if (status.containsNonAlphanumericCharacter === false) {
  //             message += "Must contain a special character. ";
  //           }
  //           if (status.meetsMinPasswordLength === false) {
  //             message += `Must be at least ${status.passwordPolicy.minPasswordLength} characters long. `;
  //           }

  //           toast.error(message);
  //           setLoading(false);
  //           return; // ❌ stop signup if password fails validation
  //         }

  //         // ✅ If password is valid, proceed with signup
  //         console.log("Signing up with", { name, email, password });

  //         const userCredential = await createUserWithEmailAndPassword(
  //           auth,
  //           email,
  //           password
  //         );
  //         const user = userCredential.user;

  //         console.log("User signed up:", user);
  //         toast.success("User signed up successfully!");
  //         navigate("/dashboard");

  //         setName("");
  //         setEmail("");
  //         setPassword("");
  //         setConfirmPassword("");
  //       } catch (error) {
  //         const errorMessage = error.message;
  //         toast.error(`Error: ${errorMessage}`);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       toast.error("Passwords do not match.");
  //       setLoading(false);
  //     }
  //   } else {
  //     toast.error("Please fill in all fields.");
  //     setLoading(false);
  //   }
  // }

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
          createDoc(user);
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

  async function createDoc(user) {
    if (!user) return;
    const data = {
      name: user.displayName || name,
      email: user.email,
      date: new Date(),
      image: user.photoURL || "",
    };

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      try {
        await setDoc(userRef, data);
        toast.success("User document created successfully!");
      } catch (error) {
        toast.error("Error" + error.message);
      }
    } else {
      toast.info("User document already exists.");
    }
  }

  function signinWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate("/dashboard");
        toast.success("User signed in successfully!");
        createDoc(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error: ${errorMessage}`);
      });
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
              onClick={signinWithGoogle}
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
              onClick={signinWithGoogle}
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
