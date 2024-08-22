import React from "react";
import GlobalStyles from "./styles/globalStyles";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import FormLogin from "./pages/Login";
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { logged, role } = useAuth();

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<FormLogin />} />

          {/* Rotas Protegidas */}
          <Route
            path="/home"
            element={
              logged && role === "user" ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/homeadmin"
            element={
              logged && role === "admin" ? (
                <HomeAdmin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              logged && role === "admin" ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
