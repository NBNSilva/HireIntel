import { useNavigate } from "react-router-dom";

export default function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    if (role === "hr") {
      navigate("/hr"); // HR landing page
    } else {
      navigate("/"); // Candidate landing page
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-4 bg-white shadow sm:px-10">
      {/* LEFT */}
      <h1 className="text-xl font-bold text-indigo-700 cursor-pointer" onClick={() => navigate(role === "hr" ? "/hr/dashboard" : "/")}>HireIntel</h1>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {role === "hr" && (
           <span className="hidden px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full sm:block">HR Admin</span>
        )}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded transition-colors hover:bg-red-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
