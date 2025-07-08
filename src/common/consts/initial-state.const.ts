import { GameState } from '../../store/model/game-state.model.js';
import { Achievement } from '../enums/achievement.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';

const achievements: Record<Achievement, boolean> = Object.fromEntries(
  Object.values(Achievement).map((achievement) => [achievement, false]),
) as Record<Achievement, boolean>;

const upgradeLevels: Record<Upgrade, number> = Object.fromEntries(
  Object.values(Upgrade).map((upgrade) => [upgrade, 0]),
) as Record<Upgrade, number>;

export const INITIAL_STATE: GameState = {
  resources: { chips: 0, coins: 0 },
  stats: {
    diceRolls: 0,
    bestRoll: 0,
    maxChips: 0,
    payouts: 0,
    totalTimePlayed: 0,
    startTime: Math.floor(Date.now() / 1000),
    achievementsUnlocked: 0,
  },
  achievements,
  upgradeLevels,
  cards: [],
  cardDrawPrice: 10,
};
