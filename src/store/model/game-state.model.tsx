import { Achievement } from '../../common/enums/achievement.enum.js';
import { ShopUpgrade } from '../../common/enums/shop-upgrade.enum.js';
import { Upgrade } from '../../common/enums/upgrade.enum.js';
import { Card } from '../../common/model/card.model.js';

export type GameState = {
  resources: Resources;
  stats: GameStats;
  achievements: Record<Achievement, boolean>;
  upgradeLevels: Record<Upgrade, number>;
  shopUpgradeLevels: Record<ShopUpgrade, number>;
  cards: Card[];
  cardDrawPrice: number;
};

export interface GameStats {
  diceRolls: number;
  bestRoll: number;
  maxChips: number;
  payouts: number;
}

export interface Resources {
  chips: number;
  coins: number;
}

export type StateAction<T> = {
  type: string;
  payload: T;
};
