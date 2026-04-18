import type { AddOn, PricingBreakdown } from '../types';

export const calculatePricing = (
  basePrice: number,
  addOns: AddOn[],
  isTrade: boolean
): PricingBreakdown => {
  const addOnTotal = addOns.reduce((sum, addOn) => sum + addOn.price, 0);
  const subtotal = basePrice + addOnTotal;
  const serviceFee = Number((subtotal * 0.08).toFixed(2));
  const tradeDiscount = isTrade ? Number((subtotal * 0.12).toFixed(2)) : 0;
  const total = Number((subtotal + serviceFee - tradeDiscount).toFixed(2));

  return {
    basePrice,
    addOnTotal,
    serviceFee,
    tradeDiscount,
    total
  };
};
