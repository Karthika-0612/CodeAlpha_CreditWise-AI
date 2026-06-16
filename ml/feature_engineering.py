import numpy as np


def safe_divide(numerator, denominator):
    return numerator / (denominator + 1e-6)


def create_features(df):

    df["debt_to_income_ratio"] = safe_divide(
        df["AMT_CREDIT"],
        df["AMT_INCOME_TOTAL"]
    )

    df["loan_burden_ratio"] = safe_divide(
        df["AMT_ANNUITY"],
        df["AMT_INCOME_TOTAL"]
    )

    df["credit_utilization_proxy"] = safe_divide(
        df["AMT_CREDIT"],
        df["AMT_GOODS_PRICE"]
    )

    df["age_years"] = abs(df["DAYS_BIRTH"]) / 365

    df["DAYS_EMPLOYED"] = df["DAYS_EMPLOYED"].replace(
        365243,
        np.nan
    )

    df["employment_years"] = abs(
        df["DAYS_EMPLOYED"]
    ) / 365

    df["income_stability_score"] = safe_divide(
        df["AMT_INCOME_TOTAL"],
        df["employment_years"] + 1
    )

    return df