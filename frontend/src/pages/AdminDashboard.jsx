import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/hr/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data));
  }, []);

  return (
    <div className="p-10">
      <h2 className="mb-6 text-2xl font-bold">HR Dashboard</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Education</th>
            <th>Experience</th>
            <th>Skills</th>
            <th>AI Result</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.education}</td>
              <td>{c.experience}</td>
              <td>{c.skills}</td>
              <td>{c.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
