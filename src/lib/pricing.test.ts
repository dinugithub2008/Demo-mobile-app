import { describe, expect, it } from 'vitest';
import { calculatePricing } from './pricing';

describe('calculatePricing', () => {
  it('applies fee and trade discount correctly', () => {
    const pricing = calculatePricing(100, [{ id: 'x', name: 'addon', price: 20 }], true);
    expect(pricing).toEqual({
      basePrice: 100,
      addOnTotal: 20,
      serviceFee: 9.6,
      tradeDiscount: 14.4,
      total: 115.2
    });
  });
});
