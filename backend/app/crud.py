from backend.app.models import (
    User,
    Application,
    Prediction,
    ModelMetric
)


def create_user(db, user_data):
    user = User(**user_data)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def create_application(db, application_data):
    application = Application(**application_data)

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