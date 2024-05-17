import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Authentication = () => {
  const { auth } = useContext(AppContext);
  console.log('auth',auth)

  return auth ? <Outlet /> : <Navigate to={"/login"} />;
};
