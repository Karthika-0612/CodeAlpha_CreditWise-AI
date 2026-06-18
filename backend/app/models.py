from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from backend.app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    applications = relationship(
        "Application",
        back_populates="user"
    )


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    annual_income = Column(Float)

    loan_amount = Column(Float)

    employment_years = Column(Float)

    number_of_children = Column(Integer)

    submitted_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="applications"
    )

    prediction = relationship(
        "Prediction",
        back_populates="application",
        uselist=False
    )


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    application_id = Column(
        Integer,
        ForeignKey("applications.id")
    )

    prediction = Column(Integer)

    default_probability = Column(Float)

    risk_level = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    application = relationship(
        "Application",
        back_populates="prediction"
    )


class ModelMetric(Base):
    __tablename__ = "model_metrics"

    id = Column(Integer, primary_key=True, index=True)

    model_name = Column(String)

    precision = Column(Float)

    recall = Column(Float)

    f1_score = Column(Float)

    roc_auc = Column(Float)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )