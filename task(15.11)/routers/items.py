# -*- coding: utf-8 -*-
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from database import get_db
from item_schemas import ItemCreate, ItemUpdate, ItemResponse
import crud
from services.chatgpt_service import chatgpt_service
from config import settings
from schemas.chatgpt_schemas import ItemAnalysisResponse

router = APIRouter(
    prefix="/items",
    tags=["items"],
    responses={404: {"description": "Not found"}}
)

@router.post("/", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)

@router.get("/", response_model=List[ItemResponse])
def read_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    title: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return crud.get_items(db, skip=skip, limit=limit, title_filter=title)

@router.get("/{item_id}", response_model=ItemResponse)
def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.put("/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item: ItemUpdate, db: Session = Depends(get_db)):
    db_item = crud.update_item(db, item_id=item_id, item=item)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    ok = crud.delete_item(db, item_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}

@router.post("/{item_id}/analyze", response_model=ItemAnalysisResponse)
async def analyze_item(item_id: int, db: Session = Depends(get_db)):
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail="ChatGPT service is not configured")
    db_item = crud.get_item(db, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not db_item.description:
        raise HTTPException(status_code=400, detail="Item doesn't have description to analyze")
    analysis = await chatgpt_service.analyze_item_description(db_item.description)
    titles = await chatgpt_service.generate_item_title(db_item.description)
    if analysis is None:
        raise HTTPException(status_code=500, detail="Failed to analyze item description")
    return ItemAnalysisResponse(
        original_description=db_item.description,
        analysis=analysis,
        generated_titles=titles or "Не удалось сгенерировать заголовки"
    )
