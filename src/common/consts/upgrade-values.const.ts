import { ResourceType } from '../enums/resource-type.enum.js';
import { ShopUpgrade } from '../enums/shop-upgrade.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';
import { UpgradeProperties } from '../model/upgrade.model.js';

const CHIPS_UPGRADES: Array<UpgradeProperties> = [
  {
    id: Upgrade.DiceAmount,
    name: 'Extra Dices',
    baseCost: 10,
    costMultiplier: 10,
    value: 1,
    levels: 5,
    resourceType: ResourceType.Chips,
  },
  {
    id: Upgrade.ReduceCooldown,
    name: 'Cooldown reduction',
    baseCost: 150,
    costMultiplier: 5,
    value: 1.1,
    levels: 1000,
    resourceType: ResourceType.Chips,
  },
  {
    id: Upgrade.ReduceAutoRollCooldown,
    name: 'Auto-roll Cooldown reduction',
    baseCost: 1500,
    costMultiplier: 5,
    value: 1.1,
    levels: 1000,
    resourceType: ResourceType.Chips,
  },

  {
    id: Upgrade.SmallChipsMultiplier,
    name: 'Small chips multiplier',
    baseCost: 1500,
    costMultiplier: 0,
    value: 0.2,
    levels: 1,
    resourceType: ResourceType.Chips,
  },
  {
    id: Upgrade.MediumChipsMultiplier,
    name: 'Medium chips multiplier',
    baseCost: 20000,
    costMultiplier: 0,
    value: 0.5,
    levels: 1,
    resourceType: ResourceType.Chips,
  },
  {
    id: Upgrade.BigChipsMultiplier,
    name: 'Big chips multiplier',
    baseCost: 250000,
    costMultiplier: 0,
    value: 0.8,
    levels: 1,
    resourceType: ResourceType.Chips,
  },
];

const COINS_UPGRADES: Array<UpgradeProperties> = [
  {
    id: ShopUpgrade.PairMultiplier,
    name: 'Pair combo multiplier',
    baseCost: 1,
    costMultiplier: 2,
    value: 0.3,
    levels: 5,
    resourceType: ResourceType.Coins,
  },
  {
    id: ShopUpgrade.TwoPairsMultiplier,
    name: 'Two pairs combo multiplier',
    baseCost: 10,
    costMultiplier: 5,
    value: 0.6,
    levels: 5,
    resourceType: ResourceType.Coins,
  },
  {
    id: ShopUpgrade.ThreeOfAKindMultiplier,
    name: 'Three of a kind combo multiplier',
    baseCost: 100,
    costMultiplier: 10,
    value: 0.9,
    levels: 5,
    resourceType: ResourceType.Coins,
  },
  {
    id: ShopUpgrade.AutoRoll,
    name: 'Unlock auto roll upgrade',
    baseCost: 100,
    costMultiplier: 0,
    value: 0,
    levels: 1,
    resourceType: ResourceType.Coins,
  },
];

export const UPGRADE_VALUES: Array<UpgradeProperties> = [
  ...CHIPS_UPGRADES,
  ...COINS_UPGRADES,
];

export const UPGRADE_MAP: Map<Upgrade | ShopUpgrade, UpgradeProperties> =
  new Map(UPGRADE_VALUES.map((upgrade) => [upgrade.id, upgrade]));
