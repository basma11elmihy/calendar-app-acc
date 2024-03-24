import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./layout.css";

export default function Layout() {
  return (
    <>
      <div className="container">
        <Sidebar />
      </div>

      <div className="content">
        <Outlet />
      </div>
    </>
  );
}
