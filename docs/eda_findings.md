# EDA Findings

## Dataset Size

- Training rows: 307,511
- Features: 122

## Target Variable

- 91.9% non-defaulters
- 8.1% defaulters

## Missing Values

- Several columns contain more than 50% missing values.
- Missing values are concentrated in housing-related features.

## Income Distribution

- AMT_INCOME_TOTAL is highly right-skewed.
- Several high-income outliers are present.

## Age Distribution

- Most applicants are between 30 and 50 years old.

## Class Imbalance

- The dataset is significantly imbalanced.
- Accuracy alone is not a sufficient evaluation metric.

## Potentially Important Features

- AMT_INCOME_TOTAL
- AMT_CREDIT
- AMT_ANNUITY
- DAYS_EMPLOYED
- AGE_YEARS
- EXT_SOURCE_1
- EXT_SOURCE_2
- EXT_SOURCE_3
