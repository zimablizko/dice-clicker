import { v4 as uuidv4 } from 'uuid';
import { CardRarity } from '../enums/card-rarity.enum.js';
import { Card } from '../model/card.model.js';

export enum CardEffectType {
  RollMultiplier = 'rollMultiplier',
  DiceBonus = 'diceBonus',
  ComboMultiplier = 'comboMultiplier',
  CooldownReduction = 'cooldownReduction',
  PayoutBonus = 'payoutBonus',
  AutoRollSpeed = 'autoRollSpeed',
}

export const CARD_VALUES: Card[] = [
  {
    id: uuidv4(),
    name: 'Lucky Clover',
    rarity: CardRarity.Common,
    effect: {
      description: 'Increase roll value by 5%',
      effectType: CardEffectType.RollMultiplier,
      value: 0.05,
    },
  },
  {
    id: uuidv4(),
    name: 'Double Trouble',
    rarity: CardRarity.Uncommon,
    effect: {
      description: 'Increase pair combo bonus by 10%',
      effectType: CardEffectType.ComboMultiplier,
      value: 0.1,
    },
  },
  {
    id: uuidv4(),
    name: 'Quick Hands',
    rarity: CardRarity.Common,
    effect: {
      description: 'Reduce roll cooldown by 3%',
      effectType: CardEffectType.CooldownReduction,
      value: 0.03,
    },
  },
  {
    id: uuidv4(),
    name: 'Golden Dice',
    rarity: CardRarity.Rare,
    effect: {
      description: 'Increase all rolls by 15%',
      effectType: CardEffectType.RollMultiplier,
      value: 0.15,
    },
  },
  {
    id: uuidv4(),
    name: 'Wealth Magnet',
    rarity: CardRarity.Epic,
    effect: {
      description: 'Increase payout by 20%',
      effectType: CardEffectType.PayoutBonus,
      value: 0.2,
    },
  },
  {
    id: uuidv4(),
    name: 'Extra Die',
    rarity: CardRarity.Uncommon,
    effect: {
      description: 'Add +1 to every dice value',
      effectType: CardEffectType.DiceBonus,
      value: 1,
    },
  },
  {
    id: uuidv4(),
    name: 'Combo Master',
    rarity: CardRarity.Rare,
    effect: {
      description: 'All combo multipliers increased by 10%',
      effectType: CardEffectType.ComboMultiplier,
      value: 0.1,
    },
  },
  {
    id: uuidv4(),
    name: 'Speed Roller',
    rarity: CardRarity.Uncommon,
    effect: {
      description: 'Auto-roll speed increased by 5%',
      effectType: CardEffectType.AutoRollSpeed,
      value: 0.05,
    },
  },
  {
    id: uuidv4(),
    name: 'Legendary Fortune',
    rarity: CardRarity.Legendary,
    effect: {
      description: 'Increases all earnings by 30%',
      effectType: CardEffectType.RollMultiplier,
      value: 0.3,
    },
  },
  {
    id: uuidv4(),
    name: 'Straight Shooter',
    rarity: CardRarity.Epic,
    effect: {
      description: 'Straight combos give 25% more chips',
      effectType: CardEffectType.ComboMultiplier,
      value: 0.25,
    },
  },
  {
    id: uuidv4(),
    name: 'Swift Fingers',
    rarity: CardRarity.Common,
    effect: {
      description: 'Reduce roll cooldown by 2%',
      effectType: CardEffectType.CooldownReduction,
      value: 0.02,
    },
  },
  {
    id: uuidv4(),
    name: 'Triple Threat',
    rarity: CardRarity.Rare,
    effect: {
      description: 'Three of a kind gives 15% more chips',
      effectType: CardEffectType.ComboMultiplier,
      value: 0.15,
    },
  },
];
