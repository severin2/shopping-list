# Shopping List Backend

This is the backend for the Shopping List app. It is built with Node.js, TypeScript, and Prisma.

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set up the database

This project uses Prisma with SQLite by default. To set up the database, run:

```bash
npx prisma migrate deploy
```

You can edit the schema in `prisma/schema.prisma` and run migrations as needed.

### 3. Start the backend server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The server will start on the port specified in your code (commonly 4000 or 5000).

## Project Structure

- `src/` - Main backend source code
- `prisma/` - Prisma schema and migrations
- `Dockerfile` - For containerizing the backend

## Useful Commands

- `npx prisma studio` - Open Prisma Studio to view and edit your database
- `npx prisma migrate dev` - Run migrations in development
- `npx prisma generate` - Generate Prisma client

## Environment Variables

Create a `.env` file in the backend root to override database connection or other settings.

This project expects a valid postgres url to be available in `DATABASE_URL`