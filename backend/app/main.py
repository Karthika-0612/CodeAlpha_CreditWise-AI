from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.models import User
from backend.app.database import get_db

from backend.app.schemas import (
    CreditRequest,
    UserCreate,
    UserResponse
)
from backend.app.security import authenticate_user

from backend.app.predictor import predict_credit_risk
from backend.app.schemas import (
    UserLogin,
    Token
)

from backend.app.crud import (
    create_user,
    create_application,
    save_prediction
)

from backend.app.security import (
    authenticate_user,
    create_access_token
)

from backend.app.security import create_access_token
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
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from backend.app.database import engine
from backend.app.models import Base

Base.metadata.create_all(bind=engine)

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
@app.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return create_user(db, user)


@app.post(
    "/login",
    response_model=Token
)
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):
    user = authenticate_user(
        db,
        credentials.email,
        credentials.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {"sub": str(user.id)}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
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

    prediction, probability = predict_credit_risk(data)

    application = create_application(
        db,
        data
    )

    result = {
        "application_id": application.id,
        "prediction": int(prediction),
        "probability": float(probability),

        "risk_score": round(probability * 100),

        "credit_score": round((1 - probability) * 100),

        "risk_level": (
            "High Risk"
            if probability >= 0.7
            else "Medium Risk"
            if probability >= 0.4
            else "Low Risk"
        ),

        "features": engineered_features,
        "recommendations": recommendations
    }

    save_prediction(
        db,
        {
            "application_id": application.id,
            "prediction": result["prediction"],
            "default_probability": result["probability"],
            "risk_level": result["risk_level"]
        }
    )

    return result
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

   