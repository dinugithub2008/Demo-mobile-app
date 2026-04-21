# JAG RENT Mobile Platform

Production-focused monorepo for an Australian equipment rental business platform:

- **Mobile app**: React Native (Expo + TypeScript)
- **Backend API**: NestJS + Prisma + PostgreSQL + Redis
- **Admin dashboard**: Next.js + Tailwind
- **Payments**: Stripe scaffolding with AUD defaults
- **Storage**: S3-compatible abstraction for ID/licence documents

## Monorepo structure

```txt
jag-rental-mobile-app/
  apps/
    mobile/      Expo app for customers
    backend/     NestJS API + Prisma
    admin/       Next.js admin dashboard
  packages/
    ui/          shared UI components
    config/      shared TypeScript and lint configs
```

## Architecture summary

### Core business domains

- **Auth & Accounts**: customer accounts, trade accounts, role-based admin users
- **Catalogue & Inventory**: equipment, categories, pricing tiers, add-ons, media
- **Availability & Booking**: live stock checks, hold windows, checkout reservation lifecycle
- **Logistics**: pickup vs delivery, delivery zone fees, same-day cut-off rules
- **Payments & Finance**: Stripe payment intent hooks, bond/deposit policies, refunds
- **Support & Compliance**: licence/ID documents, tickets, breakdown requests, audit logs

### Availability model

- Prevent double booking by enforcing overlap checks by equipment and rental window
- `BookingStatus.HOLD` reserves inventory during checkout with expiry
- Extension flow validates future availability before approval

### Security and reliability

- JWT-based auth skeleton with role guards
- Document storage service abstraction to support AWS S3-compatible providers
- Prisma transaction boundaries prepared for booking + payment operations
- Audit log module for high-impact changes

## Quick start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (optional, for local infra)

### 1) Install dependencies

```bash
pnpm install
```

### 2) Start infrastructure (Postgres + Redis)

```bash
docker compose up -d
```

### 3) Configure environment

Copy `.env.example` into:

- `apps/backend/.env`
- `apps/mobile/.env`
- `apps/admin/.env.local`

### 4) Generate Prisma client and seed demo data

```bash
pnpm --filter @jag/backend prisma:generate
pnpm --filter @jag/backend prisma:seed
```

### 5) Run apps

```bash
pnpm dev
```

### API docs

Swagger UI is available at `http://localhost:4000/api/docs` once the backend is running.

## App responsibilities

### Mobile app (customer)

- Auth and onboarding
- Catalogue browsing, search/filter, equipment details
- Booking flow (dates, pickup/delivery, add-ons, documents, payment)
- My hires, extension request, invoices/history, support requests

### Admin dashboard

- Bookings, inventory, pricing rules, delivery zones
- Customer and trade account approvals
- Support tickets and payment/refund oversight

### Backend API

- Modular NestJS APIs
- Prisma ORM schema for all rental entities
- Stripe and storage provider scaffolding

## Production notes

- All currency stored in cents (AUD)
- Dates persisted in UTC; client displays local time (Australia/Sydney default)
- Deposit/bond, cancellation policy, and late fee handling are configurable via policy tables/hooks
