import api from "../api/client";

export async function predictCreditRisk(data) {
  const response = await api.post("/predict", data);
  return response.data;
}

export async function getMetrics() {
  const response = await api.get("/metrics");
  return response.data;
}
