import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import HomeAdmin from "../pages/HomeAdmin";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/homeadmin" element={<HomeAdmin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
