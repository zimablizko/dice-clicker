import { Combo } from '../enums/combo.enum';
import { ComboProperties } from '../model/combo.model';

export const COMBO_VALUES: Map<Combo, ComboProperties> = new Map([
  [Combo.None, { multiplier: 0 }],
  [Combo.Pair, { multiplier: 1.2 }],
  [Combo.TwoPairs, { multiplier: 1.5 }],
  [Combo.ThreeOfAKind, { multiplier: 1.8 }],
  [Combo.FourStraight, { multiplier: 2.1 }],
  [Combo.FourOfAKind, { multiplier: 2.5 }],
  [Combo.FiveStraight, { multiplier: 3 }],
  [Combo.FullHouse, { multiplier: 4 }],
  [Combo.FiveOfAKind, { multiplier: 5 }],
  [Combo.SixOfAKind, { multiplier: 6 }],
]);
