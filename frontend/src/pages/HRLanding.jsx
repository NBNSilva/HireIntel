export default function HRLanding() {
  const handleLoginRedirect = () => {
    window.location.href = "http://localhost:5173/login";
    // In production: https://hireintel.com/login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-white bg-gray-900">
      <h1 className="mb-4 text-4xl font-bold">HireIntel HR Portal</h1>

      <p className="max-w-xl mb-8 text-center text-gray-300">
        This portal is restricted to authorized HR personnel only. Access
        provides AI-assisted candidate shortlisting, audit logs, and transparent
        decision support tools.
      </p>

      <button
        onClick={handleLoginRedirect}
        className="px-8 py-3 font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-500"
      >
        Proceed to HR Login
      </button>

      <p className="mt-6 text-sm text-gray-400">
        Unauthorized access is prohibited.
      </p>
    </div>
  );
}
