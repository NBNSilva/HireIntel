import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import CandidateLanding from "./pages/CandidateLanding";
import HRLanding from "./pages/HRLanding";
import CandidateForm from "./pages/CandidateForm";
import HRDashboard from "./pages/HRDashboard";
import CreateJob from "./pages/CreateJob";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./Components/ProtectedRoute";
import AvailableJobs from "./pages/AvailableJobs";

function App() {
  return (
    <Routes>
      {/* CANDIDATE APP */}
      <Route path="/" element={<CandidateLanding />} />
      <Route path="/jobs" element={<AvailableJobs />} />
      <Route path="/apply" element={<CandidateForm />} />

      {/* HR APP */}
      <Route path="/hr" element={<HRLanding />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/create-job" element={<CreateJob />} />
        <Route path="/hr/admin" element={<AdminDashboard />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
