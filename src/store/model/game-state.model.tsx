import { Achievement } from '../../common/enums/achievement.enum.js';
import { Upgrade } from '../../common/enums/upgrade.enum.js';
import { Card } from '../../common/model/card.model.js';

export type GameState = {
  resources: Resources;
  stats: GameStats;
  achievements: Record<Achievement, boolean>;
  upgradeLevels: Record<Upgrade, number>;
  cards: Card[];
  cardDrawPrice: number;
};

export interface GameStats {
  diceRolls: number;
  bestRoll: number;
  maxChips: number;
  payouts: number;
  startTime: number; // in seconds, used to calculate total time played
  firstLayerStartTime: number; // in seconds, used to calculate time played in the first layer
  totalTimePlayed: number; // in seconds
  firstLayerTimePlayed: number; // in seconds
  achievementsUnlocked: number;
}

export interface Resources {
  chips: number;
  coins: number;
}

export type StateAction<T> = {
  type: string;
  payload: T;
};
