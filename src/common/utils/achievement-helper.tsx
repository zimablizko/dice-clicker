import { GameState } from '../../store/model/game-state.model.js';
import { ACHIEVEMENT_VALUES } from '../consts/achievement-values.const.js';
import { AchievementGroup } from '../enums/achievement.enum.js';

export const checkForAchievements = (gameState: GameState) => {
  const newAchievements = [];
  const currentAchievements = gameState.achievements;

  //check for rolls achievements
  const rolls = gameState.stats.diceRolls;
  const rollsAchievements = ACHIEVEMENT_VALUES.filter(
    (a) => a.group === AchievementGroup.Rolls,
  );
  for (const ach of rollsAchievements) {
    if (currentAchievements[ach.id]) continue;
    if (rolls >= Number(ach.numCondition)) {
      newAchievements.push(ach.id);
    }
  }

  //check for chips achievements
  const chips = gameState.resources.chips;
  const chipsAchievements = ACHIEVEMENT_VALUES.filter(
    (a) => a.group === AchievementGroup.Chips,
  );
  for (const ach of chipsAchievements) {
    if (currentAchievements[ach.id]) continue;
    if (chips >= Number(ach.numCondition)) {
      newAchievements.push(ach.id);
    }
  }

  //check for payout achievements
  const payouts = gameState.stats.payouts;
  const payoutAchievements = ACHIEVEMENT_VALUES.filter(
    (a) => a.group === AchievementGroup.Payouts,
  );
  for (const ach of payoutAchievements) {
    if (currentAchievements[ach.id]) continue;
    if (payouts >= Number(ach.numCondition)) {
      newAchievements.push(ach.id);
    }
  }

  return newAchievements;
};
