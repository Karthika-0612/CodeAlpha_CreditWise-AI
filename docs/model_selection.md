# Model Selection Summary

## Models Tested

- Logistic Regression
- Decision Tree
- Random Forest
- XGBoost
- LightGBM

## Evaluation Metrics

- Precision
- Recall
- F1-score
- ROC-AUC

## Selected Model

LightGBM

## Performance

- Precision: 0.1700
- Recall: 0.6759
- F1-score: 0.2717
- ROC-AUC: 0.7591

## Classification Report

Class 0 (Non-default):

- Precision: 0.96
- Recall: 0.71
- F1-score: 0.82

Class 1 (Default):

- Precision: 0.17
- Recall: 0.68
- F1-score: 0.27

## Selection Reason

The objective of this project is to identify potential loan defaulters while minimizing false negatives.

LightGBM achieved the highest ROC-AUC and F1-score while maintaining recall comparable to Logistic Regression.

The model correctly identified approximately 68% of defaulters, making it suitable for credit risk assessment.

Although precision is relatively low, this trade-off is acceptable because missing a defaulter is more costly than incorrectly flagging a low-risk applicant.
