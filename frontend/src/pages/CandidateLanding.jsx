import { useState } from "react";
import Login from "../pages/LogIn";
import { Link } from "react-router-dom";

export default function CandidateLanding() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div
      className="relative min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(/bg-candidate-landing.jpeg)`,
      }}
    >
      {/* HEADER */}
      <header className="z-20 flex items-center justify-between px-6 py-4 fixed w-full top-0 shadow bg-white/80 backdrop-blur sm:px-10">
        <h1 className="text-2xl font-bold text-indigo-700">HireIntel</h1>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-gray-500 sm:inline">Candidate Portal</span>
          <Link to="/hr" className="px-3 py-1 text-sm text-white transition bg-gray-800 rounded hover:bg-gray-700">
            Switch to HR
          </Link>
        </div>
      </header>

      {/* HERO */}
      <main className="relative z-10 flex min-h-screen items-center justify-center pt-24 pb-12 px-6">
        <div className="grid items-center w-full max-w-5xl grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24">
          {/* TEXT */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-[1.2] sm:text-4xl md:text-5xl">
              Apply Smarter. <br />
              <span className="text-indigo-600">Get Evaluated Fairly.</span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              HireIntel is an AI-assisted recruitment platform designed to help
              candidates apply for jobs using a structured and transparent
              process. Instead of uploading CVs, applicants submit standardized
              information that is evaluated fairly using job-relevant criteria.
            </p>

            <p className="mt-4 text-gray-600 hidden sm:block">
              Our system ensures that all applicants are assessed consistently,
              while final hiring decisions always remain with human recruiters.
            </p>

            <div className="flex justify-center md:justify-start gap-4 mt-8">
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-8 py-4 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Apply for a Job
              </button>
            </div>
          </div>

          {/* ILLUSTRATION/IMAGE Placeholder - Can be added here for balance */}
          <div className="hidden md:block relative animate-fadeIn">
            <div className="absolute -inset-1 bg-indigo-500 rounded-full blur-2xl opacity-10"></div>
             {/* If we had an image tool, we'd use it here, but for now just leave it col-2 */}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 px-6 text-sm text-center text-gray-500 border-t border-gray-100/50 bg-white/30 backdrop-blur-sm">
        © {new Date().getFullYear()} HireIntel · Ethical AI Recruitment <br />
        Developing team as <a href="https://www.sofycode.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-500">SOFYCODE</a>
      </footer>

      {/* ================= MODAL ================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-8 bg-white shadow-xl rounded-xl animate-fadeIn">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="relative bottom-0 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* LOGIN / SIGNUP COMPONENT */}
            <h3 className="mb-4 text-xl font-semibold text-center text-gray-900">
              Sign in to Apply
            </h3>

            <Login loginType="candidate" />
          </div>
        </div>
      )}
    </div>
  );
}
