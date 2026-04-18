# Demo Mobile App — Tasks 4 to 7

This repository provides a working React + TypeScript prototype implementing:

- **Task 4 (Booking engine):** date/time selection, pickup vs delivery mode, address capture, add-ons, pricing breakdown, document upload placeholders, Stripe checkout scaffold, and booking confirmation.
- **Task 5 (Trade account):** business profile management, trade account application workflow, team member management with optimistic updates, trade pricing visibility, and company-level booking/history view.
- **Task 6 (Admin dashboard):** overview metrics, booking/inventory/customer/trade/pricing/zones/support views, plus support ticket updates with optimistic UI.
- **Task 7 (Quality):** loading/error states, form validation, optimistic updates in key interactions, test coverage for core flows, Docker support, and improved setup docs.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Tests

```bash
npm test
```

## Build

```bash
npm run build
```

## Docker

```bash
docker build -t demo-mobile-app .
docker run --rm -p 4173:4173 demo-mobile-app
```

Then open `http://localhost:4173`.

## Implementation highlights

### Booking flow
- Form includes customer details, date/time selectors, pickup/delivery toggle, and conditional delivery address.
- Add-on toggles update pricing in real-time.
- Document upload placeholders simulate future file ingestion.
- Checkout scaffolding creates a Stripe-like checkout URL to hand off payment.

### Trade features
- Trade application validates required profile fields.
- Team members are inserted optimistically and rolled back on failure.
- Trade pricing demonstrates discount visibility compared with standard charges.

### Admin features
- Dashboard loads asynchronously with loading and error states.
- Support ticket close action performs optimistic update with rollback on API failure.
- Dedicated sections cover booking, inventory, customer, trade, pricing rules, and delivery zones.

## Notes

This is a scaffold/prototype that uses mocked API functions and in-memory state.
