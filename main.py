from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models, schemas
from datetime import datetime
import os

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Abundance CRM API", version="1.0.0")

# CORS Configuration
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ============ HEALTH CHECK ============
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "abundance-crm",
        "timestamp": datetime.utcnow().isoformat()
    }

# ============ USERS ============
@app.post("/api/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(
        email=user.email,
        name=user.name,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/api/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/api/users", response_model=list[schemas.UserResponse])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

# ============ TALENTS ============
@app.post("/api/talents", response_model=schemas.TalentResponse)
def create_talent(talent: schemas.TalentCreate, db: Session = Depends(get_db)):
    db_talent = models.Talent(
        name=talent.name,
        email=talent.email,
        phone=talent.phone,
        category=talent.category,
        status=talent.status,
        notes=talent.notes
    )
    db.add(db_talent)
    db.commit()
    db.refresh(db_talent)
    return db_talent

@app.get("/api/talents/{talent_id}", response_model=schemas.TalentResponse)
def get_talent(talent_id: int, db: Session = Depends(get_db)):
    talent = db.query(models.Talent).filter(models.Talent.id == talent_id).first()
    if not talent:
        raise HTTPException(status_code=404, detail="Talent not found")
    return talent

@app.get("/api/talents", response_model=list[schemas.TalentResponse])
def list_talents(category: str = None, status: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Talent)
    if category:
        query = query.filter(models.Talent.category == category)
    if status:
        query = query.filter(models.Talent.status == status)
    return query.all()

@app.put("/api/talents/{talent_id}", response_model=schemas.TalentResponse)
def update_talent(talent_id: int, talent_update: schemas.TalentUpdate, db: Session = Depends(get_db)):
    talent = db.query(models.Talent).filter(models.Talent.id == talent_id).first()
    if not talent:
        raise HTTPException(status_code=404, detail="Talent not found")
    
    for key, value in talent_update.dict(exclude_unset=True).items():
        setattr(talent, key, value)
    
    db.commit()
    db.refresh(talent)
    return talent

# ============ BOOKINGS ============
@app.post("/api/bookings", response_model=schemas.BookingResponse)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    talent = db.query(models.Talent).filter(models.Talent.id == booking.talent_id).first()
    if not talent:
        raise HTTPException(status_code=404, detail="Talent not found")
    
    db_booking = models.Booking(
        talent_id=booking.talent_id,
        client_name=booking.client_name,
        booking_date=booking.booking_date,
        location=booking.location,
        rate=booking.rate,
        status=booking.status
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@app.get("/api/bookings/{booking_id}", response_model=schemas.BookingResponse)
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@app.get("/api/bookings", response_model=list[schemas.BookingResponse])
def list_bookings(talent_id: int = None, status: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Booking)
    if talent_id:
        query = query.filter(models.Booking.talent_id == talent_id)
    if status:
        query = query.filter(models.Booking.status == status)
    return query.all()

@app.put("/api/bookings/{booking_id}", response_model=schemas.BookingResponse)
def update_booking(booking_id: int, booking_update: schemas.BookingUpdate, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    for key, value in booking_update.dict(exclude_unset=True).items():
        setattr(booking, key, value)
    
    db.commit()
    db.refresh(booking)
    return booking

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
