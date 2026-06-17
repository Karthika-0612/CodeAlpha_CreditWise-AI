def create_features(data):

    annual_income = data["annual_income"]
    loan_amount = data["loan_amount"]
    annuity_amount = data["annuity_amount"]
    age = data["age"]

    features = {}

    features["debt_to_income_ratio"] = (
        loan_amount / max(annual_income, 1)
    )

    features["loan_burden_ratio"] = (
        annuity_amount / max(annual_income, 1)
    )

    features["credit_inquiry_ratio"] = (
        data.get("credit_inquiries", 0)
        / max(age, 1)
    )

    features["employment_years"] = data["employment_years"]

    features["ext_score_mean"] = data.get(
        "ext_score_mean",
        0.5
    )

    return features


def generate_recommendations(customer):

    recommendations = []

    if customer.get("debt_to_income_ratio", 0) > 0.4:
        recommendations.append(
            "Reduce existing debt to improve approval chances."
        )

    if customer.get("loan_burden_ratio", 0) > 0.3:
        recommendations.append(
            "Lower monthly repayment obligations."
        )

    if customer.get("credit_inquiry_ratio", 0) > 0.1:
        recommendations.append(
            "Avoid multiple credit applications."
        )

    if customer.get("employment_years", 0) < 2:
        recommendations.append(
            "Maintain stable employment history."
        )

    if customer.get("ext_score_mean", 1) < 0.5:
        recommendations.append(
            "Improve your credit profile through timely repayments."
        )

    if not recommendations:
        recommendations.append(
            "Your credit profile appears healthy."
        )

    return recommendations