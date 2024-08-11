import { Combo } from '../enums/combo.enum';
import { ComboProperties } from '../model/combo.model';

export const COMBO_VALUES: Map<Combo, ComboProperties> = new Map([
  [Combo.None, { multiplier: 1, name: '' }],
  [Combo.Pair, { multiplier: 1.2, name: 'Pair' }],
  [Combo.TwoPairs, { multiplier: 1.5, name: 'Two Pairs' }],
  [Combo.ThreeOfAKind, { multiplier: 1.8, name: 'Three of a Kind' }],
  [Combo.FourStraight, { multiplier: 2.1, name: 'Small Straight' }],
  [Combo.FourOfAKind, { multiplier: 2.5, name: 'Four of a Kind' }],
  [Combo.FiveStraight, { multiplier: 3, name: 'Big Straight' }],
  [Combo.FullHouse, { multiplier: 4, name: 'Full House' }],
  [Combo.FiveOfAKind, { multiplier: 5, name: 'Five of a Kind' }],
  [Combo.SixOfAKind, { multiplier: 6, name: 'Six of a Kind' }],
]);
