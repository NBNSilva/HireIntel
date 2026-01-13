// src/pages/AvailableJobs.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AvailableJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://127.0.0.1:5000/jobs");
        setJobs(response.data);
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setError("Unable to load available positions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job) => {
    // Store job info temporarily (for showing title in form)
    localStorage.setItem("applyingToJob", JSON.stringify(job));
    navigate(`/apply?jobId=${job.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Navbar role="candidate" />

      <main className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Open Positions
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-gray-600">
            Discover exciting career opportunities and take the next step in
            your professional journey.
          </p>
        </div>

        {/* Loading / Error / Empty States */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl animate-pulse"
              >
                <div className="w-4/5 h-8 mb-4 bg-gray-200 rounded"></div>
                <div className="w-full h-4 mb-3 bg-gray-200 rounded"></div>
                <div className="w-5/6 h-4 mb-6 bg-gray-200 rounded"></div>
                <div className="w-1/3 h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="px-8 py-12 text-center text-red-700 border border-red-200 bg-red-50 rounded-2xl">
            <p className="text-lg font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 mt-6 text-white transition bg-red-600 rounded-xl hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-16 text-center bg-white border border-gray-200 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-indigo-100 rounded-full">
              <svg
                className="w-10 h-10 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              No Open Positions Right Now
            </h2>
            <p className="max-w-md mx-auto mb-8 text-gray-600">
              We're always looking for great talent. Check back soon or follow
              us for updates on new opportunities.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-xl hover:bg-indigo-700"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-2xl hover:shadow-xl hover:border-indigo-200"
              >
                <div className="flex-grow p-6">
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 transition-colors group-hover:text-indigo-700 line-clamp-2">
                    {job.title}
                  </h3>

                  <p className="mb-6 text-sm text-gray-600 line-clamp-4">
                    {job.description}
                  </p>

                  {job.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skills.slice(0, 5).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-indigo-700 border border-indigo-100 rounded-full bg-indigo-50"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 5 && (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                          +{job.skills.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {job.requirements?.length > 0 && (
                    <div className="mb-6">
                      <p className="mb-2 text-sm font-medium text-gray-700">
                        Key Requirements:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1.5">
                        {job.requirements.slice(0, 3).map((req, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 text-indigo-500">•</span>
                            <span className="line-clamp-1">{req}</span>
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-sm font-medium text-indigo-600">
                            +{job.requirements.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="px-6 pt-2 pb-6 mt-auto border-t border-gray-100">
                  <button
                    onClick={() => handleApply(job)}
                    className="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                  >
                    <span>Apply Now</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
