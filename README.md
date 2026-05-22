# Memoria

> A chat-first AI assistance that remenbers what you forget
> nudges you when it matters and give you full control
> of your work environment through natural language

## what is this?

Memoria is an AI operating system that build on top of Telegram. You capture
notes and ideas by just sending messages. The AI organizes them, resurfaces forgotten ones and let you control your dev environment -files, deploy and logs -
all from a single interface.

This project is also a deliberate engineering cirriculum.Every phase introduce a new systems engineering discipline: backend engineering, event-driven architecture, distributed systems, observability, memory systems and AI engineering.

## Status

> Phase 1 - Foundation (in progress)

| Layer     | Technology            |
| --------- | --------------------- |
| Runtime   | Node.js 22            |
| Language  | Typescript            |
| Framework | Fastify               |
| Bot       | Grammy (telegram)     |
| Database  | Postgres via supabase |
| ORM       | Prisma                |
| Queue     | BullMQ + Redis        |
| Deploy    | Railway               |

## Running Locally

### Prerequisities

- Node.js 22+
- Docker Desktop (for Postgre + Redis)
- A Telegram bot token from [@BotFather](https://t.me/botfather)

### Setup

```bash
# 1. Clone and install
git clone https://github.com/yourusername/memoria  ← your repo
cd memoria
npm install

# 2. Configure environment
cp .env.example .env
# Fill in your values in .env

# 3. Start local services
docker-compose up -d

# 4. Push database schema
npx prisma db push

npm run dev
```

### Verifying it's running

GET http://localhost:3000/health -> { status: "ok", message: "Memoria is healthy", env: development }

## Project Structure

src/
|---- index.ts # Entry Point
|---- config.ts # Env validation (Zod)
|---- api/ # Fastify routes
|---- bot/ # Telegram handlers
|---- services/ # Business Logics
|---- db/ #Prisma client

### Phases

see [docs/PHASES.md] (docs/PHASES.md) for full scope of each phase.

## Engineering Disciplines

This project covers 11 disciplines across 5 phases:

- **Phase 1** - Backend Engineering, System Design
- **Phase 2** - Concurrency, Event-Driven Architecture
- **Phase 3** - Distributed Systems, Realtime, Observability
- **Phase 4** - Memory Systems, Systems Programming,Infrastructure
- **Phase 5** - AI Engineering
