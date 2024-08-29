import { useSelector } from 'react-redux';
import { GAME_SETTINGS } from '../../common/consts/game-settings.const.js';
import { Achievement } from '../../common/enums/achievement.enum.js';
import { GameState } from '../../store/model/game-state.model.js';

export default function ChipCounter() {
  const chips = useSelector(
    (state: { gamestate: GameState }) => state.gamestate.chips,
  );
  const chips100Achievement = useSelector(
    (state: { gamestate: GameState }) =>
      state.gamestate.achievements[Achievement.Chips100],
  );

  const winPercent = (chips / GAME_SETTINGS.winCondition) * 100;
  return (
    <section>
      <p className="chips">
        Chips: {chips}
        <br />
        <span className="wincon-label">
          {' '}
          ({GAME_SETTINGS.winCondition} chips for payout)
        </span>
        {chips100Achievement && (
          <span>
            <br />
            <progress
              className="wincon-progress-bar"
              value={chips}
              max={GAME_SETTINGS.winCondition}
            ></progress>
            <br />
            {winPercent.toFixed(2)}% to payout
          </span>
        )}
      </p>
    </section>
  );
}
