import { Combo } from '../enums/combo.enum.js';
import { ComboProperties } from '../model/combo.model.js';

export const COMBO_VALUES: Map<Combo, ComboProperties> = new Map([
  [Combo.None, { multiplier: 0, name: '' }],
  [Combo.Pair, { multiplier: 0.2, name: 'Pair' }],
  [Combo.TwoPairs, { multiplier: 0.5, name: 'Two Pairs' }],
  [Combo.ThreeOfAKind, { multiplier: 0.8, name: 'Three of a Kind' }],
  [Combo.FourStraight, { multiplier: 1.1, name: 'Small Straight' }],
  [Combo.FourOfAKind, { multiplier: 1.5, name: 'Four of a Kind' }],
  [Combo.FiveStraight, { multiplier: 2, name: 'Big Straight' }],
  [Combo.FullHouse, { multiplier: 3, name: 'Full House' }],
  [Combo.FiveOfAKind, { multiplier: 4, name: 'Five of a Kind' }],
  [Combo.SixOfAKind, { multiplier: 5, name: 'Six of a Kind' }],
]);
