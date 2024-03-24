import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <Link
            className={`sidebar-link ${
              location.pathname.includes("home") ? `active` : ``
            }`}
            to="/dashboard/home"
          >
            <FontAwesomeIcon className="sidebar-ic" icon={faHome} />
            <p className="sidebar-text">Home</p>
          </Link>
        </li>

        <li className="sidebar-item">
          <Link
            className={`sidebar-link ${
              location.pathname === "/dashboard" ? `active` : ``
            }`}
            to="/dashboard"
          >
            <FontAwesomeIcon className="sidebar-ic" icon={faDashboard} />
            <p className="sidebar-text">Dashboard</p>
          </Link>
        </li>

        <li className="sidebar-item">
          <Link
            className={`sidebar-link ${
              location.pathname.includes("login") ? `active` : ``
            }`}
            to="/login"
          >
            <FontAwesomeIcon className="sidebar-ic" icon={faArrowCircleLeft} />
            <p className="sidebar-text">Logout</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
