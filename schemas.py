from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# ============ USER SCHEMAS ============
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ============ TALENT SCHEMAS ============
class TalentBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    category: str
    status: str = "available"
    notes: Optional[str] = None

class TalentCreate(TalentBase):
    pass

class TalentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class TalentResponse(TalentBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ============ BOOKING SCHEMAS ============
class BookingBase(BaseModel):
    talent_id: int
    client_name: str
    booking_date: datetime
    location: str
    rate: float
    status: str = "pending"
    notes: Optional[str] = None

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BaseModel):
    client_name: Optional[str] = None
    booking_date: Optional[datetime] = None
    location: Optional[str] = None
    rate: Optional[float] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class BookingResponse(BookingBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
