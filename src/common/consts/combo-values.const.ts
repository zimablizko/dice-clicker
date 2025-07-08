import { Combo } from '../enums/combo.enum.js';
import { ComboProperties } from '../model/combo.model.js';

export const COMBO_VALUES: Map<Combo, ComboProperties> = new Map([
  [Combo.None, { multiplier: 1, name: '' }],
  [Combo.Pair, { multiplier: 1.4, name: 'Pair' }],
  [Combo.TwoPairs, { multiplier: 1.8, name: 'Two Pairs' }],
  [Combo.ThreeOfAKind, { multiplier: 2.2, name: 'Three of a Kind' }],
  [Combo.FourStraight, { multiplier: 2.9, name: 'Small Straight' }],
  [Combo.FourOfAKind, { multiplier: 3.5, name: 'Four of a Kind' }],
  [Combo.FiveStraight, { multiplier: 5, name: 'Big Straight' }],
  [Combo.FullHouse, { multiplier: 8, name: 'Full House' }],
  [Combo.FiveOfAKind, { multiplier: 10, name: 'Five of a Kind' }],
  [Combo.SixOfAKind, { multiplier: 40, name: 'Six of a Kind' }],
]);
