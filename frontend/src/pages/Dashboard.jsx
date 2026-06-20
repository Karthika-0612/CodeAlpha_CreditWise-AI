import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiShield,
  FiFileText,
  FiCheckCircle,
  FiArrowUpRight,
} from "react-icons/fi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import Card from "../components/Card";
import ScoreGauge from "../components/ScoreGauge";
import PageWrapper from "../components/PageWrapper";
import { PredictionContext } from "../context/PredictionContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function Dashboard() {
  const { predictionResult } = useContext(PredictionContext);

  const probability = predictionResult?.probability ?? 0;
  const creditScore = predictionResult?.credit_score ?? 0;
  const riskScore = predictionResult?.risk_score ?? 0;
  const riskLevel = predictionResult?.risk_level ?? "Unknown";

  const debtRatio = predictionResult?.features?.debt_to_income_ratio ?? 0;

  const stats = [
    {
      title: "Credit Score",
      value: creditScore,
      subtitle:
        creditScore >= 80
          ? "Excellent standing"
          : creditScore >= 60
            ? "Good standing"
            : "Needs improvement",
      icon: FiShield,
    },
    {
      title: "Default Probability",
      value: `${(probability * 100).toFixed(1)}%`,
      subtitle: "AI predicted risk",
      icon: FiTrendingUp,
    },
    {
      title: "Debt-to-Income",
      value: debtRatio.toFixed(2),
      subtitle: "Monthly debt obligations",
      icon: FiFileText,
    },
    {
      title: "Risk Level",
      value: riskLevel,
      subtitle: `${riskScore}% risk score`,
      icon: FiCheckCircle,
    },
  ];

  const chartData = {
    labels: ["Current"],

    datasets: [
      {
        label: "Default Risk %",
        data: [(probability * 100).toFixed(1)],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: 100,

        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-blue-600">CREDITWISE AI</p>

              <h1 className="mt-1 text-4xl font-bold text-slate-900">
                Risk Analytics Dashboard
              </h1>

              <p className="mt-2 text-slate-600">
                Monitor applications, approval rates, and credit risk trends.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-sm text-slate-500">Last updated</p>

              <p className="font-semibold text-slate-900">
                {new Date().toLocaleString()}
              </p>
            </div>
          </motion.div>

          <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {predictionResult
                    ? "Continue your assessment"
                    : "Start your credit assessment"}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {predictionResult
                    ? "View results or update your profile with a new analysis."
                    : "Complete your profile in the assessment to generate your first credit report."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/assessment"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {predictionResult ? "Update Assessment" : "Start Assessment"}
                </Link>
                {predictionResult && (
                  <Link
                    to="/results"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    View Results
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {stat.title}
                        </p>

                        <h3 className="mt-3 text-3xl font-bold text-slate-900">
                          {stat.value}
                        </h3>

                        <p className="mt-2 text-sm text-emerald-600">
                          {stat.subtitle}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-blue-50 p-3">
                        <Icon className="text-blue-600" size={24} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <Card className="h-full">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Risk Analysis
                    </h2>

                    <p className="text-sm text-slate-500">
                      AI-generated risk indicators
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
                    <FiArrowUpRight />
                    {riskLevel}
                  </div>
                </div>

                <div className="h-80">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </Card>
            </div>

            <Card>
              <div className="text-center">
                <h2 className="text-xl font-bold text-slate-900">
                  Credit Health
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current customer profile
                </p>

                <div className="mt-8 flex justify-center">
                  <ScoreGauge score={creditScore} />
                </div>

                <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
                  <p className="font-semibold text-emerald-700">{riskLevel}</p>

                  <p className="mt-1 text-sm text-emerald-600">
                    Default probability: {(probability * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
