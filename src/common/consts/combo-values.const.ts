import { Combo } from '../enums/combo.enum.js';
import { ComboProperties } from '../model/combo.model.js';

export const COMBO_VALUES: Map<Combo, ComboProperties> = new Map([
  [Combo.None, { multiplier: 0, name: '' }],
  [Combo.Pair, { multiplier: 0.4, name: 'Pair' }],
  [Combo.TwoPairs, { multiplier: 0.8, name: 'Two Pairs' }],
  [Combo.ThreeOfAKind, { multiplier: 1.2, name: 'Three of a Kind' }],
  [Combo.FourStraight, { multiplier: 1.9, name: 'Small Straight' }],
  [Combo.FourOfAKind, { multiplier: 2.5, name: 'Four of a Kind' }],
  [Combo.FiveStraight, { multiplier: 4, name: 'Big Straight' }],
  [Combo.FullHouse, { multiplier: 6, name: 'Full House' }],
  [Combo.FiveOfAKind, { multiplier: 8, name: 'Five of a Kind' }],
  [Combo.SixOfAKind, { multiplier: 10, name: 'Six of a Kind' }],
]);
