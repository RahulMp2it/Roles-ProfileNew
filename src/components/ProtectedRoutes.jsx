import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // token availability
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  // token valid

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
