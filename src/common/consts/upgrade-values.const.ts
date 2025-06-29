import { ResourceType } from '../enums/resource-type.enum.js';
import { ShopUpgrade } from '../enums/shop-upgrade.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';
import { UpgradeProperties } from '../model/upgrade.model.js';
import { GAME_SETTINGS } from './game-settings.const.js';

const CHIPS_UPGRADES: Array<UpgradeProperties> = [
  {
    id: Upgrade.DiceAmount,
    name: 'Extra Dices',
    baseCost: 10,
    costMultiplier: 10,
    valueFn: (gameState) =>
      gameState!.upgradeLevels[Upgrade.DiceAmount] +
      GAME_SETTINGS.diceInitAmount,
    levels: 5,
    resourceType: ResourceType.Chips,
  },
  {
    id: Upgrade.ReduceCooldown,
    name: 'Cooldown reduction',
    baseCost: 150,
    costMultiplier: 3,
    valueFn: (gameState) =>
      1.1 ** gameState!.upgradeLevels[Upgrade.ReduceCooldown],
    levels: 1000,
    resourceType: ResourceType.Chips,
  },
  {
    id: Upgrade.ChipsMultiplierFromTotalPlaytime,
    name: 'Multiplier to chips, based on total playtime',
    baseCost: 1000,
    costMultiplier: 0,
    valueFn: (gameState) =>
      1 + Math.sqrt(Math.max(1, gameState!.stats.totalTimePlayed)) * 0.1,
    levels: 1,
    resourceType: ResourceType.Chips,
  },
  {
    id: Upgrade.ReduceAutoRollCooldown,
    name: 'Auto-roll Cooldown reduction',
    baseCost: 1500,
    costMultiplier: 5,
    valueFn: (gameState) =>
      1.1 ** gameState!.upgradeLevels[Upgrade.ReduceAutoRollCooldown],
    levels: 1000,
    resourceType: ResourceType.Chips,
    conditionsFn: (gameState) =>
      gameState.shopUpgradeLevels[ShopUpgrade.AutoRoll] > 0,
  },

  {
    id: Upgrade.ChipsMultiplierFromTotalRolls,
    name: 'Multiplier to chips, based on total rolls made',
    baseCost: 500,
    costMultiplier: 0,
    valueFn: (gameState) =>
      1 + Math.log10(Math.max(1, gameState!.stats.diceRolls)) * 0.5,

    levels: 1,
    resourceType: ResourceType.Chips,
  },
  {
    id: Upgrade.ChipsMultiplierFromBestRoll,
    name: 'Multiplier to chips, based on best roll',
    baseCost: 2000,
    costMultiplier: 0,
    valueFn: (gameState) =>
      1 + Math.sqrt(Math.max(1, gameState!.stats.bestRoll)) * 0.05,
    levels: 1,
    resourceType: ResourceType.Chips,
    // conditionsFn: (gameState) =>
    //   gameState.upgradeLevels[Upgrade.ChipsMultiplierFromTotalRolls] >= 1,
  },
  {
    id: Upgrade.ChipsMultiplierFromTotalAchievements,
    name: 'Multiplier to chips, based on total achievements unlocked',
    baseCost: 10000,
    costMultiplier: 0,
    valueFn: (gameState) =>
      1 + Math.sqrt(Math.max(1, gameState!.stats.achievementsUnlocked)) * 0.4,
    levels: 1,
    resourceType: ResourceType.Chips,
    // conditionsFn: (gameState) =>
    //   gameState.upgradeLevels[Upgrade.MediumChipsMultiplier] >= 1,
  },
];

const COINS_UPGRADES: Array<UpgradeProperties> = [
  {
    id: ShopUpgrade.CardDraw,
    name: 'Unlock cards',
    baseCost: 250,
    costMultiplier: 0,
    valueFn: () => 0,
    levels: 1,
    resourceType: ResourceType.Coins,
  },
  {
    id: ShopUpgrade.PairMultiplier,
    name: 'Pair combo multiplier',
    baseCost: 1,
    costMultiplier: 2,
    valueFn: () => 0.3,
    levels: 5,
    resourceType: ResourceType.Coins,
  },
  {
    id: ShopUpgrade.TwoPairsMultiplier,
    name: 'Two pairs combo multiplier',
    baseCost: 10,
    costMultiplier: 5,
    valueFn: () => 0.6,
    levels: 5,
    resourceType: ResourceType.Coins,
    conditionsFn: (gameState) => {
      return gameState.stats.payouts >= 3;
    },
  },
  {
    id: ShopUpgrade.ThreeOfAKindMultiplier,
    name: 'Three of a kind combo multiplier',
    baseCost: 100,
    costMultiplier: 10,
    valueFn: () => 0.9,
    levels: 5,
    resourceType: ResourceType.Coins,
    conditionsFn: (gameState) => {
      return gameState.stats.payouts >= 5;
    },
  },
  {
    id: ShopUpgrade.AutoRoll,
    name: 'Unlock auto roll upgrade',
    baseCost: 100,
    costMultiplier: 0,
    valueFn: () => 0,
    levels: 1,
    resourceType: ResourceType.Coins,
  },
  {
    id: ShopUpgrade.CoinGainMultiplier,
    name: 'Coin gain multiplier',
    baseCost: 10,
    costMultiplier: 10,
    valueFn: (gameState) =>
      2 ** gameState!.shopUpgradeLevels[ShopUpgrade.CoinGainMultiplier],
    levels: 5,
    resourceType: ResourceType.Coins,
  },
];

export const UPGRADE_VALUES: Array<UpgradeProperties> = [
  ...CHIPS_UPGRADES,
  ...COINS_UPGRADES,
];

export const UPGRADE_MAP: Map<Upgrade | ShopUpgrade, UpgradeProperties> =
  new Map(UPGRADE_VALUES.map((upgrade) => [upgrade.id, upgrade]));
