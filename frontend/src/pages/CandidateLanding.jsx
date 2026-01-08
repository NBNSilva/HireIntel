import { Link } from "react-router-dom";

export default function CandidateLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-indigo-700">HireIntel</h1>

        <Link to="/login" className="text-sm font-medium text-indigo-600">
          Candidate Login
        </Link>
      </header>

      {/* HERO */}
      <main className="flex items-center justify-center flex-1 px-6">
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
              <Link
                to="/signup"
                className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
              >
                Apply for a Job
              </Link>

              <Link
                to="/login"
                className="px-6 py-3 font-semibold text-gray-700 border rounded-lg"
              >
                Login
              </Link>
            </div>
          </div>

          {/* INFO CARD */}
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
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} HireIntel · Ethical AI Recruitment
      </footer>
    </div>
  );
}
