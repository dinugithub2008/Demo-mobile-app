import { describe, expect, it } from 'vitest';
import { validateBooking } from './validation';

describe('validateBooking', () => {
  it('requires address for delivery bookings', () => {
    const errors = validateBooking({
      customerName: 'Jane',
      email: 'jane@example.com',
      date: '2026-04-18',
      time: '10:00',
      serviceType: 'delivery',
      address: ''
    });

    expect(errors).toContain('Delivery address is required.');
  });
});
