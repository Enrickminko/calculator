from pydantic import BaseModel, Field

class CalcRequest(BaseModel):
    expr: str = Field(min_length=1, max_length=1024)
    angle: str = Field(default="rad", pattern="^(rad|deg)$")
    precision: int = Field(default=20, ge=10, le=80)
