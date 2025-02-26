import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return <>{currentUser ? <Outlet /> : <Navigate to="/sign-in" />}</>;
}

export default PrivateProfile;
