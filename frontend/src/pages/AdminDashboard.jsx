// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../Components/Navbar";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/hr/candidates");
      setCandidates(res.data);
    } catch (err) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      await api.post("/hr/analyze-all");
      await fetchCandidates();
    } catch (err) {
      alert("Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await api.delete(`/hr/candidate/${id}`);
      setCandidates((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar role="hr" />

      <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Candidate Applications
            </h1>
            <button
              onClick={handleAnalyze}
              disabled={analyzing || loading}
              className={`px-6 py-3 rounded-lg text-white font-medium ${
                analyzing || loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {analyzing ? "Analyzing..." : "Analyze Candidates"}
            </button>
          </div>

          {error && (
            <div className="p-4 mb-6 text-red-700 bg-red-50 rounded-xl">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 pointer-events-none">
               <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="mt-4 text-gray-600 font-medium">Loading applications...</p>
            </div>
          ) : candidates.length === 0 ? (
            <div className="p-12 text-center bg-white border border-dashed border-gray-300 shadow-sm rounded-xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-400">
                No applications yet
              </h3>
            </div>
          ) : (
            <div className="space-y-6">
              {/* MOBILE CARD VIEW */}
              <div className="grid grid-cols-1 gap-4 lg:hidden">
                {candidates.map((c) => (
                  <div key={c.id} className="p-5 bg-white border border-gray-200 shadow-sm rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{c.name}</h3>
                        <p className="text-xs text-gray-500">{c.email}</p>
                      </div>
                      <div className={`px-3 py-1 text-xs font-bold rounded-full ${
                        c.ai_score >= 75 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        AI: {c.ai_score !== null ? `${c.ai_score}%` : "—"}
                      </div>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Role:</span>
                        <span className="font-medium text-gray-900">{c.job_title}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Ex:</span>
                        <span className="font-medium text-gray-900">{c.experience} yrs</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Decision:</span>
                        <span className={`font-semibold ${c.result === "Suitable" ? "text-green-600" : "text-red-600"}`}>
                          {c.result || "Pending"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex gap-3">
                       <button className="flex-1 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">View Details</button>
                       <button onClick={() => handleDelete(c.id)} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg">Delete</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE VIEW */}
              <div className="hidden lg:block overflow-hidden bg-white border border-gray-200 shadow rounded-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Name & Email
                        </th>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Applied for
                        </th>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Education
                        </th>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Experience
                        </th>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Projects
                        </th>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Certifications
                        </th>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Skills
                        </th>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          AI Score
                        </th>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Result
                        </th>
                        <th className="px-6 py-4 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {candidates.map((c) => {
                        const score = c.ai_score;
                        const hasScore = score !== null && score !== undefined;
                        const scoreClass = hasScore
                          ? score >= 75
                            ? "text-green-600 font-bold"
                            : "text-red-600 font-bold"
                          : "text-gray-500";

                        return (
                          <tr key={c.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {c.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {c.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                              {c.job_title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                              {c.education}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                              {c.experience} years
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                              {c.projects_count}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {c.certifications}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {c.skills}
                            </td>
                            <td className="px-6 py-4 text-lg whitespace-nowrap">
                              <span className={scoreClass}>
                                {hasScore ? `${score}%` : "—"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {hasScore ? (
                                <span
                                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    c.result === "Suitable"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {c.result}
                                </span>
                              ) : (
                                <span className="inline-flex px-3 py-1 text-xs font-semibold leading-5 text-gray-800 bg-gray-100 rounded-full">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDelete(c.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
