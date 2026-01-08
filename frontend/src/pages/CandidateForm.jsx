import { useState } from "react";

export default function CandidateForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:5000/candidate/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        user_id: localStorage.getItem("user_id"),
      }),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="mt-20 text-center text-green-600">
        Thank you for applying. We will notify you about the job.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-10">
      <input name="firstName" onChange={handleChange} />
      <input name="lastName" onChange={handleChange} />
      <input name="email" onChange={handleChange} />
      <input name="education" onChange={handleChange} />
      <input name="experience" onChange={handleChange} />
      <input name="skills" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
