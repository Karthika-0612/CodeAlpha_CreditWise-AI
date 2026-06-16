# Model Evaluation Report

## Selected Model

LightGBM

## Key Metrics

* Precision: 0.1700
* Recall: 0.6759
* F1-score: 0.2717
* ROC-AUC: 0.7591

## Why This Model Was Selected

The objective of this project is to minimize false negatives by accurately identifying potential loan defaulters.

LightGBM achieved the highest ROC-AUC and F1-score while maintaining strong recall.

Although Logistic Regression achieved a similar recall score, LightGBM provided better overall discrimination between defaulters and non-defaulters.

## Business Impact

The model correctly identifies approximately 68% of potential defaulters.

This helps reduce:

* Loan defaults
* Financial losses
* Manual underwriting effort
* Approval processing time

## Important Risk Factors

* External credit scores
* Debt-to-income ratio
* Loan burden ratio
* Employment stability
* Annual income

## Recommendation

Deploy the model as a decision-support system for loan officers rather than a fully automated approval engine.

Human review should be required for applications identified as high risk.

## Future Improvements

* Tune LightGBM hyperparameters
* Optimize classification thresholds
* Use SMOTENC instead of RandomOverSampler
* Add more domain-specific features
* Explore ensemble models
