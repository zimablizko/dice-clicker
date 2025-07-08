import { useSelector } from 'react-redux';
import { ACHIEVEMENT_VALUES } from '../common/consts/achievement-values.const.js';
import { GameState } from '../store/model/game-state.model.js';

export default function AchievementsPage() {
  const currentAchievements = useSelector(
    (state: { gamestate: GameState }) => state.gamestate.achievements,
  );
  const achievementsUnlocked = useSelector(
    (state: { gamestate: GameState }) =>
      state.gamestate.stats.achievementsUnlocked,
  );
  const totalAchievements = ACHIEVEMENT_VALUES.length;

  return (
    <>
      <div className="row">
        Achievements Unlocked: {achievementsUnlocked}/{totalAchievements} (
        {Math.round(100 * (achievementsUnlocked / totalAchievements))}%)
      </div>
      <div className="row stretched">
        <div className="achievements-container">
          {ACHIEVEMENT_VALUES.map((ach) => {
            return (
              <div
                key={ach.id}
                className={
                  currentAchievements[ach.id]
                    ? 'achievement unlocked'
                    : 'achievement locked'
                }
              >
                <h3 className="name">{ach.name}</h3>
                <p className="description">{ach.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
