import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACHIEVEMENT_VALUES } from '../../common/consts/achievement-values.const.js';
import { checkForAchievements } from '../../common/utils/achievement-helper.js';
import {
  setTotalTimePlayed,
  unlockAchievement,
} from '../../store/game-state.js';
import { GameState } from '../../store/model/game-state.model.js';
import { showSnackbar } from '../../store/snackbar-state.js';

export default function AchievementListener() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  const refreshTotalTimePlayed = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    dispatch(setTotalTimePlayed(currentTime - gameState.stats.startTime));
  };

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
  }, [
    gameState.stats.diceRolls,
    gameState.stats.maxChips,
    gameState.stats.payouts,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshTotalTimePlayed();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <></>;
}
