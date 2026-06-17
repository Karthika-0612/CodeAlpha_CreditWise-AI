from fastapi import FastAPI, HTTPException

from backend.app.schemas import CreditRequest
from backend.app.predictor import predict_credit_risk
from backend.app.recommendation_engine import (
    create_features,
    generate_recommendations
)

app = FastAPI(
    title="CreditWise AI",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to CreditWise AI API"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


@app.get("/metrics")
def metrics():

    return {
        "model": "LightGBM",
        "precision": 0.1700,
        "recall": 0.6759,
        "f1_score": 0.2717,
        "roc_auc": 0.7591
    }


@app.post("/predict")
def predict(request: CreditRequest):

    data = request.model_dump()

    engineered_features = create_features(data)

    recommendations = generate_recommendations(
        engineered_features
    )

    return {
        "message": "Demo mode: model prediction disabled",
        "input": data,
        "features": engineered_features,
        "recommendations": recommendations
    }