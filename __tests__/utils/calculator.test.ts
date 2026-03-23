import {calculateDiscount, calculateFinalPrice} from '../../src/utils/calculator';
import {CalculationInput} from '../../src/types/calculator';

// ─── calculateDiscount ───────────────────────────────────────────────────────

describe('calculateDiscount', () => {
  it('returns correct percentage discount', () => {
    expect(calculateDiscount(100, 10, 0)).toBe(10);
  });

  it('returns 0 when price is 0', () => {
    expect(calculateDiscount(0, 50, 0)).toBe(0);
  });

  it('returns 0 when discount percent is 0', () => {
    expect(calculateDiscount(200, 0, 0)).toBe(0);
  });

  it('caps discount at 100% of price', () => {
    expect(calculateDiscount(100, 150, 0)).toBe(100);
  });

  it('respects maxDiscount cap', () => {
    // 30% of 500 = 150 but cap is 100
    expect(calculateDiscount(500, 30, 100)).toBe(100);
  });

  it('does NOT cap when maxDiscount is 0', () => {
    // 50% of 500 = 250, no cap
    expect(calculateDiscount(500, 50, 0)).toBe(250);
  });

  it('maxDiscount cap = 0 means no cap (not zero cap)', () => {
    expect(calculateDiscount(1000, 20, 0)).toBe(200);
  });

  it('returns 0 for NaN price', () => {
    expect(calculateDiscount(NaN, 10, 0)).toBe(0);
  });

  it('returns 0 for NaN discountPercent', () => {
    expect(calculateDiscount(100, NaN, 0)).toBe(0);
  });

  it('returns 0 for negative price', () => {
    expect(calculateDiscount(-100, 10, 0)).toBe(0);
  });

  it('handles floating point percent correctly', () => {
    expect(calculateDiscount(100, 5.5, 0)).toBeCloseTo(5.5);
  });
});

// ─── calculateFinalPrice ─────────────────────────────────────────────────────

describe('calculateFinalPrice', () => {
  const base: CalculationInput = {
    price: 100,
    discountPercent: 0,
    maxDiscount: 0,
    voucher: 0,
    shipping: 0,
  };

  it('returns price unchanged when no discounts or shipping', () => {
    const result = calculateFinalPrice(base);
    expect(result.finalPrice).toBe(100);
    expect(result.discountAmount).toBe(0);
    expect(result.savedAmount).toBe(0);
  });

  it('applies percentage discount correctly', () => {
    const result = calculateFinalPrice({...base, discountPercent: 20});
    expect(result.discountAmount).toBe(20);
    expect(result.finalPrice).toBe(80);
    expect(result.savedAmount).toBe(20);
  });

  it('applies voucher subtraction after discount', () => {
    const result = calculateFinalPrice({
      ...base,
      discountPercent: 10,
      voucher: 5,
    });
    // discountAmount = 10, voucher = 5, saved = 15, final = 100 - 10 - 5 = 85
    expect(result.discountAmount).toBe(10);
    expect(result.savedAmount).toBe(15);
    expect(result.finalPrice).toBe(85);
  });

  it('adds shipping correctly', () => {
    const result = calculateFinalPrice({...base, shipping: 20});
    expect(result.finalPrice).toBe(120);
    expect(result.savedAmount).toBe(0);
  });

  it('clamps finalPrice to 0 when discounts exceed price', () => {
    // 200 discount + 50 voucher > 100 price
    const result = calculateFinalPrice({
      ...base,
      discountPercent: 100,
      maxDiscount: 0,
      voucher: 50,
    });
    expect(result.finalPrice).toBe(0);
  });

  it('respects maxDiscount cap', () => {
    const result = calculateFinalPrice({
      price: 500,
      discountPercent: 30, // 150 raw
      maxDiscount: 100,    // capped to 100
      voucher: 0,
      shipping: 0,
    });
    expect(result.discountAmount).toBe(100);
    expect(result.finalPrice).toBe(400);
  });

  it('savedAmount is discountAmount + voucher', () => {
    const result = calculateFinalPrice({
      price: 200,
      discountPercent: 10,  // 20
      maxDiscount: 0,
      voucher: 15,
      shipping: 0,
    });
    expect(result.savedAmount).toBe(35);
    expect(result.finalPrice).toBe(165);
  });

  it('full calculation: discount + voucher + shipping', () => {
    const result = calculateFinalPrice({
      price: 300,
      discountPercent: 10,  // 30
      maxDiscount: 0,
      voucher: 20,
      shipping: 15,
    });
    expect(result.discountAmount).toBe(30);
    expect(result.savedAmount).toBe(50);
    expect(result.finalPrice).toBe(265); // 300 - 30 - 20 + 15
  });

  it('never returns NaN in any field', () => {
    const result = calculateFinalPrice({
      price: NaN,
      discountPercent: NaN,
      maxDiscount: NaN,
      voucher: NaN,
      shipping: NaN,
    });
    expect(result.finalPrice).not.toBeNaN();
    expect(result.discountAmount).not.toBeNaN();
    expect(result.savedAmount).not.toBeNaN();
  });

  it('all results are >= 0', () => {
    const result = calculateFinalPrice({
      price: -100,
      discountPercent: -50,
      maxDiscount: -10,
      voucher: -20,
      shipping: -5,
    });
    expect(result.finalPrice).toBeGreaterThanOrEqual(0);
    expect(result.discountAmount).toBeGreaterThanOrEqual(0);
    expect(result.savedAmount).toBeGreaterThanOrEqual(0);
  });
});
