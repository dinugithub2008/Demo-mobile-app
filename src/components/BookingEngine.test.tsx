import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingEngine } from './BookingEngine';

describe('BookingEngine', () => {
  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<BookingEngine />);

    await user.click(screen.getByRole('button', { name: 'Confirm & Checkout' }));

    expect(screen.getByText(/Customer name is required/i)).toBeTruthy();
  });
});
