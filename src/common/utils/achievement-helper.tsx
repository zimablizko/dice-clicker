import { GameState } from '../../store/model/game-state.model';
import { ACHIEVEMENT_VALUES } from '../consts/achievement-values.const';
import { AchievementGroup } from '../enums/achievement.enum';

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

  return newAchievements;
};
