import { Achievement } from '../../common/enums/achievement.enum.js';
import { Upgrade } from '../../common/enums/upgrade.enum.js';

export type GameState = {
  chips: number;
  diceAmount: number;
  rollCooldown: number;
  upgradeCost: number;
  stats: GameStats;
  achievements: Record<Achievement, boolean>;
  upgradeLevels: Record<Upgrade, number>;
};

export interface GameStats {
  diceRolls: number;
  bestRoll: number;
  maxChips: number;
}

export type StateAction<T> = {
  type: string;
  payload: T;
};
