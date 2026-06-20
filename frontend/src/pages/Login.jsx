import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

import PageWrapper from "../components/PageWrapper";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);

      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.detail || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-1 overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-2">
            {/* Left Panel */}

            <div className="hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/20 p-3">
                    <FiShield size={28} />
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold">CreditWise AI</h1>

                    <p className="text-blue-100">
                      Intelligent Credit Risk Analysis
                    </p>
                  </div>
                </div>

                <div className="mt-16">
                  <h2 className="text-4xl font-bold leading-tight">
                    Smarter lending decisions powered by AI.
                  </h2>

                  <p className="mt-6 text-lg text-blue-100">
                    Analyze risk, improve approvals, and make data-driven
                    financial decisions with explainable AI.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Real-time risk assessment",
                  "Explainable AI predictions",
                  "Personalized recommendations",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <FiCheckCircle className="text-emerald-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel */}

            <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
              >
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Welcome back
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-slate-900">
                    Sign in
                  </h2>

                  <p className="mt-3 text-slate-600">
                    Access your credit analytics dashboard.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  {/* Password */}

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700"
                      >
                        Password
                      </label>

                      <span className="text-sm text-slate-500">
                        Forgot password? Contact support.
                      </span>
                    </div>

                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-12 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                      >
                        {showPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}

                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />

                      <span className="text-sm text-slate-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  {/* Error Message */}

                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Create account
                  </Link>
                </p>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <FiShield className="mt-1 text-emerald-600" />

                    <div>
                      <p className="font-medium text-slate-900">
                        Secure Authentication
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Your credentials are encrypted and protected using
                        industry-standard security practices.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
