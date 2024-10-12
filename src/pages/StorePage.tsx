import { useSelector } from 'react-redux';
import { GameState } from '../store/model/game-state.model.js';

export default function StorePage() {
  // const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  return (
    <>
      <div className="row">
        <p>Coins: {gameState.resources.coins}</p>
      </div>
    </>
  );
}
