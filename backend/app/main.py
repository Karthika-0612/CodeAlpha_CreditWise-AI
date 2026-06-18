from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database import get_db

from backend.app.schemas import CreditRequest

from backend.app.predictor import predict_credit_risk

from backend.app.recommendation_engine import (
    create_features,
    generate_recommendations
)

# Uncomment these when your CRUD functions are ready
# from backend.app.crud import (
#     create_application,
#     save_prediction
# )

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
def predict(
    request: CreditRequest,
    db: Session = Depends(get_db)
):
    data = request.model_dump()

    if data["annual_income"] <= 0:
        raise HTTPException(
            status_code=400,
            detail="Annual income must be positive."
        )

    engineered_features = create_features(data)

    recommendations = generate_recommendations(
        engineered_features
    )

    # Enable this later when the prediction pipeline is ready
    # prediction, probability = predict_credit_risk(data)

    # Save application data later
    # application = create_application(
    #     db,
    #     {
    #         "annual_income": data["annual_income"],
    #         "loan_amount": data["loan_amount"],
    #         "employment_years": data["employment_years"],
    #         "number_of_children": data["number_of_children"]
    #     }
    # )

    # Save prediction data later
    # save_prediction(
    #     db,
    #     {
    #         "application_id": application.id,
    #         "prediction": int(prediction),
    #         "default_probability": float(probability),
    #         "risk_level": (
    #             "High"
    #             if probability > 0.5
    #             else "Low"
    #         )
    #     }
    # )

    return {
        "message": "Demo mode: model prediction disabled",
        "input": data,
        "features": engineered_features,
        "recommendations": recommendations
    }