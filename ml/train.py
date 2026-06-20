import warnings
warnings.filterwarnings("ignore")

import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)

from lightgbm import LGBMClassifier


# ==========================================================
# Configuration
# ==========================================================

DATA_PATH = "../data/raw/application_train.csv"

SELECTED_FEATURES = [
    "age",
    "annual_income",
    "loan_amount",
    "annuity_amount",
    "employment_years",
    "number_of_children",
    "credit_inquiries",
    "ext_score_mean"
]

TARGET = "TARGET"


# ==========================================================
# Load and prepare data
# ==========================================================

def load_data():

    df = pd.read_csv(DATA_PATH)

    # Create frontend-compatible columns
    prepared = pd.DataFrame()

    prepared["age"] = (-df["DAYS_BIRTH"] / 365).astype(int)

    prepared["annual_income"] = df["AMT_INCOME_TOTAL"]

    prepared["loan_amount"] = df["AMT_CREDIT"]

    prepared["annuity_amount"] = df["AMT_ANNUITY"]

    prepared["employment_years"] = (
        abs(df["DAYS_EMPLOYED"]) / 365
    ).clip(upper=50)

    prepared["number_of_children"] = df["CNT_CHILDREN"]

    prepared["credit_inquiries"] = (
        df["AMT_REQ_CREDIT_BUREAU_YEAR"]
        .fillna(0)
    )

    prepared["ext_score_mean"] = (
        df[["EXT_SOURCE_1", "EXT_SOURCE_2", "EXT_SOURCE_3"]]
        .mean(axis=1)
    )

    prepared[TARGET] = df[TARGET]

    prepared = prepared.dropna()

    X = prepared[SELECTED_FEATURES]
    y = prepared[TARGET]

    return train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )


# ==========================================================
# Build preprocessor
# ==========================================================

def build_preprocessor():

    numeric_transformer = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])

    preprocessor = ColumnTransformer([
        ("num", numeric_transformer, SELECTED_FEATURES)
    ])

    return preprocessor


# ==========================================================
# Train model
# ==========================================================

def train_model(X_train, y_train):

    preprocessor = build_preprocessor()

    X_train_processed = preprocessor.fit_transform(X_train)

    model = LGBMClassifier(
        n_estimators=300,
        learning_rate=0.05,
        random_state=42
    )

    model.fit(X_train_processed, y_train)

    return model, preprocessor


# ==========================================================
# Evaluate model
# ==========================================================

def evaluate_model(model, preprocessor, X_test, y_test):

    X_test_processed = preprocessor.transform(X_test)

    y_pred = model.predict(X_test_processed)

    y_prob = model.predict_proba(X_test_processed)[:, 1]

    metrics = {
        "Precision": precision_score(y_test, y_pred),
        "Recall": recall_score(y_test, y_pred),
        "F1": f1_score(y_test, y_pred),
        "ROC_AUC": roc_auc_score(y_test, y_prob)
    }

    return metrics


# ==========================================================
# Save artifacts
# ==========================================================

def save_artifacts(model, preprocessor):

    os.makedirs(".", exist_ok=True)

    joblib.dump(model, "best_model.pkl")

    joblib.dump(preprocessor, "preprocessor.pkl")

    joblib.dump(SELECTED_FEATURES, "features.pkl")

    print("\nSaved:")
    print("✓ best_model.pkl")
    print("✓ preprocessor.pkl")
    print("✓ features.pkl")


# ==========================================================
# Main
# ==========================================================

def main():

    print("Loading data...")

    X_train, X_test, y_train, y_test = load_data()

    print(f"Training samples: {len(X_train):,}")
    print(f"Testing samples: {len(X_test):,}")

    print("\nTraining model...")

    model, preprocessor = train_model(
        X_train,
        y_train
    )

    metrics = evaluate_model(
        model,
        preprocessor,
        X_test,
        y_test
    )

    print("\nModel Metrics")

    for key, value in metrics.items():
        print(f"{key}: {value:.4f}")

    save_artifacts(model, preprocessor)


if __name__ == "__main__":
    main()