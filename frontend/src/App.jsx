import { Routes, Route, Navigate } from "react-router-dom";
import isHR from "./config/appMod";

import CandidateLanding from "./pages/CandidateLanding";
import CandidateForm from "./pages/CandidateForm";
import Login from "./pages/Login";

import HRLanding from "./pages/HRLanding";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* ===== CANDIDATE FLOW ===== */}
      {!isHR && (
        <>
          <Route path="/" element={<CandidateLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<CandidateForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {/* ===== HR FLOW ===== */}
      {isHR && (
        <>
          <Route path="/" element={<HRLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
