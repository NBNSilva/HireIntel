import Login from "./LogIn";
import { Link } from "react-router-dom";
export default function HRLanding() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-950">
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#6366f1,_transparent_60%)]" />

      {/* MAIN CARD */}
      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-6 p-6 bg-white shadow-2xl rounded-2xl sm:p-10 md:grid-cols-2 md:gap-10">
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              HireIntel HR Portal
            </h1>
            <Link to="/" className="px-3 py-1 text-xs font-semibold text-white transition bg-indigo-600 rounded hover:bg-indigo-500 sm:text-sm">
              Candidate Site
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-600 sm:text-base">
            Secure administrative access for recruitment teams. Review candidate
            applications, analyze AI-based suitability scores, and make informed
            hiring decisions with full transparency.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-gray-600 sm:text-base">
            <li>✔ View structured candidate profiles</li>
            <li>✔ AI-assisted suitability scoring</li>
            <li className="hidden sm:block">✔ Fair and transparent shortlisting</li>
            <li className="hidden sm:block">✔ Human-in-the-loop decision making</li>
          </ul>

          <p className="mt-6 text-xs text-gray-500 sm:text-sm">
            Unauthorized access is prohibited.
          </p>
        </div>

        {/* RIGHT LOGIN PANEL */}
        <div className="p-6 shadow-inner bg-slate-50 rounded-xl sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-center text-gray-900">
            HR Login
          </h2>

          {/* EMBEDDED LOGIN (NO BUTTON) */}
          <Login loginType="hr" />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="absolute text-[10px] text-center text-gray-400 bottom-2 px-4 sm:text-sm sm:bottom-4">
        © {new Date().getFullYear()} HireIntel · HR Administration <br />
        Developing team as <a href="https://www.sofycode.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-400">SOFYCODE</a>
      </footer>
    </div>
  );
}
