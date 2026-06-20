import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaBrain,
  FaChartLine,
  FaShieldAlt,
  FaBullseye,
  FaArrowUp,
  FaDownload,
  FaSyncAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

import { getMetrics } from "../services/predictionService";
import PageWrapper from "../components/PageWrapper";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      delay,
    },
  }),
};

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] = useState("");

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMetrics();

      setMetrics(data);

      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.detail || "Unable to load model metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const data = await getMetrics();

        if (!mounted) return;

        setMetrics(data);
        setLastUpdated(new Date().toLocaleString());
      } catch (err) {
        if (!mounted) return;

        console.error(err);

        setError(err.response?.data?.detail || "Unable to load model metrics.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
            <div
              className="
                h-14 w-14 animate-spin rounded-full
                border-4 border-slate-200 border-t-blue-600
              "
            />

            <p className="text-slate-600">Loading dashboard...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
          <div className="max-w-md rounded-3xl bg-white p-8 shadow-lg text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <FaExclamationTriangle className="text-2xl text-red-600" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Failed to load dashboard
            </h2>

            <p className="mt-3 text-slate-600">{error}</p>

            <button
              onClick={fetchMetrics}
              className="
                mt-6 rounded-xl bg-blue-600 px-6 py-3
                font-medium text-white
                transition hover:bg-blue-700
              "
            >
              Try Again
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const cards = [
    {
      title: "Model",
      value: metrics?.model || "N/A",
      icon: <FaBrain />,
      bg: "bg-violet-100",
      text: "text-violet-600",
      status: "Active",
    },

    {
      title: "Recall",
      value: `${((metrics?.recall || 0) * 100).toFixed(1)}%`,
      icon: <FaShieldAlt />,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      status: "High",
    },

    {
      title: "F1 Score",
      value: (metrics?.f1_score || 0).toFixed(2),
      icon: <FaBullseye />,
      bg: "bg-amber-100",
      text: "text-amber-600",
      status: "Stable",
    },

    {
      title: "ROC-AUC",
      value: (metrics?.roc_auc || 0).toFixed(2),
      icon: <FaChartLine />,
      bg: "bg-blue-100",
      text: "text-blue-600",
      status: "Excellent",
    },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero Section */}

          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="
              relative overflow-hidden rounded-3xl
              bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900
              p-8 text-white shadow-xl
            "
          >
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span
                  className="
                    rounded-full bg-white/10 px-3 py-1
                    text-sm font-medium backdrop-blur
                  "
                >
                  CreditWise AI Administration
                </span>

                <h1 className="mt-4 text-3xl font-bold md:text-5xl">
                  Model Performance Dashboard
                </h1>

                <p className="mt-4 max-w-2xl text-blue-100">
                  Monitor credit risk model performance, track key metrics, and
                  ensure reliable predictions across applications.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={fetchMetrics}
                  className="
                    flex items-center gap-2 rounded-xl
                    bg-white/10 px-5 py-3 font-medium
                    backdrop-blur transition
                    hover:bg-white/20
                  "
                >
                  <FaSyncAlt />
                  Refresh
                </button>

                <button
                  className="
                    flex items-center gap-2 rounded-xl
                    bg-white px-5 py-3 font-medium
                    text-slate-900 transition
                    hover:bg-slate-100
                  "
                >
                  <FaDownload />
                  Export Report
                </button>
              </div>
            </div>
          </motion.section>

          {/* Metric Cards */}

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                custom={index * 0.1}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="
                  rounded-3xl border border-slate-200
                  bg-white p-6 shadow-sm
                  transition hover:shadow-xl
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {card.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-slate-900">
                      {card.value}
                    </h2>
                  </div>

                  <div
                    className={`
                      ${card.bg} ${card.text}
                      flex h-14 w-14 items-center justify-center
                      rounded-2xl text-2xl
                    `}
                  >
                    {card.icon}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-emerald-600">
                  <FaArrowUp />

                  <span>{card.status}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Insights */}

          <motion.section
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="
              mt-8 rounded-3xl bg-white
              p-8 shadow-sm
            "
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Model Insights
            </h2>

            <p className="mt-2 text-slate-600">
              Key observations based on current model performance.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  Recall Optimization
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  The model emphasizes high recall to minimize false negatives
                  and improve early detection of high-risk applicants.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">
                  Strong Classification Performance
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  The ROC-AUC score indicates strong separation between low-risk
                  and high-risk applicants.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
              Last updated: {lastUpdated}
            </div>
          </motion.section>
        </div>
      </div>
    </PageWrapper>
  );
}
