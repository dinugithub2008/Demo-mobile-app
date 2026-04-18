import type { BookingInput, BusinessProfile } from '../types';

export const validateBooking = (booking: Partial<BookingInput>): string[] => {
  const errors: string[] = [];

  if (!booking.customerName?.trim()) errors.push('Customer name is required.');
  if (!booking.email?.includes('@')) errors.push('A valid email is required.');
  if (!booking.date) errors.push('Booking date is required.');
  if (!booking.time) errors.push('Booking time is required.');
  if (booking.serviceType === 'delivery' && !booking.address?.trim()) {
    errors.push('Delivery address is required.');
  }

  return errors;
};

export const validateBusinessProfile = (profile: Partial<BusinessProfile>): string[] => {
  const errors: string[] = [];
  if (!profile.companyName?.trim()) errors.push('Company name is required.');
  if (!profile.contactName?.trim()) errors.push('Contact name is required.');
  if (!profile.taxId?.trim()) errors.push('Tax ID is required.');
  return errors;
};
