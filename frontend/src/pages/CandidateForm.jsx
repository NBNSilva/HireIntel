import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function CandidateForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:5000/candidate/submit", {
        ...formData,
        user_id: localStorage.getItem("user_id"),
      });

      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= THANK YOU SCREEN =================
  if (submitted) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
          <div className="max-w-lg p-10 text-center bg-white shadow rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Application Submitted 🎉
            </h2>

            <p className="mt-4 text-gray-600">
              Thank you for applying through HireIntel. Your application has
              been successfully received and will be reviewed by our HR team.
            </p>

            <p className="mt-2 text-gray-600">
              You will be contacted if you are shortlisted.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= FORM =================
  return (
    <div>
      <Navbar role="candidate" />
      <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-indigo-50 via-slate-100 to-white">
        <div className="max-w-3xl p-10 mx-auto bg-white shadow-lg rounded-2xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Job Application Form
          </h1>
          <p className="mb-8 text-gray-600">
            Please complete the form below. All fields are required unless
            stated otherwise.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PERSONAL DETAILS */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-indigo-600"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-indigo-600"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 mt-4 border rounded-lg focus:outline-indigo-600"
              />
            </div>

            {/* EDUCATION */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Education
              </h2>

              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-indigo-600"
              >
                <option value="">Select highest qualification</option>
                <option value="Diploma">Diploma</option>
                <option value="Higher National Diploma">
                  Higher National Diploma
                </option>
                <option value="Bachelor Degree">Bachelor Degree</option>
                <option value="Master Degree">Master Degree</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* EXPERIENCE */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Work Experience
              </h2>

              <input
                type="number"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                required
                className="w-full p-3 border rounded-lg focus:outline-indigo-600"
              />
            </div>

            {/* SKILLS */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Skills
              </h2>

              <textarea
                name="skills"
                placeholder="Enter your skills separated by commas (e.g. React, Python, SQL)"
                value={formData.skills}
                onChange={handleChange}
                rows={4}
                required
                className="w-full p-3 border rounded-lg focus:outline-indigo-600"
              />
            </div>

            {/* SUBMIT */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
