import Login from "./LogIn";
export default function HRLanding() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-950">
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#6366f1,_transparent_60%)]" />

      {/* MAIN CARD */}
      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-10 p-10 bg-white shadow-2xl rounded-2xl md:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900">
            HireIntel HR Portal
          </h1>

          <p className="mt-4 text-gray-600">
            Secure administrative access for recruitment teams. Review candidate
            applications, analyze AI-based suitability scores, and make informed
            hiring decisions with full transparency.
          </p>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✔ View structured candidate profiles</li>
            <li>✔ AI-assisted suitability scoring</li>
            <li>✔ Fair and transparent shortlisting</li>
            <li>✔ Human-in-the-loop decision making</li>
          </ul>

          <p className="mt-6 text-sm text-gray-500">
            Unauthorized access is prohibited.
          </p>
        </div>

        {/* RIGHT LOGIN PANEL */}
        <div className="p-8 shadow-inner bg-slate-50 rounded-xl">
          <h2 className="mb-4 text-xl font-semibold text-center text-gray-900">
            HR Login
          </h2>

          {/* EMBEDDED LOGIN (NO BUTTON) */}
          <Login loginType="hr" />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="absolute text-sm text-gray-400 bottom-4">
        © {new Date().getFullYear()} HireIntel · HR Administration
      </footer>
    </div>
  );
}
