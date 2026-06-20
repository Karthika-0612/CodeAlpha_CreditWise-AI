from backend.app.models import (
    User,
    Application,
    Prediction,
    ModelMetric
)
from backend.app.security import hash_password
from sqlalchemy.orm import Session


def create_user(db, user_data):
    user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        password_hash=hash_password(
            user_data.password
        )
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

  


def create_application(db, application_data):
    application = Application(
        annual_income=application_data["annual_income"],
        loan_amount=application_data["loan_amount"],
        employment_years=application_data["employment_years"],
        number_of_children=application_data["number_of_children"]
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return application

def save_prediction(db, prediction_data):
    prediction = Prediction(**prediction_data)

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return prediction


def get_latest_metrics(db):
    return (
        db.query(ModelMetric)
        .order_by(ModelMetric.created_at.desc())
        .first()
    )