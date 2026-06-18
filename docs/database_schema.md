# Database Schema

## Tables

### users

Stores account information.

### applications

Stores loan application details submitted by users.

### predictions

Stores model outputs for each application.

### model_metrics

Tracks model performance over time.

## Relationships

- One user can have many applications.
- One application has one prediction.
- Model metrics are stored independently.

```text
users (1) ---------> (many) applications

applications (1) --> (1) predictions
```
