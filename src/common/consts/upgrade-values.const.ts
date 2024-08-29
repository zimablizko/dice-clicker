import { Upgrade } from '../enums/upgrade.enum.js';
import { UpgradeProperties } from '../model/upgrade.model.js';

export const UPGRADE_VALUES: Array<UpgradeProperties> = [
  {
    id: Upgrade.DiceAmount,
    name: 'Dices',
    baseCost: 0.1,
    costMultiplier: 10,
    value: 1,
    levels: 1000,
  },
  {
    id: Upgrade.ReduceCooldown,
    name: 'Cooldown reduction',
    baseCost: 5,
    costMultiplier: 15,
    value: 1.1,
    isPercentage: true,
    levels: 1000,
  },

  {
    id: Upgrade.SmallChipsMultiplier,
    name: 'Small chips multiplier',
    baseCost: 10,
    costMultiplier: 15,
    value: 0.2,
    isPercentage: true,
    levels: 1,
  },
  {
    id: Upgrade.MediumChipsMultiplier,
    name: 'Medium chips multiplier',
    baseCost: 100,
    costMultiplier: 20,
    value: 0.5,
    isPercentage: true,
    levels: 1,
  },
  {
    id: Upgrade.BigChipsMultiplier,
    name: 'Big chips multiplier',
    baseCost: 1000,
    costMultiplier: 25,
    value: 0.8,
    isPercentage: true,
    levels: 1,
  },
];
