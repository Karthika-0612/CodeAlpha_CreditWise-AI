from pathlib import Path

import joblib
import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "ml" / "best_model.pkl"
PREPROCESSOR_PATH = BASE_DIR / "ml" / "preprocessor.pkl"
print("MODEL PATH:", MODEL_PATH)
print("PREPROCESSOR PATH:", PREPROCESSOR_PATH)




model = joblib.load(MODEL_PATH)
preprocessor = joblib.load(PREPROCESSOR_PATH)


def predict_credit_risk(data: dict):

    df = pd.DataFrame([data])

    processed = preprocessor.transform(df)

    prediction = int(model.predict(processed)[0])

    probability = float(
        model.predict_proba(processed)[0][1]
    )

    return prediction, probability