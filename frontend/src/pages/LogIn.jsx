import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login({ loginType }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignup
        ? "/signup"
        : "/login";

      const res = await api.post(url, { email, password });

      if (!isSignup) {
        const { role, user_id, access_token } = res.data;
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("token", access_token);

        if (role === "hr") navigate("/hr/dashboard"); // Changed to unified hr route
        else navigate("/jobs");
      } else {
        alert("Account created. Please log in.");
        setIsSignup(false);
      }
    } catch {
      alert("Authentication failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-full p-2 mb-3 border rounded"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full p-2 mb-4 border rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="w-full py-2 text-white bg-indigo-600 rounded">
        {isSignup ? "Create Account" : "Login"}
      </button>

      {loginType === "candidate" && (
        <p
          className="mt-4 text-sm text-center text-indigo-600 cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New user? Create an account"}
        </p>
      )}
    </form>
  );
}
