from typing import Optional, List, Dict
from pydantic import BaseModel, Field

class ChatGPTPrompt(BaseModel):
    messages: List[Dict[str, str]] = Field(
        ...,
        example=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Hello!"}
        ]
    )
    temperature: float = Field(0.7, ge=0, le=1)
    max_tokens: int = Field(1000, ge=1, le=4000)

class ChatGPTResponse(BaseModel):
    success: bool
    response: Optional[str] = None
    error: Optional[str] = None

class ItemAnalysisRequest(BaseModel):
    description: str = Field(..., min_length=10)

class ItemAnalysisResponse(BaseModel):
    original_description: str
    analysis: str
    generated_titles: str

class TitleGenerationRequest(BaseModel):
    description: str = Field(..., min_length=10)
    style: Optional[str] = "marketing"

class TitleGenerationResponse(BaseModel):
    original_description: str
    generated_titles: str
