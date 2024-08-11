import { useSelector } from 'react-redux';
import { GAME_SETTINGS } from '../common/consts/game-settings.const';

export default function PointCounter() {
  const points = useSelector(
    (state: { gamestate: GameState }) => state.gamestate.points,
  );
  return (
    <div className="row">
      <p className="points">
        Points: {points}
        <br></br>
        <span className="wincon-label">
          {' '}
          ({GAME_SETTINGS.winCondition} points for victory)
        </span>
      </p>
    </div>
  );
}
