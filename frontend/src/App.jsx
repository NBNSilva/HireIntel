// import { Routes, Route, Navigate } from "react-router-dom";

// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import CandidateForm from "./pages/CandidateForm";
// import ThankYou from "./pages/ThankYou";
// import AdminDashboard from "./pages/AdminDashboard";

// const getRole = () => localStorage.getItem("role");

// function ProtectedRoute({ children, allowedRole }) {
//   const role = getRole();

//   if (!role) return <Navigate to="/login" />;
//   if (allowedRole && role !== allowedRole)
//     return <Navigate to="/login" />;

//   return children;
// }

// export default function App() {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/" element={<Landing />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />

//       {/* Candidate */}
//       <Route
//         path="/apply"
//         element={
//           <ProtectedRoute allowedRole="candidate">
//             <CandidateForm />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/thank-you"
//         element={
//           <ProtectedRoute allowedRole="candidate">
//             <ThankYou />
//           </ProtectedRoute>
//         }
//       />

//       {/* HR */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRole="hr">
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CandidateForm from "./pages/CandidateForm";
import AdminDashboard from "./pages/AdminDashboard";

const getRole = () => localStorage.getItem("role");

function ProtectedRoute({ children, allowedRole }) {
  const role = getRole();
  if (!role) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/apply"
        element={
          <ProtectedRoute allowedRole="candidate">
            <CandidateForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="hr">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
