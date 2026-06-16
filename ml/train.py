import warnings

warnings.filterwarnings("ignore")
import joblib

from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)

from lightgbm import LGBMClassifier


def load_data():

    X_train = joblib.load("data/processed/X_train.pkl")
    y_train = joblib.load("data/processed/y_train.pkl")

    X_test = joblib.load("data/processed/X_test.pkl")
    y_test = joblib.load("data/processed/y_test.pkl")

    return X_train, X_test, y_train, y_test


def train_model(X_train, y_train):

    model = LGBMClassifier(
        random_state=42
    )

    model.fit(X_train, y_train)

    return model


def evaluate_model(model, X_test, y_test):

    y_pred = model.predict(X_test)

    y_prob = model.predict_proba(X_test)[:, 1]

    metrics = {
        "Precision": precision_score(y_test, y_pred),
        "Recall": recall_score(y_test, y_pred),
        "F1": f1_score(y_test, y_pred),
        "ROC_AUC": roc_auc_score(y_test, y_prob)
    }

    return metrics


def save_best_model(model):

    joblib.dump(
        model,
        "ml/best_model.pkl"
    )


def main():

    X_train, X_test, y_train, y_test = load_data()

    model = train_model(X_train, y_train)

    metrics = evaluate_model(
        model,
        X_test,
        y_test
    )

    print(metrics)

    save_best_model(model)


if __name__ == "__main__":
    main()