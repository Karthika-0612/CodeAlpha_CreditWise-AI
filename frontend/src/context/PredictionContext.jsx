import { createContext } from "react";

export const PredictionContext = createContext({
  predictionResult: null,
  setPredictionResult: () => {},
});
