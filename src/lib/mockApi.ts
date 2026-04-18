import type { BookingRecord, BusinessProfile, SupportTicket, TeamMember } from '../types';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const createStripeCheckoutSession = async (bookingId: string): Promise<{ checkoutUrl: string }> => {
  await delay();
  return { checkoutUrl: `https://checkout.stripe.com/pay/${bookingId}` };
};

export const submitBooking = async (booking: BookingRecord): Promise<BookingRecord> => {
  await delay();
  return { ...booking, status: 'confirmed' };
};

export const submitTradeApplication = async (profile: BusinessProfile): Promise<BusinessProfile> => {
  await delay();
  return { ...profile, approved: false };
};

export const addTeamMember = async (member: TeamMember): Promise<TeamMember> => {
  await delay(250);
  return member;
};

export const fetchDashboard = async (): Promise<{
  totalBookings: number;
  pendingBookings: number;
  openTickets: number;
  inventoryLowStock: number;
  approvalsPending: number;
}> => {
  await delay();
  return {
    totalBookings: 184,
    pendingBookings: 17,
    openTickets: 9,
    inventoryLowStock: 6,
    approvalsPending: 4
  };
};

export const updateSupportTicket = async (ticket: SupportTicket): Promise<SupportTicket> => {
  await delay(200);
  return ticket;
};
