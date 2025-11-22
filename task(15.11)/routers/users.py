from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}}
)

@router.get("/")
def get_users():
    return {"message": "List of users"}

@router.get("/{user_id}")
def get_user(user_id: int):
    return {"message": f"User {user_id}"}

@router.post("/")
def create_user():
    return {"message": "User created"}
