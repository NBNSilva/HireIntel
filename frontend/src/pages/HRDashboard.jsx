// src/pages/HRDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://127.0.0.1:5000/jobs");
      setJobs(response.data);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setError("Could not load job postings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId, title) => {
    if (!window.confirm(`Delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:5000/hr/job/${jobId}`);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      alert("Job post deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete job post.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/20">
      <Navbar role="hr" />

      <main className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-6 mb-10 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              HR Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage job postings and review candidate applications
            </p>
          </div>

          <Link
            to="/create-job"
            className="inline-flex items-center px-6 py-3 font-medium text-white transition-all duration-200 bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 hover:shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Post New Job
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/admin"
            className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-2xl hover:shadow-xl hover:border-indigo-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-indigo-700">
                  Analyze Candidates
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Review applications • View AI scores • Shortlist talent
                </p>
              </div>
              <div className="text-indigo-500 transition-colors group-hover:text-indigo-600">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* You can add more action cards here in the future */}
        </div>

        {/* Job Listings Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Active Job Postings
            </h2>
            <span className="text-sm font-medium text-gray-500">
              {loading
                ? "Loading..."
                : `${jobs.length} job${jobs.length !== 1 ? "s" : ""}`}
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl animate-pulse"
                >
                  <div className="w-3/4 h-8 mb-4 bg-gray-200 rounded"></div>
                  <div className="w-full h-4 mb-3 bg-gray-200 rounded"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="px-6 py-10 text-center text-red-700 border border-red-200 bg-red-50 rounded-2xl">
              <p className="text-lg font-medium">{error}</p>
              <button
                onClick={fetchJobs}
                className="px-5 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-indigo-100 rounded-full">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                No job postings yet
              </h3>
              <p className="max-w-md mx-auto mb-8 text-gray-600">
                Create your first job opening to start attracting top talent.
              </p>
              <Link
                to="/create-job"
                className="inline-flex items-center px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-xl hover:bg-indigo-700"
              >
                Create First Job Post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md hover:border-indigo-200 group"
                >
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 transition-colors group-hover:text-indigo-700 line-clamp-2">
                      {job.title}
                    </h3>

                    <p className="mb-5 text-sm text-gray-600 line-clamp-3">
                      {job.description}
                    </p>

                    {job.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {job.skills.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium text-indigo-700 border border-indigo-100 rounded-full bg-indigo-50"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                            +{job.skills.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </span>

                      <button
                        onClick={() => handleDelete(job.id, job.title)}
                        className="text-sm font-medium text-red-600 transition-colors hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
