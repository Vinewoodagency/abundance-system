from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    role = Column(String)  # admin, manager, talent_scout, etc.
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Talent(Base):
    __tablename__ = "talents"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    category = Column(String, index=True)  # actor, dancer, model, etc.
    status = Column(String, default="available", index=True)  # available, unavailable, retired, etc.
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    bookings = relationship("Booking", back_populates="talent")

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    talent_id = Column(Integer, ForeignKey("talents.id"), index=True)
    client_name = Column(String, index=True)
    booking_date = Column(DateTime, index=True)
    location = Column(String)
    rate = Column(Float)  # Pay rate for this booking
    status = Column(String, default="pending", index=True)  # pending, confirmed, completed, cancelled
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    talent = relationship("Talent", back_populates="bookings")
