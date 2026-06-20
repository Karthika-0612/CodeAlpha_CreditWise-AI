import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Brain,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";

import PageWrapper from "../components/PageWrapper";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    text: "Analyze credit risk using advanced machine learning models.",
  },
  {
    icon: TrendingUp,
    title: "Actionable Insights",
    text: "Understand key financial factors affecting your profile.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable Decisions",
    text: "Transparent predictions with clear recommendations.",
  },
];

export default function Landing() {
  return (
    <PageWrapper>
      <div className="bg-slate-50">
        {/* NAVBAR */}

        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-blue-600 p-2">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>

              <span className="text-xl font-bold text-slate-900">
                CreditWise AI
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/auth/login"
                className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        </header>

        {/* HERO */}

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900" />

          <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                <Sparkles className="h-4 w-4" />
                AI-driven credit intelligence
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold leading-tight text-white md:text-7xl"
              >
                Make smarter lending decisions with AI.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 max-w-2xl text-lg text-blue-100"
              >
                Predict default risk, understand financial behavior, and receive
                personalized recommendations in minutes.
              </motion.p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/auth/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-lg transition hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  to="/auth/login"
                  className="rounded-xl border border-white/30 px-8 py-4 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-900">
                Why choose CreditWise AI?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                Built with explainable AI and designed for responsible lending.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -8 }}
                    className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl"
                  >
                    <div className="mb-6 inline-flex rounded-2xl bg-blue-100 p-4">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-slate-600">{feature.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}

        <section className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-4xl font-bold text-slate-900">
              How it works
            </h2>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                "Enter your financial information",
                "AI analyzes your profile",
                "Receive personalized insights",
              ].map((step, index) => (
                <div
                  key={step}
                  className="rounded-3xl bg-slate-50 p-8 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="mt-6 text-lg font-medium text-slate-700">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}

        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-4xl font-bold text-slate-900">
              Trusted by professionals
            </h2>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {[
                {
                  name: "Financial Analyst",
                  text: "The recommendations are clear and easy to act on.",
                },
                {
                  name: "Loan Officer",
                  text: "CreditWise AI significantly speeds up our review process.",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="rounded-3xl bg-white p-8 shadow-sm"
                >
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-slate-600">"{item.text}"</p>

                  <p className="mt-6 font-semibold text-slate-900">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
