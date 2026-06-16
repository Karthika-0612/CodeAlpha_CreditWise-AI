# Dataset Notes

## Training Dataset

* Rows: 307,511
* Columns: 122

## Test Dataset

* Rows: 48,744
* Columns: 121

## Target Variable

* 0 = Repaid loan
* 1 = Defaulted loan

## Initial Observations

* The test dataset does not include the `TARGET` column.
* The dataset contains numerical and categorical features.
* Several columns contain missing values.
* The target variable is highly imbalanced, with significantly more non-default cases than default cases.

## Important Features

* SK_ID_CURR
* CODE_GENDER
* AMT_INCOME_TOTAL
* AMT_CREDIT
* AMT_ANNUITY
* DAYS_BIRTH
* DAYS_EMPLOYED
