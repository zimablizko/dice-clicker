import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkForAchievements } from '../common/utils/achievement-helper';
import { unlockAchievement } from '../store/game-state';
import { GameState } from '../store/model/game-state.model';

export default function AchievementListener() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  useEffect(() => {
    const newAchievements = checkForAchievements(gameState);
    console.log('ACHS', newAchievements);
    if (newAchievements.length) {
      for (const ach of newAchievements) {
        dispatch(unlockAchievement(ach));
      }
    }
  }, [gameState.stats.diceRolls]);
  console.log('AchievementListener');

  return <></>;
}
