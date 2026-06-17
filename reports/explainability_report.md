# Explainability Report

## Selected Model

LightGBM

## Global Feature Importance

SHAP analysis identified the following features as the strongest drivers of default risk:

- External credit scores (`EXT_SOURCE_1`, `EXT_SOURCE_2`, `EXT_SOURCE_3`)
- Debt-to-income ratio
- Loan burden ratio
- Employment duration
- Annual income

Higher external credit scores generally reduce default risk, while higher debt burden and repayment obligations increase risk.

## Individual Prediction Example

For the selected customer, default risk increased due to:

- High debt-to-income ratio
- Low external credit scores
- Higher loan burden ratio

Default risk decreased due to:

- Stable employment history
- Higher annual income

## Business Value

Explainable AI improves transparency and trust in credit decisions.

Loan officers can understand why an applicant was flagged as high risk instead of relying solely on model outputs.

This supports:

- Regulatory compliance
- Fair lending practices
- Better risk management
- Improved customer communication
