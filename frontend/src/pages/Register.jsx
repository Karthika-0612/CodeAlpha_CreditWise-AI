import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(formData);
      navigate("/auth/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-3xl font-bold">Create Account</h1>

        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-6 w-full rounded-lg border p-3"
        />

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 text-white transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
