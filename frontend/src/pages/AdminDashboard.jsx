// import { useEffect, useState } from "react";

// function AdminDashboard() {
//     const [candidates, setCandidates] = useState([]);

//     useEffect(() => {
//         fetch("http://127.0.0.1:5000/hr/candidates")
//             .then(res => res.json())
//             .then(data => setCandidates(data));
//     }, []);



//     return (
//         <div className="min-h-screen bg-slate-100 p-6">

//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-indigo-600">
//                     HR Dashboard
//                 </h1>
//                 <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
//                     Logout
//                 </button>
//             </div>

//             {/* Summary Cards */}
//             <div className="grid grid-cols-3 gap-4 mb-6">
//                 <div className="bg-white p-4 rounded-xl shadow">
//                     <p className="text-slate-500">Total Candidates</p>
//                     <h2 className="text-2xl font-bold">25</h2>
//                 </div>
//                 <div className="bg-white p-4 rounded-xl shadow">
//                     <p className="text-slate-500">Suitable</p>
//                     <h2 className="text-2xl font-bold text-green-600">14</h2>
//                 </div>
//                 <div className="bg-white p-4 rounded-xl shadow">
//                     <p className="text-slate-500">Model Accuracy</p>
//                     <h2 className="text-2xl font-bold">98%</h2>
//                 </div>
//             </div>

//             {/* Candidate Table */}
//             <div className="bg-white rounded-xl shadow overflow-hidden">
//                 <table className="w-full">
//                     <thead className="bg-slate-100 text-left">
//                         <tr>
//                             <th className="p-3">Name</th>
//                             <th className="p-3">Education</th>
//                             <th className="p-3">Experience</th>
//                             <th className="p-3">Skills</th>
//                             <th className="p-3">AI Result</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {candidates.map((c, i) => (
//                             <tr key={i} className="border-t">
//                                 <td className="p-3">{c.name}</td>
//                                 <td className="p-3">{c.education}</td>
//                                 <td className="p-3">{c.experience} yrs</td>
//                                 <td className="p-3">{c.skills}</td>
//                                 <td className="p-3">
//                                     <span
//                                         className={`px-3 py-1 rounded-full text-sm ${c.result === "Suitable"
//                                             ? "bg-green-100 text-green-700"
//                                             : "bg-red-100 text-red-700"
//                                             }`}
//                                     >
//                                         {c.result}
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default AdminDashboard;
// export default function AdminDashboard() {
//     return <h2>HR Admin Dashboard</h2>;
// }

import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [candidates, setCandidates] = useState([]);

    // TEMP mock data (replace later with backend API)
    useEffect(() => {
        setCandidates([
            {
                name: "John Doe",
                education: "Bachelor",
                experience: 3,
                skills: "React, Python, SQL",
                result: "Suitable",
            },
            {
                name: "Jane Smith",
                education: "Diploma",
                experience: 1,
                skills: "HTML, CSS",
                result: "Not Suitable",
            },
        ]);
    }, []);

    const total = candidates.length;
    const suitable = candidates.filter(c => c.result === "Suitable").length;

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        HR Dashboard
                    </h1>
                    <button className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400">
                        Logout
                    </button>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatCard title="Total Candidates" value={total} />
                    <StatCard title="AI Suitable" value={suitable} />
                    <StatCard title="Model Accuracy" value="98%" />
                </div>

                {/* CANDIDATE TABLE */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Candidate Applications
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-gray-50">
                                <tr>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Education</TableHead>
                                    <TableHead>Experience</TableHead>
                                    <TableHead>Skills</TableHead>
                                    <TableHead>AI Result</TableHead>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map((c, i) => (
                                    <tr key={i} className="border-t">
                                        <TableCell>{c.name}</TableCell>
                                        <TableCell>{c.education}</TableCell>
                                        <TableCell>{c.experience} yrs</TableCell>
                                        <TableCell>{c.skills}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${c.result === "Suitable"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"}`}
                                            >
                                                {c.result}
                                            </span>
                                        </TableCell>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

/* ---------- SMALL REUSABLE COMPONENTS ---------- */

function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

function TableHead({ children }) {
    return (
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
            {children}
        </th>
    );
}

function TableCell({ children }) {
    return (
        <td className="px-4 py-3 text-sm text-gray-700">
            {children}
        </td>
    );
}
