import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../store/game-state.js';
import { GameState } from '../store/model/game-state.model.js';

export default function OptionsPage() {
  const dispatch = useDispatch();
  const router = useNavigate();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  function handleResetClick() {
    dispatch(reset());
    router('/dice-clicker');
    window.location.reload();
  }

  return (
    <>
      <div className="row">
        <button className="btn reset-btn" onClick={handleResetClick}>
          Restart
        </button>
        <p>Reset all your game progress</p>
      </div>

      <div className="row">
        <h2>Stats</h2>
        <span>Coins: {gameState.resources.coins}</span>
        <span>Max chips: {gameState.stats.maxChips}</span>
        <span>Payouts: {gameState.stats.payouts}</span>
        <span>Best roll: {gameState.stats.bestRoll}</span>
        <span>Rolls: {gameState.stats.diceRolls}</span>
      </div>
    </>
  );
}
