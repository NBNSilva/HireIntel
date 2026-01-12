// src/components/ProtectedRoute.jsx
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("user_id") !== null;

  // If not logged in → redirect to HR landing page (login)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
