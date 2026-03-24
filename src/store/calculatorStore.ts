import {create} from 'zustand';
import {CalculationInput, CalculationResult} from '../types/calculator';
import {calculateFinalPrice} from '../utils/calculator';

const DEFAULT_INPUT: CalculationInput = {
  price: 0,
  discountPercent: 0,
  maxDiscount: 0,
  voucher: 0,
  shipping: 0,
};

const DEFAULT_RESULT: CalculationResult = {
  discountAmount: 0,
  savedAmount: 0,
  finalPrice: 0,
};

type CalculatorStore = {
  input: CalculationInput;
  result: CalculationResult;
  setField: (key: keyof CalculationInput, raw: string) => void;
  calculate: () => void;
};

function parseField(raw: string): number {
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export const useCalculatorStore = create<CalculatorStore>((set, get) => ({
  input: DEFAULT_INPUT,
  result: DEFAULT_RESULT,

  setField: (key, raw) => {
    set(state => ({input: {...state.input, [key]: parseField(raw)}}));
    get().calculate();
  },

  calculate: () => {
    const result = calculateFinalPrice(get().input);
    set({result});
  },
}));
