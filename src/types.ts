export type ServiceType = 'pickup' | 'delivery';

export type AddOn = {
  id: string;
  name: string;
  price: number;
};

export type BookingInput = {
  customerName: string;
  email: string;
  date: string;
  time: string;
  serviceType: ServiceType;
  address?: string;
  addOns: AddOn[];
  basePrice: number;
};

export type PricingBreakdown = {
  basePrice: number;
  addOnTotal: number;
  serviceFee: number;
  tradeDiscount: number;
  total: number;
};

export type BusinessProfile = {
  companyName: string;
  contactName: string;
  taxId: string;
  approved: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'staff';
};

export type BookingRecord = BookingInput & {
  id: string;
  status: 'pending' | 'confirmed' | 'completed';
};

export type SupportTicket = {
  id: string;
  customer: string;
  issue: string;
  status: 'open' | 'closed';
};
