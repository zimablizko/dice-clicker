import { v4 as uuidv4 } from 'uuid';
import { CardEffectType } from '../enums/card-effect.enum.js';
import { CardRarity } from '../enums/card-rarity.enum.js';
import { Card } from '../model/card.model.js';

export const CARD_VALUES: Card[] = [
  {
    id: uuidv4(),
    name: 'Lucky Roll',
    rarity: CardRarity.Common,
    effect: {
      description: `Decrease roll cooldown by 10%`,
      effectType: CardEffectType.ReduceCooldown,
      value: 0.1,
    },
  },
  {
    id: uuidv4(),
    name: 'Easy Money',
    rarity: CardRarity.Common,
    effect: {
      description: 'Get 20% of chips instantly',
      effectType: CardEffectType.InstantChips,
      value: 0.2,
    },
  },
];
