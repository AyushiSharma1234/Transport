import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "../pages/Layout";

export const Authentication = () => {
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
};
