import { Routes, Route, Navigate } from "react-router-dom";
import isHRApp from "./config/appMod";

// Pages
import CandidateLanding from "./pages/CandidateLanding";
import HRLanding from "./pages/HRLanding";
import CandidateForm from "./pages/CandidateForm";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* ================= CANDIDATE APP ================= */}
      {!isHRApp && (
        <>
          <Route path="/" element={<CandidateLanding />} />
          <Route path="/apply" element={<CandidateForm />} />

          {/* Block HR routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {/* ================= HR APP ================= */}
      {isHRApp && (
        <>
          <Route path="/" element={<HRLanding />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Block candidate routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
