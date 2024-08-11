import { ComboProperties } from './combo.model';

export type CalculationResult = {
  baseValue: number;
  comboProperties: ComboProperties;
  upgradeMultiplier: number;
  result: number;
};
