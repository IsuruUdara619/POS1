# Heaven Bakers - Quick Start Guide

Access your application at **http://localhost** or **http://heavenbaker.com/application** (if configured)!

## What You Have

✅ **Dockerized Application** - Backend, Frontend, and PostgreSQL in containers
✅ **Node.js Frontend Server** - Efficient static file serving and API proxying
✅ **PostgreSQL Database** - Fully integrated and persistent

## Setup Overview (2 Main Steps)

### 1️⃣ Install Docker Desktop
- Download from: https://docs.docker.com/desktop/install/windows-install/
- Install and restart your computer
- Open Docker Desktop and ensure it's running

### 2️⃣ Start Everything
```cmd
# Start Docker containers
cd Heaven_bakers
docker compose up -d
```

## Access Your Application

🌐 **Main URL:** http://localhost:8080 or http://heavenbaker.com/application
🔐 **Login:** admin / admin123 (default credentials)

## Project Structure

```
Heaven_bakers/
├── backend/              # Node.js/Express API
│   ├── Dockerfile        # Backend container config
│   ├── src/             # API routes and services
│   └── .dockerignore    # Build optimization
│
├── frontend/            # React/Vite application
│   ├── Dockerfile       # Multi-stage build (Node.js)
│   ├── server.js        # Frontend server & proxy
│   ├── src/            # React components
│   └── .dockerignore   # Build optimization
│
├── docker-compose.yml   # Orchestrates all services
│
└── Documentation/
    ├── DOCKER.md                  # Docker deployment guide
    └── README_DOCKER_SETUP.md     # Docker quick start
```

## Key Configuration Files

### docker-compose.yml
Defines 3 services:
- **postgres** (port 5432) - Database
- **backend** (port 5000) - API server
- **frontend** (port 8080) - Web application (Node.js server)

## Daily Operations

### Start Application
```cmd
# Start Docker
cd Heaven_bakers
docker compose up -d
```

### Stop Application
```cmd
# Stop Docker
cd Heaven_bakers
docker compose down
```

### View Logs
```cmd
# Docker logs
docker compose logs -f
```

### Restart Services
```cmd
# Restart Docker containers
docker compose restart
```

## Troubleshooting

### Application Not Loading
1. Check Docker is running: `docker compose ps`
2. Check logs for errors: `docker compose logs -f`

### Database Connection Issues
```cmd
# Access database
docker compose exec postgres psql -U heaven_user -d Heaven_Bakers

# View backend logs
docker compose logs backend
```

## Environment Configuration

### Default Credentials
- **Database:** heaven_user / heaven_password
- **Admin User:** admin / admin123
- **JWT Secret:** (auto-generated, change in production)

### Change Credentials
Edit `.env` file or environment variables in `docker-compose.yml`

## Backup & Restore

### Backup Database
```cmd
docker compose exec postgres pg_dump -U heaven_user Heaven_Bakers > backup.sql
```

### Restore Database
```cmd
docker compose exec -T postgres psql -U heaven_user -d Heaven_Bakers < backup.sql
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Docker Host                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Browser: http://localhost:8080                       │   │
│  └───────────────────────┬──────────────────────────────┘   │
│                          │                                  │
│  ┌───────────────────────▼──────────────────────────────┐   │
│  │ Docker: Frontend                                     │   │
│  │ Port 8080                                            │   │
│  │ (React/Vite/Node.js)                                 │   │
│  │ Server + Proxy                                       │   │
│  └───────────────────────┬──────────────────────────────┘   │
│                          │ (Proxy /api)                     │
│  ┌───────────────────────▼──────────────────────────────┐   │
│  │ Docker: Backend                                      │   │
│  │ Port 5000                                            │   │
│  │ (Node.js/Express)                                    │   │
│  └───────────────────────┬──────────────────────────────┘   │
│                          │                                  │
│  ┌───────────────────────▼──────────────────────────────┐   │
│  │ Docker: PostgreSQL                                   │   │
│  │ Port 5432                                            │   │
│  │ (Database)                                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Persistent Volumes:                                  │   │
│  │  • postgres_data - Database storage                  │   │
│  │  • whatsapp_data - WhatsApp sessions                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Next Steps After Setup

1. ✅ Change default admin password
2. ✅ Update JWT secret in production
3. ✅ Set up automated database backups
4. ✅ Configure SSL/HTTPS for production
5. ✅ Review security settings

## Documentation Links

- **Docker Guide:** `DOCKER.md` - Detailed Docker operations
- **Docker Quick Start:** `README_DOCKER_SETUP.md` - Docker basics

## Support & Resources

- **Docker Docs:** https://docs.docker.com/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
