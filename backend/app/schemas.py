from pydantic import BaseModel


class CreditRequest(BaseModel):
    age: int
    annual_income: float
    loan_amount: float
    annuity_amount: float
    employment_years: float
    number_of_children: int

    credit_inquiries: int = 0
    ext_score_mean: float = 0.5