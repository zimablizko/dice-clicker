import { COMBO_VALUES } from '../consts/combo-values.const';
import { Combo } from '../enums/combo.enum';

export const calculatePoints = (baseValue: number, combo: Combo): number => {
  let result = baseValue;
  const comboProp = COMBO_VALUES.get(combo)!;
  result = Math.round(result * comboProp?.multiplier);
  console.log(baseValue, comboProp?.multiplier, result);
  return result;
};
