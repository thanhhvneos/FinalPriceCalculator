import {CalculationInput} from './calculator';

export type RootStackParamList = {
  Home: {restore?: CalculationInput} | undefined;
  History: undefined;
};
