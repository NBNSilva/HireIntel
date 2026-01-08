import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    const data = await res.json();
    localStorage.setItem("role", data.role);
    localStorage.setItem("user_id", data.user_id);

    if (data.role === "candidate") navigate("/apply");
    if (data.role === "hr") navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded shadow w-96">
        <h2 className="mb-4 text-xl font-semibold">Login</h2>

        <input
          className="w-full px-3 py-2 mb-3 border"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-3 py-2 mb-4 border"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 text-white bg-indigo-600 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
