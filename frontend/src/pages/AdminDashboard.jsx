import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://127.0.0.1:5000/hr/candidates");
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
      await axios.post("http://127.0.0.1:5000/hr/analyze-all");
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
      await axios.delete(`http://127.0.0.1:5000/hr/candidate/${id}`);
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
            <p className="py-12 text-center text-gray-600">
              Loading applications...
            </p>
          ) : candidates.length === 0 ? (
            <div className="p-12 text-center bg-white border shadow-sm rounded-xl">
              <h3 className="mb-3 text-xl font-semibold">
                No applications yet
              </h3>
            </div>
          ) : (
            <div className="overflow-hidden bg-white border border-gray-200 shadow rounded-xl">
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
          )}
        </div>
      </div>
    </>
  );
}
