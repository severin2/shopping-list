# Shopping List

## Notes

- Added testing configuration and a simple test in each project
- Did not handle good UI feedback for required/optional fields, that'd be a good followup


## Directory Layout

- `/frontend` — Next.js 13+ app (React 17 compatible mode)
- `/backend` — Node.js + Express REST API server
- `docker-compose.yml` — Defines services for frontend, backend, and Postgres

## Getting Started

### Prerequisites
- Docker and Docker Compose installed

### Running the App

1. Build and start all services:
```sh
docker-compose up --build
```

2. Access the apps:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)


### Development

1. Run the postgres db
```sh
docker-compose up postgres
```

2. Run backend in dev mode
```sh
cd backend && npx prisma migrate deploy && npm run dev
```
   
3. Run frontend in dev mode
```sh
cd frontend && npm run dev
```

- Code changes in `/frontend` and `/backend` are reflected via Docker volumes.


## Project Structure

- `/frontend` — Next.js app (React, Material-UI, styled-components)
- `/backend` — Express REST API (Node.js, prisma, pg)
- `/docker-compose.yml` — Multi-service orchestration

---

See each subdirectory for more details.
