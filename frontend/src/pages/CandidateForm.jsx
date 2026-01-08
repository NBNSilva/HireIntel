import { useState } from "react";

export default function CandidateForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("http://127.0.0.1:5000/candidate/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // TEMP: store in localStorage (simple & viva-safe)
    localStorage.setItem(
      "latestCandidate",
      JSON.stringify({ ...data, result: result.prediction })
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="p-8 text-center bg-white shadow rounded-xl">
          <h2 className="text-2xl font-bold text-indigo-600">
            Application Submitted
          </h2>
          <p className="mt-2 text-slate-500">
            Thank you. Our HR team will review your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-8 space-y-4 bg-white shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Candidate Application
        </h2>

        <input name="name" placeholder="Full Name" className="input" required />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          required
        />

        <select name="education" className="input">
          <option>Bachelor</option>
          <option>Master</option>
          <option>PhD</option>
        </select>

        <input
          name="experience"
          type="number"
          placeholder="Years of Experience"
          className="input"
        />
        <input
          name="skills"
          placeholder="Skills (comma separated)"
          className="input"
        />
        <input
          name="projects"
          type="number"
          placeholder="Number of Projects"
          className="input"
        />
        <input
          name="salary"
          type="number"
          placeholder="Expected Salary"
          className="input"
        />

        <button className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          Submit Application
        </button>
      </form>
    </div>
  );
}
