import { useSelector } from 'react-redux';
import { GAME_SETTINGS } from '../common/consts/game-settings.const';
import { GameState } from '../store/model/game-state.model';

export default function Header() {
  const points = useSelector(
    (state: { gamestate: GameState }) => state.gamestate.points,
  );
  return (
    <>
      <header>
        <h1>Dice Clicker</h1>
      </header>
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
    </>
  );
}
