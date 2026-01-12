import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function HRDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jobs");
      const parsed = saved ? JSON.parse(saved) : [];
      setJobs(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Error loading jobs:", err);
      setJobs([]);
    }
  }, []);

  const deleteJob = (indexToDelete) => {
    const updatedJobs = jobs.filter((_, index) => index !== indexToDelete);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const clearAllJobs = () => {
    if (window.confirm("Are you sure you want to delete ALL job posts?")) {
      localStorage.removeItem("jobs");
      setJobs([]);
    }
  };

  return (
    <>
      <Navbar role="hr" />

      <div className="min-h-screen p-6 md:p-10 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
            {jobs.length > 0 && (
              <button
                onClick={clearAllJobs}
                className="px-4 py-2 text-sm font-medium text-red-600 transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
              >
                Clear All Jobs
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 mb-12 sm:grid-cols-2">
            <Link
              to="/admin" // ← Changed to navigate to AdminDashboard
              className="block p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:border-indigo-300"
            >
              <h2 className="text-xl font-semibold text-indigo-700">
                Analyze Candidates
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Review and score applicant submissions
              </p>
            </Link>

            <Link
              to="/create-job"
              className="block p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:border-indigo-300"
            >
              <h2 className="text-xl font-semibold text-indigo-700">
                Create Job Post
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Add a new job opening
              </p>
            </Link>
          </div>

          {/* Published Jobs */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Published Jobs ({jobs.length})
            </h2>

            {jobs.length === 0 ? (
              <div className="p-10 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
                <p className="mb-4 text-lg text-gray-500">
                  No job posts created yet.
                </p>
                <Link
                  to="/create-job"
                  className="inline-block px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Create Your First Job
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <div
                    key={index}
                    className="relative p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:border-indigo-200"
                  >
                    <h3 className="mb-3 text-xl font-semibold text-indigo-700">
                      {job.title || "Untitled Job"}
                    </h3>

                    <p className="mb-4 text-gray-700 whitespace-pre-line">
                      {job.description || "No description provided."}
                    </p>

                    {/* Skills */}
                    {job.skills?.length > 0 && (
                      <div className="mb-5">
                        <p className="mb-2 font-medium text-gray-800">Skills</p>
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

                    {/* Requirements */}
                    <div className="mb-6">
                      <p className="mb-2 font-medium text-gray-800">
                        Requirements
                      </p>
                      {Array.isArray(job.requirements) &&
                      job.requirements.length > 0 ? (
                        <ul
                          className="list-disc pl-6 space-y-1.5 text-gray-700"
                          style={{ listStyleType: "disc" }}
                        >
                          {job.requirements.map((req, i) => (
                            <li key={i} className="ml-1">
                              {req?.trim() || "—"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm italic text-gray-500">
                          No requirements specified
                        </p>
                      )}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        if (
                          window.confirm(`Delete "${job.title || "this job"}"?`)
                        ) {
                          deleteJob(index);
                        }
                      }}
                      className="absolute top-5 right-5 px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
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
