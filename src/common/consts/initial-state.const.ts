import { GameState } from '../../store/model/game-state.model.js';
import { Achievement } from '../enums/achievement.enum.js';
import { ShopUpgrade } from '../enums/shop-upgrade.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';

const achievements = {
  [Achievement.Roll1]: false,
  [Achievement.Roll10]: false,
  [Achievement.Roll100]: false,
  [Achievement.Roll1000]: false,
  [Achievement.Chips100]: false,
  [Achievement.Chips1000]: false,
  [Achievement.Chips10000]: false,
  [Achievement.Chips100000]: false,
  [Achievement.Payout1]: false,
  [Achievement.Payout10]: false,
  [Achievement.Payout100]: false,
  [Achievement.Payout1000]: false,
};

const upgradeLevels = {
  [Upgrade.DiceAmount]: 0,
  [Upgrade.ReduceCooldown]: 0,
  [Upgrade.SmallChipsMultiplier]: 0,
  [Upgrade.MediumChipsMultiplier]: 0,
  [Upgrade.BigChipsMultiplier]: 0,
  [Upgrade.ReduceAutoRollCooldown]: 0,
};

const shopUpgradeLevels = {
  [ShopUpgrade.PairMultiplier]: 0,
  [ShopUpgrade.TwoPairsMultiplier]: 0,
  [ShopUpgrade.ThreeOfAKindMultiplier]: 0,
  [ShopUpgrade.AutoRoll]: 0,
};

export const INITIAL_STATE: GameState = {
  resources: { chips: 99995, coins: 99999 },
  stats: { diceRolls: 0, bestRoll: 0, maxChips: 0, payouts: 1 },
  achievements,
  upgradeLevels,
  shopUpgradeLevels,
};
