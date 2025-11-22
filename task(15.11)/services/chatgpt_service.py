import logging
from typing import List, Dict, Optional
from openai import OpenAI
from config import settings

logger = logging.getLogger(__name__)

class ChatGPTService:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL
    
    async def get_chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> Optional[str]:
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error calling ChatGPT API: {str(e)}")
            return None

    async def analyze_item_description(self, description: str) -> Optional[str]:
        prompt = f"""
Проанализируй описание товара и предоставь краткий анализ:

Описание: {description}

Сделай анализ по пунктам:
1) Ключевые характеристики
2) Целевая аудитория
3) Рекомендации по улучшению
4) Оценка убедительности (1-10)
"""
        messages = [
            {"role": "system", "content": "Ты помощник для анализа товаров в интернет-магазине."},
            {"role": "user", "content": prompt}
        ]
        return await self.get_chat_completion(messages)

    async def generate_item_title(self, description: str) -> Optional[str]:
        prompt = f"""
На основе описания придумай 3 привлекательных заголовка (до 60 символов), разные стили.
Описание: {description}
Верни только заголовки через запятую.
"""
        messages = [
            {"role": "system", "content": "Ты специалист по маркетингу и копирайтингу."},
            {"role": "user", "content": prompt}
        ]
        return await self.get_chat_completion(messages)

chatgpt_service = ChatGPTService()
