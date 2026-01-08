// import { useState } from "react";

// function CandidateForm() {
//     const [submitted, setSubmitted] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData(e.target);
//         const data = Object.fromEntries(formData.entries());

//         const response = await fetch("http://127.0.0.1:5000/candidate/submit", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();

//         // TEMP: store in localStorage (simple & viva-safe)
//         localStorage.setItem(
//             "latestCandidate",
//             JSON.stringify({ ...data, result: result.prediction })
//         );

//         setSubmitted(true);

//     };

//     if (submitted) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-slate-100">
//                 <div className="bg-white p-8 rounded-xl shadow text-center">
//                     <h2 className="text-2xl font-bold text-indigo-600">
//                         Application Submitted
//                     </h2>
//                     <p className="text-slate-500 mt-2">
//                         Thank you. Our HR team will review your profile.
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-slate-100 flex items-center justify-center">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl space-y-4"
//             >
//                 <h2 className="text-2xl font-bold text-indigo-600 text-center">
//                     Candidate Application
//                 </h2>

//                 <input name="name" placeholder="Full Name" className="input" required />
//                 <input name="email" type="email" placeholder="Email" className="input" required />

//                 <select name="education" className="input">
//                     <option>Bachelor</option>
//                     <option>Master</option>
//                     <option>PhD</option>
//                 </select>

//                 <input name="experience" type="number" placeholder="Years of Experience" className="input" />
//                 <input name="skills" placeholder="Skills (comma separated)" className="input" />
//                 <input name="projects" type="number" placeholder="Number of Projects" className="input" />
//                 <input name="salary" type="number" placeholder="Expected Salary" className="input" />

//                 <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
//                     Submit Application
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default CandidateForm;
// export default function CandidateForm() {
//     return <h2>Candidate Form Page</h2>;

import { useState } from "react";

export default function CandidateForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        education: "",
        experience: "",
        skills: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    education: formData.education,
                    experience: formData.experience,
                    skills: formData.skills,
                }),
            });

            const result = await response.json();
            alert(`Application Submitted Successfully.\nAI Result: ${result.result}`);
        } catch (error) {
            alert("Server error. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center py-16">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl space-y-10"
            >

                {/* PAGE TITLE */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Candidate Application
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Please complete the form below. Your application will be evaluated
                        fairly using AI-assisted shortlisting.
                    </p>
                </div>

                {/* PERSONAL INFORMATION */}
                <div className="bg-white rounded-xl shadow p-8">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Candidate Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        This information is visible only to HR and is not used by the AI model.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <input
                                name="firstName"
                                required
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <input
                                name="lastName"
                                required
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* AI SHORTLISTING SECTION */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8">
                    <h2 className="text-lg font-semibold text-indigo-700">
                        Professional Details (Used for AI Shortlisting)
                    </h2>
                    <p className="mt-1 text-sm text-indigo-600">
                        Only the information below is analyzed by the AI model.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Highest Education Level
                            </label>
                            <select
                                name="education"
                                required
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border bg-white px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select</option>
                                <option>Diploma</option>
                                <option>Bachelor</option>
                                <option>Master</option>
                                <option>PhD</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Years of Experience
                            </label>
                            <input
                                type="number"
                                min="0"
                                name="experience"
                                required
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Skills (comma separated)
                            </label>
                            <input
                                name="skills"
                                placeholder="React, Python, SQL"
                                required
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Example: Java, Spring Boot, MySQL
                            </p>
                        </div>
                    </div>
                </div>

                {/* SUBMIT */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400"
                    >
                        Submit Application
                    </button>
                </div>

            </form>
        </div>
    );
}
