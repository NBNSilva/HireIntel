import { useEffect, useState } from "react";

function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/hr/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">HR Dashboard</h1>
        <button className="px-4 py-2 text-white bg-red-500 rounded-lg">
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-xl">
          <p className="text-slate-500">Total Candidates</p>
          <h2 className="text-2xl font-bold">25</h2>
        </div>
        <div className="p-4 bg-white shadow rounded-xl">
          <p className="text-slate-500">Suitable</p>
          <h2 className="text-2xl font-bold text-green-600">14</h2>
        </div>
        <div className="p-4 bg-white shadow rounded-xl">
          <p className="text-slate-500">Model Accuracy</p>
          <h2 className="text-2xl font-bold">98%</h2>
        </div>
      </div>

      {/* Candidate Table */}
      <div className="overflow-hidden bg-white shadow rounded-xl">
        <table className="w-full">
          <thead className="text-left bg-slate-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Education</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Skills</th>
              <th className="p-3">AI Result</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.education}</td>
                <td className="p-3">{c.experience} yrs</td>
                <td className="p-3">{c.skills}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      c.result === "Suitable"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
