import { useEffect, useState } from "react";
import { PredictionContext } from "./PredictionContext";

const STORAGE_KEY = "creditwise_prediction_result";

export default function PredictionProvider({ children }) {
  const [predictionResult, setPredictionResult] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (predictionResult) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(predictionResult));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [predictionResult]);

  return (
    <PredictionContext.Provider
      value={{
        predictionResult,
        setPredictionResult,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
}
