import React from "react";
import { Outlet } from "react-router-dom";
// import { Layout } from "./Navbar";

export const Authentication = () => {
  return (
    <>
      {/* <Layout /> */}
      <Outlet />
    </>
  );
};
