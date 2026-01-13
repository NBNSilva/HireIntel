import { useState } from "react";
import Login from "../pages/LogIn";

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
      <header className="z-10 flex items-start justify-between px-10 py-6 shadow bg-white/80 backdrop-blur">
        <h1 className="text-2xl font-bold text-indigo-700">HireIntel</h1>
        <span className="text-sm text-gray-500">Candidate Portal</span>
      </header>

      {/* HERO */}
      <main className="relative z-10 flex items-center justify-center flex-1 px-6 top-20 right-20">
        <div className="grid items-center w-full max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* TEXT */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Apply Smarter. <br />
              Get Evaluated Fairly.
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              HireIntel is an AI-assisted recruitment platform designed to help
              candidates apply for jobs using a structured and transparent
              process. Instead of uploading CVs, applicants submit standardized
              information that is evaluated fairly using job-relevant criteria.
            </p>

            <p className="mt-4 text-gray-600">
              Our system ensures that all applicants are assessed consistently,
              while final hiring decisions always remain with human recruiters.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-500"
              >
                Apply for a Job
              </button>
            </div>
          </div>

          {/* INFO CARD
          <div className="p-8 bg-white shadow rounded-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              How It Works
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>✔ Create an account</li>
              <li>✔ Fill a structured application form</li>
              <li>✔ Get evaluated using AI-assisted shortlisting</li>
              <li>✔ Await HR decision</li>
            </ul>
          </div> */}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 py-6 text-sm text-center text-gray-500 top-36">
        © {new Date().getFullYear()} HireIntel · Ethical AI Recruitment
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
