import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiCheckCircle,
  FiTrendingUp,
  FiAlertTriangle,
  FiTarget,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

import { PredictionContext } from "../context/PredictionContext";
import PageWrapper from "../components/PageWrapper";

const cardAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.4,
    },
  }),
};

export default function Recommendations() {
  const { predictionResult } = useContext(PredictionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!predictionResult) {
      navigate("/assessment", { replace: true });
    }
  }, [predictionResult, navigate]);

  const recommendations = predictionResult?.recommendations || [];

  const riskLevel = predictionResult?.risk_level || "Unknown";

  const probability = predictionResult?.probability || 0;

  const getRiskStyles = () => {
    switch (riskLevel.toLowerCase()) {
      case "low risk":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          icon: <FiShield size={18} />,
        };

      case "medium risk":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          icon: <FiAlertTriangle size={18} />,
        };

      case "high risk":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: <FiAlertTriangle size={18} />,
        };

      default:
        return {
          bg: "bg-slate-100",
          text: "text-slate-700",
          icon: <FiShield size={18} />,
        };
    }
  };

  const riskStyle = getRiskStyles();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              CREDIT IMPROVEMENT PLAN
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Personalized Recommendations
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              These AI-generated recommendations can help improve your credit
              profile and reduce lending risk.
            </p>
          </motion.div>

          {/* Summary Cards */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Risk Level</p>

                  <div
                    className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold ${riskStyle.bg} ${riskStyle.text}`}
                  >
                    {riskStyle.icon}
                    {riskLevel}
                  </div>
                </div>

                <FiTarget className="text-blue-600" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Default Probability</p>

                  <h2 className="mt-2 text-4xl font-bold text-slate-900">
                    {(probability * 100).toFixed(1)}%
                  </h2>
                </div>

                <FiTrendingUp className="text-blue-600" size={32} />
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-700"
                  style={{
                    width: `${Math.min(probability * 100, 100)}%`,
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Recommendations */}

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-100 p-3">
                <FiCheckCircle className="text-blue-600" size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Recommended Actions
                </h2>

                <p className="text-slate-600">
                  Complete these steps to strengthen your financial profile.
                </p>
              </div>
            </div>

            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardAnimation}
                    whileHover={{
                      y: -2,
                      scale: 1.01,
                    }}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition-all hover:border-blue-200 hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <FiCheckCircle className="text-emerald-600" />
                    </div>

                    <div>
                      <p className="font-medium leading-relaxed text-slate-800">
                        {item}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Priority action #{index + 1}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 p-8 text-center">
                <FiShield className="mx-auto text-emerald-600" size={48} />

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  No recommendations available
                </h3>

                <p className="mt-2 text-slate-600">
                  Complete a credit assessment to receive personalized
                  improvement suggestions.
                </p>

                <Link
                  to="/assessment"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Start Assessment
                  <FiArrowRight />
                </Link>
              </div>
            )}
          </div>

          {/* Next Steps */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg"
          >
            <h2 className="text-2xl font-bold">Track Your Progress</h2>

            <p className="mt-3 max-w-2xl text-blue-100">
              Reassess your profile after implementing these recommendations to
              monitor improvements in your risk score.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/assessment"
                className="rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-slate-100"
              >
                Reassess Credit Profile
              </Link>

              <Link
                to="/dashboard"
                className="rounded-2xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
