// src/pages/HRDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/jobs");
      setJobs(response.data);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job post?")) {
      return;
    }

    try {
      // We'll add this endpoint in Flask next
      await axios.delete(`http://127.0.0.1:5000/hr/job/${jobId}`);
      alert("Job deleted successfully");
      fetchJobs(); // refresh list
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete job. Please try again.");
    }
  };

  return (
    <>
      <Navbar role="hr" />

      <div className="min-h-screen p-6 md:p-10 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/admin"
              className="block p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:border-indigo-300"
            >
              <h2 className="text-xl font-semibold text-indigo-700">
                Analyze Candidates
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Review and evaluate applicant submissions
              </p>
            </Link>

            <Link
              to="/create-job"
              className="block p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:border-indigo-300"
            >
              <h2 className="text-xl font-semibold text-indigo-700">
                Create New Job Post
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Add a new position to the system
              </p>
            </Link>
          </div>

          {/* Published Jobs Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Published Job Posts
              </h2>
              <span className="text-sm text-gray-600">
                {loading
                  ? "Loading..."
                  : `${jobs.length} job${jobs.length !== 1 ? "s" : ""}`}
              </span>
            </div>

            {loading ? (
              <div className="p-10 text-center bg-white shadow-sm rounded-xl">
                <p className="text-gray-500">Loading job posts...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="p-10 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
                <p className="mb-4 text-lg text-gray-500">
                  No job posts created yet.
                </p>
                <Link
                  to="/create-job"
                  className="inline-block px-6 py-3 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Create Your First Job
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="relative p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:border-indigo-200"
                  >
                    <h3 className="mb-3 text-xl font-semibold text-indigo-700">
                      {job.title}
                    </h3>

                    <p className="mb-4 text-gray-700 whitespace-pre-line">
                      {job.description}
                    </p>

                    {job.skills?.length > 0 && (
                      <div className="mb-5">
                        <p className="mb-2 font-medium text-gray-800">
                          Required Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-sm text-indigo-700 rounded-full bg-indigo-50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {job.requirements?.length > 0 && (
                      <div className="mb-6">
                        <p className="mb-2 font-medium text-gray-800">
                          Requirements
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="absolute top-5 right-5 px-4 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
