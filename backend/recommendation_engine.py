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

    return recommendations