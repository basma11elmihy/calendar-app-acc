import { useRoutes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/dashboard/home" replace />,
    },
    {
      path: "dashboard",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
  ]);
}
