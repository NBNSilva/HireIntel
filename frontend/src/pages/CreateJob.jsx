// src/pages/CreateJob.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function CreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState({});

  const handleFocus = (field) =>
    setFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) =>
    setFocused((prev) => ({ ...prev, [field]: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newJob = {
      title: title.trim(),
      description: description.trim(),
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
    };

    try {
      await axios.post("http://127.0.0.1:5000/hr/job", newJob);
      alert("Job posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create job. Please check your input and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Navbar role="hr" />

      <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white border shadow-xl rounded-2xl border-indigo-100/50">
          {/* Header */}
          <div className="px-8 py-10 text-white bg-gradient-to-r from-indigo-600 to-indigo-700">
            <h1 className="text-3xl font-bold tracking-tight">
              Create New Job Post
            </h1>
            <p className="mt-3 text-lg text-indigo-100">
              Fill in the details below to publish a new position
            </p>
          </div>

          {/* Form */}
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Job Title */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => handleFocus("title")}
                    onBlur={() => handleBlur("title")}
                    required
                    className="w-full px-4 pt-6 pb-2 transition-all border border-gray-300 rounded-lg outline-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder=" "
                  />
                  <label
                    htmlFor="title"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused.title || title
                        ? "text-xs text-indigo-600 top-2"
                        : "text-gray-500 top-4"
                    }`}
                  >
                    Job Title *
                  </label>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <div className="relative">
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onFocus={() => handleFocus("description")}
                    onBlur={() => handleBlur("description")}
                    rows={6}
                    required
                    className="w-full px-4 pt-6 pb-2 transition-all border border-gray-300 rounded-lg outline-none resize-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder=" "
                  />
                  <label
                    htmlFor="description"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused.description || description
                        ? "text-xs text-indigo-600 top-2"
                        : "text-gray-500 top-4"
                    }`}
                  >
                    Job Description *
                  </label>
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    id="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    onFocus={() => handleFocus("skills")}
                    onBlur={() => handleBlur("skills")}
                    placeholder=" "
                    className="w-full px-4 pt-6 pb-2 transition-all border border-gray-300 rounded-lg outline-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="skills"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused.skills || skills
                        ? "text-xs text-indigo-600 top-2"
                        : "text-gray-500 top-4"
                    }`}
                  >
                    Required Skills (comma separated)
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Example: React, TypeScript, Node.js, AWS
                </p>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <div className="relative">
                  <textarea
                    id="requirements"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    onFocus={() => handleFocus("requirements")}
                    onBlur={() => handleBlur("requirements")}
                    rows={6}
                    placeholder=" "
                    className="w-full px-4 pt-6 pb-2 transition-all border border-gray-300 rounded-lg outline-none resize-none peer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="requirements"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused.requirements || requirements
                        ? "text-xs text-indigo-600 top-2"
                        : "text-gray-500 top-4"
                    }`}
                  >
                    Requirements (one per line)
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Example:
                  <br />
                  • 3+ years of experience
                  <br />• Strong communication skills
                </p>
              </div>

              {/* Submit Button */}
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
                      Publishing...
                    </>
                  ) : (
                    "Publish Job Post"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer hint */}
        <p className="mt-8 text-sm text-center text-gray-500">
          All job postings are reviewed for quality and compliance before going
          live.
        </p>
      </div>
    </div>
  );
}
