import { CardEffectType } from '../enums/card-effect.enum.js';
import { CardRarity } from '../enums/card-rarity.enum.js';

export type CardEffect = {
  description: string;
  effectType: CardEffectType;
  value: number;
};

export type Card = {
  id: string;
  name: string;
  rarity: CardRarity;
  effect: CardEffect;
  isUnique?: boolean;
};
