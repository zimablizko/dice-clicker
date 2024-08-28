import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkForAchievements } from '../../common/utils/achievement-helper.js';
import { unlockAchievement } from '../../store/game-state.js';
import { GameState } from '../../store/model/game-state.model.js';

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
      }
    }
  }, [gameState.stats.diceRolls]);

  return <></>;
}
