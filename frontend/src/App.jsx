// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import isHRApp from "./config/appMod";

// Pages
import CandidateLanding from "./pages/CandidateLanding";
import HRLanding from "./pages/HRLanding";
import CandidateForm from "./pages/CandidateForm";
import HRDashboard from "./pages/HRDashboard";
import CreateJob from "./pages/CreateJob";
import AdminDashboard from "./pages/AdminDashboard";

// Protected Route wrapper (create this file if you haven't already)
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ================= CANDIDATE APP (runs on http://localhost:5173) ================= */}
      {!isHRApp && (
        <>
          <Route path="/" element={<CandidateLanding />} />
          <Route path="/apply" element={<CandidateForm />} />

          {/* Catch-all: redirect unknown paths to candidate home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}

      {/* ================= HR APP (runs on http://localhost:5174) ================= */}
      {isHRApp && (
        <>
          {/* Public landing page */}
          <Route path="/" element={<HRLanding />} />

          {/* Protected HR routes - require user_id in localStorage */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<HRDashboard />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* You can add more protected routes here later, e.g.: */}
            {/* <Route path="/analyze" element={<AnalyzeCandidates />} /> */}
          </Route>

          {/* Catch-all: redirect unknown paths to HR landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
