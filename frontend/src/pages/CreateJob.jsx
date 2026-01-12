import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      title,
      description,
      skills: skills.split(",").map((s) => s.trim()),
      requirements: requirements.split("\n").map((r) => r.trim()),
    };

    const existingJobs = JSON.parse(localStorage.getItem("jobs")) || [];

    localStorage.setItem("jobs", JSON.stringify([...existingJobs, newJob]));

    navigate("/dashboard");
  };

  return (
    <>
      <Navbar role="hr" />

      <div className="flex justify-center min-h-screen p-10 bg-slate-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl p-8 bg-white shadow rounded-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900">Create Job Post</h2>

          {/* JOB TITLE */}
          <div className="mt-6">
            <label className="font-medium text-gray-700">Job Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4">
            <label className="font-medium text-gray-700">Job Description</label>
            <textarea
              required
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          {/* SKILLS */}
          <div className="mt-4">
            <label className="font-medium text-gray-700">
              Required Skills (comma separated)
            </label>
            <input
              placeholder="React, JavaScript, SQL"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          {/* REQUIREMENTS */}
          <div className="mt-4">
            <label className="font-medium text-gray-700">
              Requirements (one per line)
            </label>
            <textarea
              rows="4"
              placeholder={`2+ years experience\nGood communication skills`}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 text-white bg-indigo-600 rounded hover:bg-indigo-500"
          >
            Publish Job
          </button>
        </form>
      </div>
    </>
  );
}
