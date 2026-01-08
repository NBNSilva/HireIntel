import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <h1 className="mb-4 text-4xl font-bold">HireIntel</h1>
      <p className="mb-6 text-gray-600">
        Intelligent, Fair & Transparent AI-Powered Recruitment
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 text-white bg-indigo-600 rounded-md"
        >
          Login
        </Link>
        <Link to="/signup" className="px-6 py-2 border rounded-md">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
