import React from "react";
import Header from "../Component/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Welcome to Dashboard {user ? user.displayName || user.email : "Guest"}
      </h1>
    </div>
  );
};

export default Dashboard;
