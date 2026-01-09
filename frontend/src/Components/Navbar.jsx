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
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow">
      {/* LEFT */}
      <h1 className="text-xl font-bold text-indigo-700">HireIntel</h1>

      {/* RIGHT */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-400"
      >
        Logout
      </button>
    </nav>
  );
}
