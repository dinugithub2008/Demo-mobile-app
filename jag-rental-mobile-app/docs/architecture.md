# JAG RENT Architecture Notes

## Backend modules

- `auth`: JWT login/refresh scaffold
- `users`: profile + address management
- `equipment`: catalogue, details, pricing, media
- `bookings`: availability checks, hold creation, booking lifecycle hooks
- `trade-accounts`: company applications + approvals
- `payments`: Stripe payment intent and refund hooks
- `delivery`: zone-based delivery fee and same-day cutoff configuration
- `support`: customer support and breakdown tickets
- `documents`: ID/licence upload metadata and verification workflow hooks
- `audit`: central audit logging for sensitive mutations

## Mobile navigation structure

- `Login`
- `Catalogue`
- `EquipmentDetails`
- `BookingFlow`
- `MyHires`

## Admin dashboard route map

- `/bookings`
- `/inventory`
- `/pricing`
- `/delivery-zones`
- `/customers`
- `/trade-accounts`
- `/support`
- `/payments`
- `/content`
