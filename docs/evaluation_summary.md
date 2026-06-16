# Model Evaluation Summary

## Selected Model

LightGBM

## Test Set Performance

- Precision: 0.1700
- Recall: 0.6759
- F1-score: 0.2717
- ROC-AUC: 0.7591

## Key Findings

- The dataset is highly imbalanced.
- The model correctly identifies approximately 68% of defaulters.
- False negatives are reduced compared to baseline models.
- Precision remains low, indicating many false positives.

## Business Impact

In credit risk prediction, missing a potential defaulter is more costly than incorrectly flagging a low-risk customer.

Therefore, recall was prioritized during model selection.

## Future Improvements

- Tune LightGBM hyperparameters.
- Experiment with threshold optimization.
- Try SMOTENC instead of RandomOverSampler.
- Add more domain-specific features.
- Explore ensemble methods.
