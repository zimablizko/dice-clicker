import { Upgrade } from '../enums/upgrade.enum.js';
import { UpgradeProperties } from '../model/upgrade.model.js';

export const UPGRADE_VALUES: Array<UpgradeProperties> = [
  {
    id: Upgrade.DiceAmount,
    name: 'Dices',
    baseCost: 0.1,
    costMultiplier: 10,
    value: 1,
  },
  {
    id: Upgrade.ReduceCooldown,
    name: 'Reduce cooldown',
    baseCost: 5,
    costMultiplier: 15,
    value: 1.1,
    isPercentage: true,
  },
  {
    id: Upgrade.PointsMultiplier,
    name: 'Points multiplier',
    baseCost: 10,
    costMultiplier: 20,
    value: 1.2,
    isPercentage: true,
  },
];
