# -*- coding: utf-8 -*-
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from models import Item
from item_schemas import ItemCreate, ItemUpdate

def create_item(db: Session, item: ItemCreate) -> Item:
    db_item = Item(title=item.title, description=item.description, price=item.price)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_items(db: Session, skip: int = 0, limit: int = 100, title_filter: Optional[str] = None) -> List[Item]:
    stmt = select(Item)
    if title_filter:
        stmt = stmt.where(Item.title.like(f"%{title_filter}%"))
    stmt = stmt.offset(skip).limit(limit)
    return list(db.execute(stmt).scalars())

def get_item(db: Session, item_id: int) -> Optional[Item]:
    return db.get(Item, item_id)

def update_item(db: Session, item_id: int, item: ItemUpdate) -> Optional[Item]:
    db_item = db.get(Item, item_id)
    if not db_item:
        return None
    data = item.dict(exclude_unset=True)
    for k, v in data.items():
        setattr(db_item, k, v)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: int) -> bool:
    db_item = db.get(Item, item_id)
    if not db_item:
        return False
    db.delete(db_item)
    db.commit()
    return True
