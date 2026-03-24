export type CalculationInput = {
  price: number;
  discountPercent: number;
  maxDiscount: number; // 0 means no cap
  voucher: number;
  shipping: number;
};

export type CalculationResult = {
  discountAmount: number;
  savedAmount: number;
  finalPrice: number;
};

export type HistoryItem = {
  id: string;
  input: CalculationInput;
  result: CalculationResult;
  createdAt: number;
};
