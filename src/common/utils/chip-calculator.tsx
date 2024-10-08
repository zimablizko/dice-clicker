import { COMBO_VALUES } from '../consts/combo-values.const.js';
import { Combo } from '../enums/combo.enum.js';
import { CalculationResult } from '../model/calculation.model.js';

export const calculateChips = (
  baseValue: number,
  combo: Combo,
  upgradeMultiplier: number,
): CalculationResult => {
  let result = baseValue;
  const comboProp = COMBO_VALUES.get(combo)!;
  result = Math.round(
    result *
      Math.max(comboProp?.multiplier, 1) *
      Math.max(upgradeMultiplier, 1),
  );
  return {
    baseValue,
    comboProperties: comboProp,
    upgradeMultiplier,
    result,
  };
};
