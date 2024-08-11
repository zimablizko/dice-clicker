import { COMBO_VALUES } from '../consts/combo-values.const';
import { Combo } from '../enums/combo.enum';
import { CalculationResult } from '../model/calculation.model';

export const calculatePoints = (
  baseValue: number,
  combo: Combo,
): CalculationResult => {
  let result = baseValue;
  const comboProp = COMBO_VALUES.get(combo)!;
  result = Math.round(result * Math.max(comboProp?.multiplier, 1));
  console.log(baseValue, comboProp?.multiplier, result);
  return {
    baseValue,
    comboProperties: comboProp,
    result,
  };
};
