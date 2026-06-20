import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { predictCreditRisk } from "../services/predictionService";
import { PredictionContext } from "../context/PredictionContext";
import PageWrapper from "../components/PageWrapper";

const steps = ["Personal", "Employment", "Financial", "Credit History"];

export default function Assessment() {
  const navigate = useNavigate();

  const { setPredictionResult } = useContext(PredictionContext);

  const STORAGE_KEY = "creditwise_assessment_state";

  const defaultFormData = {
    age: 32,
    annual_income: 600000,
    loan_amount: 200000,
    annuity_amount: 15000,
    employment_years: 5,
    number_of_children: 1,
    credit_inquiries: 1,
    ext_score_mean: 0.72,
  };

  const getInitialAssessmentState = () => {
    if (typeof window === "undefined") {
      return {
        step: 1,
        formData: defaultFormData,
      };
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return {
          step: 1,
          formData: defaultFormData,
        };
      }

      const parsed = JSON.parse(stored);

      return {
        step: parsed?.step ?? 1,
        formData: parsed?.formData ?? defaultFormData,
      };
    } catch {
      localStorage.removeItem(STORAGE_KEY);

      return {
        step: 1,
        formData: defaultFormData,
      };
    }
  };

  const initialState = getInitialAssessmentState();

  const [step, setStep] = useState(initialState.step);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState(initialState.formData);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, formData }));
  }, [step, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError("");

    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.age > 0;

      case 2:
        return formData.employment_years >= 0;

      case 3:
        return formData.annual_income > 0 && formData.loan_amount > 0;

      case 4:
        return formData.ext_score_mean >= 0;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) {
      setError("Please complete all required fields.");
      return;
    }

    setStep((prev) => Math.min(prev + 1, 4));
  };

  const previousStep = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const result = await predictCreditRisk(formData);

      console.log("Prediction Result:", result);

      setPredictionResult(result);
      localStorage.removeItem(STORAGE_KEY);

      navigate("/results");
    } catch (err) {
      setError(err.response?.data?.detail || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100";

  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-8 shadow-xl"
          >
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-slate-900">
                Credit Assessment
              </h1>

              <p className="mt-3 text-slate-600">
                Complete your profile to receive an AI-powered credit risk
                analysis.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-500">
                {steps.map((item, index) => (
                  <span
                    key={item}
                    className={
                      step >= index + 1 ? "font-semibold text-blue-600" : ""
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-4 h-3 rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${(step / 4) * 100}%`,
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {step === 1 && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="age" className="font-medium text-slate-700">
                      Age
                    </label>

                    <input
                      id="age"
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <p className="mt-1 text-sm text-slate-500">
                      Enter your age in years.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="children"
                      className="font-medium text-slate-700"
                    >
                      Number of Children
                    </label>

                    <input
                      id="children"
                      type="number"
                      name="number_of_children"
                      value={formData.number_of_children}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label
                    htmlFor="employment"
                    className="font-medium text-slate-700"
                  >
                    Employment Duration
                  </label>

                  <input
                    id="employment"
                    type="number"
                    name="employment_years"
                    value={formData.employment_years}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  <p className="mt-1 text-sm text-slate-500">
                    Total years of employment.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="font-medium text-slate-700">
                      Annual Income (₹)
                    </label>

                    <input
                      type="number"
                      name="annual_income"
                      value={formData.annual_income}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-slate-700">
                      Loan Amount (₹)
                    </label>

                    <input
                      type="number"
                      name="loan_amount"
                      value={formData.loan_amount}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-medium text-slate-700">
                      Monthly EMI (₹)
                    </label>

                    <input
                      type="number"
                      name="annuity_amount"
                      value={formData.annuity_amount}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="font-medium text-slate-700">
                      Credit Inquiries
                    </label>

                    <input
                      type="number"
                      name="credit_inquiries"
                      value={formData.credit_inquiries}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-slate-700">
                      External Credit Score
                    </label>

                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      name="ext_score_mean"
                      value={formData.ext_score_mean}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <p className="mt-1 text-sm text-slate-500">
                      Value between 0 and 1.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            <div className="mt-10 flex justify-between">
              <button
                onClick={previousStep}
                disabled={step === 1}
                className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white shadow-lg transition hover:bg-blue-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="rounded-xl bg-emerald-600 px-8 py-3 font-medium text-white shadow-lg transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loading ? "Analyzing..." : "Analyze Credit Risk"}
                </button>
              )}
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6">
              <div className="grid gap-4 md:grid-cols-3 text-sm text-slate-600">
                <div>✓ Bank-grade encryption</div>
                <div>✓ No impact on credit score</div>
                <div>✓ Results in under 10 seconds</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
