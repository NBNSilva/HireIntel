import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AvailableJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchJobs();
  }, []);

  const handleApply = (job) => {
    // You can store job info if needed later (e.g. show job title in form)
    localStorage.setItem("applyingToJob", JSON.stringify(job));
    navigate("/apply");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading available positions...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar role="candidate" />

      <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-indigo-50 via-slate-100 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Available Positions
            </h1>
          </div>

          {jobs.length === 0 ? (
            <div className="p-10 text-center bg-white shadow rounded-xl">
              <h2 className="mb-4 text-2xl font-semibold text-gray-700">
                No open positions right now
              </h2>
              <p className="mb-6 text-gray-600">
                New opportunities are added regularly. Please check back soon.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-6 transition bg-white border border-gray-100 shadow rounded-xl hover:border-indigo-200"
                >
                  <h2 className="mb-3 text-xl font-semibold text-indigo-700">
                    {job.title}
                  </h2>

                  <p className="mb-4 text-gray-700 whitespace-pre-line">
                    {job.description}
                  </p>

                  {job.skills?.length > 0 && (
                    <div className="mb-4">
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

                  <button
                    onClick={() => handleApply(job)}
                    className="w-full px-8 py-3 font-medium text-white transition bg-indigo-600 rounded-lg md:w-auto hover:bg-indigo-700"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
