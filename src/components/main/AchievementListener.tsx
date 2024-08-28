import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACHIEVEMENT_VALUES } from '../../common/consts/achievement-values.const.js';
import { checkForAchievements } from '../../common/utils/achievement-helper.js';
import { unlockAchievement } from '../../store/game-state.js';
import { GameState } from '../../store/model/game-state.model.js';
import { showSnackbar } from '../../store/snackbar-state.js';

export default function AchievementListener() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  useEffect(() => {
    const newAchievements = checkForAchievements(gameState);
    if (newAchievements.length) {
      for (const ach of newAchievements) {
        dispatch(unlockAchievement(ach));
        dispatch(
          showSnackbar(`Achievement unlocked: ${ACHIEVEMENT_VALUES[ach].name}`),
        );
      }
    }
  }, [gameState.stats.diceRolls, gameState.stats.maxPoints]);

  return <></>;
}
