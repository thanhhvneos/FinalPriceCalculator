import {CalculationInput, CalculationResult} from '../types/calculator';

/**
 * Sanitize a raw number value — converts NaN/Infinity/undefined to 0.
 */
function sanitize(value: number): number {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 0;
  }
  return Math.max(0, value);
}

/**
 * Calculate the discount amount based on price, discount percent, and optional cap.
 *
 * @param price        - Original price (>= 0)
 * @param discountPercent - Discount percentage 0–100
 * @param maxDiscount  - Maximum discount cap; 0 means no cap
 * @returns Actual discount amount (>= 0, never NaN)
 */
export function calculateDiscount(
  price: number,
  discountPercent: number,
  maxDiscount: number,
): number {
  const safePrice = sanitize(price);
  const safePercent = sanitize(discountPercent);
  const safeCap = sanitize(maxDiscount);

  const raw = safePrice * (Math.min(safePercent, 100) / 100);
  const capped = safeCap > 0 ? Math.min(raw, safeCap) : raw;

  return sanitize(capped);
}

/**
 * Calculate the final price from all inputs.
 * Order of operations: price → apply discount → subtract voucher → add shipping.
 * Final price is clamped to >= 0.
 *
 * @param input - CalculationInput
 * @returns CalculationResult — all fields are valid numbers, never NaN
 */
export function calculateFinalPrice(input: CalculationInput): CalculationResult {
  const price = sanitize(input.price);
  const voucher = sanitize(input.voucher);
  const shipping = sanitize(input.shipping);

  const discountAmount = calculateDiscount(
    price,
    input.discountPercent,
    input.maxDiscount,
  );

  const savedAmount = sanitize(discountAmount + voucher);
  const finalPrice = sanitize(price - discountAmount - voucher + shipping);

  return {
    discountAmount,
    savedAmount,
    finalPrice,
  };
}
