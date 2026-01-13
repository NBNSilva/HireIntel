// src/pages/CandidateForm.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function CandidateForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");

  // Optional: show job title (from localStorage or passed state)
  const applyingJob = JSON.parse(localStorage.getItem("applyingToJob") || "{}");

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
  const [focused, setFocused] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (field) =>
    setFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) =>
    setFocused((prev) => ({ ...prev, [field]: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:5000/candidate/submit", {
        ...formData,
        user_id: localStorage.getItem("user_id"),
        job_id: jobId ? Number(jobId) : null,
      });

      setSubmitted(true);
      localStorage.removeItem("applyingToJob"); // cleanup
    } catch (err) {
      console.error(err);
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="w-full max-w-lg p-10 text-center bg-white border border-indigo-100 shadow-xl rounded-2xl">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Application Submitted Successfully!
          </h2>

          <p className="mb-2 text-lg text-gray-600">Thank you for applying.</p>
          <p className="mb-8 text-gray-500">
            Our team will review your application shortly. You'll be contacted
            if your profile matches the role.
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center px-8 py-4 font-medium text-white transition bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 hover:shadow-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Navbar role="candidate" />

      <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white border shadow-xl rounded-2xl border-indigo-100/50">
          {/* Header / Job Info */}
          <div className="px-8 py-10 text-white bg-gradient-to-r from-indigo-600 to-indigo-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Job Application
                </h1>
                {applyingJob.title && (
                  <p className="mt-3 text-lg font-medium text-indigo-100">
                    Applying for:{" "}
                    <span className="font-semibold text-white">
                      {applyingJob.title}
                    </span>
                  </p>
                )}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 lg:p-12">
            <p className="mb-10 text-lg text-gray-600">
              Please fill in your details below. All fields marked are required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="pb-3 text-2xl font-semibold text-gray-900 border-b border-gray-200">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={() => handleFocus("firstName")}
                      onBlur={() => handleBlur("firstName")}
                      required
                      className="w-full px-4 pt-6 pb-2 transition-all border border-gray-300 rounded-lg outline-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder=" "
                    />
                    <label
                      htmlFor="firstName"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focused.firstName || formData.firstName
                          ? "text-xs text-indigo-600 top-2"
                          : "text-gray-500 top-4"
                      }`}
                    >
                      First Name *
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocus={() => handleFocus("lastName")}
                      onBlur={() => handleBlur("lastName")}
                      required
                      className="w-full px-4 pt-6 pb-2 transition-all border border-gray-300 rounded-lg outline-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder=" "
                    />
                    <label
                      htmlFor="lastName"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focused.lastName || formData.lastName
                          ? "text-xs text-indigo-600 top-2"
                          : "text-gray-500 top-4"
                      }`}
                    >
                      Last Name *
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    required
                    className="w-full px-4 pt-6 pb-2 transition-all border border-gray-300 rounded-lg outline-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused.email || formData.email
                        ? "text-xs text-indigo-600 top-2"
                        : "text-gray-500 top-4"
                    }`}
                  >
                    Email Address *
                  </label>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-6">
                <h2 className="pb-3 text-2xl font-semibold text-gray-900 border-b border-gray-200">
                  Education
                </h2>

                <div className="relative">
                  <select
                    name="education"
                    id="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    className="w-full px-4 pt-6 pb-2 transition-all bg-white border border-gray-300 rounded-lg outline-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="" disabled hidden></option>
                    <option value="Diploma">Diploma</option>
                    <option value="Higher National Diploma">
                      Higher National Diploma
                    </option>
                    <option value="Bachelor Degree">Bachelor Degree</option>
                    <option value="Master Degree">Master Degree</option>
                    <option value="Other">Other</option>
                  </select>
                  <label
                    htmlFor="education"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused.education || formData.education
                        ? "text-xs text-indigo-600 top-2"
                        : "text-gray-500 top-4"
                    }`}
                  >
                    Highest Qualification *
                  </label>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-6">
                <h2 className="pb-3 text-2xl font-semibold text-gray-900 border-b border-gray-200">
                  Work Experience
                </h2>

                <div className="relative">
                  <input
                    type="number"
                    name="experience"
                    id="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    onFocus={() => handleFocus("experience")}
                    onBlur={() => handleBlur("experience")}
                    min="0"
                    required
                    className="w-full px-4 pt-6 pb-2 transition-all border border-gray-300 rounded-lg outline-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder=" "
                  />
                  <label
                    htmlFor="experience"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused.experience || formData.experience
                        ? "text-xs text-indigo-600 top-2"
                        : "text-gray-500 top-4"
                    }`}
                  >
                    Years of Experience *
                  </label>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <h2 className="pb-3 text-2xl font-semibold text-gray-900 border-b border-gray-200">
                  Skills
                </h2>

                <div className="relative">
                  <textarea
                    name="skills"
                    id="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    onFocus={() => handleFocus("skills")}
                    onBlur={() => handleBlur("skills")}
                    rows={5}
                    required
                    className="w-full px-4 pt-6 pb-2 transition-all border border-gray-300 rounded-lg outline-none resize-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder=" "
                  />
                  <label
                    htmlFor="skills"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused.skills || formData.skills
                        ? "text-xs text-indigo-600 top-2"
                        : "text-gray-500 top-4"
                    }`}
                  >
                    Skills (comma separated) *
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                    loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.01]"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-5 h-5 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
