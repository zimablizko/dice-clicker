import { GameState } from '../../store/model/game-state.model.js';
import { Achievement } from '../enums/achievement.enum.js';
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
};

const upgradeLevels = {
  [Upgrade.DiceAmount]: 1,
  [Upgrade.ReduceCooldown]: 0,
  [Upgrade.SmallChipsMultiplier]: 0,
  [Upgrade.MediumChipsMultiplier]: 0,
  [Upgrade.BigChipsMultiplier]: 0,
};

export const INITIAL_STATE: GameState = {
  chips: 0,
  diceAmount: 1,
  upgradeCost: 10,
  rollCooldown: 1500,
  stats: { diceRolls: 0, bestRoll: 0, maxChips: 0 },
  achievements: achievements,
  upgradeLevels: upgradeLevels,
};
