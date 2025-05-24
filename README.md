# Shopping List Monorepo

## Directory Layout

- `/frontend` — Next.js 13+ app (React 17 compatible mode)
- `/backend` — Node.js + Express REST API server
- `docker-compose.yml` — Defines services for frontend, backend, and Postgres

## Getting Started

### Prerequisites
- Docker and Docker Compose installed

### Developing

1. Run the postgres db
   ```sh
   docker-compose up postgres
   ```

2. Run backend in dev mode
   ```sh
   cd frontend && npm run dev
   ```
   
3. Run frontend in dev mode
   ```sh
   cd backend && npm run dev
   ```

### Running the App

1. Build and start all services:
   ```sh
   docker-compose up --build
   ```

2. Access the apps:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)

### Development

- Code changes in `/frontend` and `/backend` are reflected via Docker volumes.
- The backend connects to Postgres, but falls back to mock data if the DB is unavailable.

## Project Structure

- `/frontend` — Next.js app (React, Material-UI, styled-components)
- `/backend` — Express REST API (Node.js, pg)
- `/docker-compose.yml` — Multi-service orchestration

---

See each subdirectory for more details.
