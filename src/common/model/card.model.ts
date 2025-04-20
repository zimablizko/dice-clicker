import { CardRarity } from '../enums/card-rarity.enum.js';

export type CardEffect = {
  description: string;
  effectType: string;
  value: number;
};

export type Card = {
  id: string;
  name: string;
  rarity: CardRarity;
  effect: CardEffect;
};
