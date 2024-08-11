import { Achievement } from '../../common/enums/achievement.enum';
import { Upgrade } from '../../common/enums/upgrade.enum';

export type GameState = {
  points: number;
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
}

export type StateAction<T> = {
  type: string;
  payload: T;
};
