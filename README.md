# Abundance CRM - Talent Agency Management System

A full-stack CRM system for managing talent (actors, dancers, models, singers) bookings and schedules.

## Tech Stack

**Backend:**
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL Database
- Uvicorn ASGI Server

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS
- Axios for API calls
- Vite build tool

**Infrastructure:**
- Docker & Docker Compose
- DigitalOcean App Platform

## Project Structure

```
abundance-system/
├── backend/
│   ├── main.py           # FastAPI app + all endpoints
│   ├── models.py         # SQLAlchemy ORM models
│   ├── schemas.py        # Pydantic validation schemas
│   ├── database.py       # Database configuration
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile        # Backend container
├── frontend/
│   ├── App.tsx           # Main React component
│   ├── components/
│   │   ├── Dashboard.tsx     # Stats dashboard
│   │   ├── TalentList.tsx    # Talent management view
│   │   └── BookingForm.tsx   # New booking form
│   ├── package.json      # Node dependencies
│   ├── vite.config.ts    # Vite configuration
│   ├── tsconfig.json     # TypeScript config
│   ├── index.html        # HTML entry point
│   ├── main.tsx          # React entry point
│   └── Dockerfile.frontend
├── docker-compose.yml    # Services orchestration
├── init-db.sql          # Database schema
└── README.md
```

## Local Development

### Prerequisites
- Docker & Docker Compose (recommended)
- OR: Python 3.11+, Node.js 18+, PostgreSQL 16

### Option 1: Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# Logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Local Development (Without Docker)

**Backend:**
```bash
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
npm install
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Service status

### Users
- `POST /api/users` - Create user
- `GET /api/users` - List all users
- `GET /api/users/{id}` - Get user by ID

### Talents
- `POST /api/talents` - Create talent
- `GET /api/talents` - List talents (filterable by category, status)
- `GET /api/talents/{id}` - Get talent by ID
- `PUT /api/talents/{id}` - Update talent

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List bookings (filterable by talent, status)
- `GET /api/bookings/{id}` - Get booking by ID
- `PUT /api/bookings/{id}` - Update booking

## Deployment

### DigitalOcean App Platform

1. **Connect GitHub Repository:**
   - Push code to `https://github.com/Vinewoodagency/abundance-system`
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository

2. **Auto-Detect Components:**
   - DigitalOcean will detect:
     - Backend service (from Dockerfile)
     - Frontend service (from Dockerfile.frontend)
     - PostgreSQL database (from docker-compose.yml)

3. **Configure Environment Variables:**
   ```
   ENV=production
   DEBUG=False
   SECRET_KEY=<generate-strong-key>
   DATABASE_URL=<digital-ocean-postgres-url>
   ALLOWED_ORIGINS=https://abundance-crm-xyz.ondigitalocean.app
   VITE_API_URL=https://abundance-crm-xyz.ondigitalocean.app/api
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for build & deployment (5-10 minutes)
   - Test at: `https://abundance-crm-xyz.ondigitalocean.app`

## Features

✓ Talent Management - Add, view, filter talents by category and status
✓ Booking System - Create and track bookings with rates and locations
✓ Dashboard - Overview of talents, bookings, and pending items
✓ Real-time Updates - All data syncs across the platform
✓ Mobile Responsive - Works on desktop, tablet, mobile
✓ PostgreSQL - Production-grade database
✓ Docker - Easy deployment and scaling

## Environment Variables

```bash
DATABASE_URL=postgresql://user:pass@host:5432/abundance_crm
ENV=production  # development or production
DEBUG=False
SECRET_KEY=your-secret-key-min-32-chars
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
VITE_API_URL=http://localhost:8000  # Frontend API endpoint
```

## Troubleshooting

**"No components detected" on DigitalOcean:**
- Ensure real code is pushed (not placeholders)
- Check .git repo is initialized
- Refresh DigitalOcean page

**Database connection error:**
- Verify DATABASE_URL is correct
- Check PostgreSQL container is running
- Ensure password is correct

**Frontend can't reach backend:**
- Check VITE_API_URL environment variable
- Verify ALLOWED_ORIGINS includes frontend domain
- Check CORS is enabled in FastAPI

## Support

For issues or questions, contact: info@vinewoodagency.com
