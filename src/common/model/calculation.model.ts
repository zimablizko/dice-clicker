import { ComboProperties } from './combo.model.js';

export type CalculationResult = {
  baseValue: number;
  comboProperties: ComboProperties;
  upgradeMultiplier: number;
  result: number;
};
