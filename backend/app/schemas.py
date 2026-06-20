from pydantic import BaseModel, EmailStr


class CreditRequest(BaseModel):
    age: int
    annual_income: float
    loan_amount: float
    annuity_amount: float
    employment_years: float
    number_of_children: int

    credit_inquiries: int = 0
    ext_score_mean: float = 0.5

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str