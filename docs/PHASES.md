# Phases & Scope

This document defines the scope, features, and learning goals
for each phase of Memoria. A phase is **done** when every item
in its Done Condition is true.

---

## Phase 1 — Foundation

**Goal:** A real backend and a working Telegram bot with
persistent task storage. No AI. No queue. Just solid plumbing.

**Disciplines:** Backend Engineering · System Design

### Features

- [x] Fastify HTTP server with `/health` endpoint
- [x] Environment config validated with Zod at startup
- [ ] Telegram bot responds to commands via Grammy
- [ ] `/add <task>` — saves a task to the database
- [ ] `/list` — returns all active tasks
- [ ] `/done <number>` — marks a task as complete
- [ ] `/help` — lists available commands
- [ ] PostgreSQL database via Supabase + Prisma ORM
- [ ] User identity resolved from Telegram `chat_id`
- [ ] Docker Compose for local Postgres + Redis

### Out of Scope

- No AI of any kind
- No scheduling or nudges
- No web dashboard
- No authentication beyond `chat_id` isolation

### Done Condition

- [ ] Sending `/add finish the README` in Telegram
      creates a row in the database
- [ ] Sending `/list` returns that task
- [ ] Sending `/done 1` marks it complete
- [ ] `npm run lint` passes with zero TypeScript errors
- [ ] `docker-compose up` starts the full local environment

---

## Phase 2 — Concurrency & Events

**Goal:** The system handles real load and services
communicate through events, not direct calls.

**Disciplines:** Concurrency · Event-Driven Architecture

### Features

- [ ] Async task processing via BullMQ job queue
- [ ] Redis Pub/Sub between services
- [ ] `task.created` event emitted on every new task
- [ ] `task.completed` event emitted on completion
- [ ] Basic scheduler — detects tasks not touched in 7+ days
- [ ] Bot sends a daily digest at a configured time
- [ ] Concurrent webhook handling without data corruption
- [ ] Graceful shutdown — drains queue before process exits

### Out of Scope

- No realtime dashboard updates yet
- No AI-generated nudge messages yet
- No multi-service deployment

### Done Condition

- [ ] 50 simultaneous `/add` commands processed
      without errors or duplicate tasks
- [ ] `task.created` event visible in Redis
- [ ] Scheduler detects a stale task after 7 days
- [ ] Bot sends a digest message on schedule

---

## Phase 3 — Distributed Systems & Observability

**Goal:** Three separate services. A live dashboard.
Full visibility into what the system is doing.

**Disciplines:** Distributed Systems · Realtime · Observability

### Features

- [ ] Webhook handler, scheduler, notifier as separate processes
- [ ] Services communicate exclusively via Redis events
- [ ] Web dashboard (React) with live task list
- [ ] Dashboard updates in realtime via Supabase Realtime
- [ ] Structured JSON logging across all services
- [ ] Sentry error tracking integrated
- [ ] Prometheus metrics endpoint `/metrics`
- [ ] Grafana dashboard — request latency, error rate,
      nudge delivery rate
- [ ] Health checks on all services
- [ ] Distributed locking for scheduler (prevent duplicate jobs)

### Out of Scope

- No AI nudge generation yet
- No voice input
- No OS agent

### Done Condition

- [ ] Kill the notifier process — webhook handler
      continues without crashing
- [ ] Dashboard shows task completion in under 500ms
- [ ] Grafana shows live metrics from all 3 services
- [ ] Sentry captures a test error correctly

---

## Phase 4 — Memory, Systems & Infrastructure

**Goal:** AI memory layer, OS-level control,
and production-grade infrastructure.

**Disciplines:** Memory Systems · Systems Programming ·
Infrastructure Thinking

### Features

- [ ] Vector embeddings for all tasks (nomic-embed-text)
- [ ] Semantic search — "find my tasks about auth"
- [ ] AI resurfaces contextually related forgotten tasks
- [ ] Long-term memory store with decay scoring
- [ ] MEM·OS terminal — executes git, deploy, logs commands
- [ ] OS Agent — file watching, process management
- [ ] Full Docker containerisation of all services
- [ ] GitHub Actions CI — tests run on every push
- [ ] Zero-downtime deploys on Railway
- [ ] `.env` secrets managed via Railway dashboard

### Out of Scope

- No local LLM yet (embeddings via API)
- No WhatsApp

### Done Condition

- [ ] "find tasks about auth" returns semantically
      related tasks without exact keyword match
- [ ] `git push` from MEM·OS terminal triggers
      a real deploy
- [ ] `docker-compose up` starts all services
      with one command
- [ ] CI pipeline passes on GitHub

---

## Phase 5 — AI Engineering

**Goal:** Replace cloud AI with local models. Build
reliable, testable, observable AI-powered features.

**Disciplines:** AI Engineering

### Features

- [ ] Ollama integration — Llama 3.1 8B running locally
- [ ] Intent classification via local LLM
- [ ] Entity extraction (task name, due date, priority)
- [ ] Personalized nudge message generation
- [ ] Prompt regression test suite
- [ ] AI backend swappable via `AI_PROVIDER` env flag
- [ ] Streaming responses for long AI outputs
- [ ] Token usage and latency tracked in observability stack
- [ ] Python sidecar for Whisper voice-to-text (optional)

### Done Condition

- [ ] `AI_PROVIDER=local` uses Ollama,
      `AI_PROVIDER=cloud` uses Claude API
- [ ] Both providers produce identical task extraction
      on the regression test suite
- [ ] AI latency visible in Grafana
- [ ] Voice note → task creation works end to end
