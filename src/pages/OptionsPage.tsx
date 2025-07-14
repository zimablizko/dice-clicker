import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../store/game-state.js';
import { GameState } from '../store/model/game-state.model.js';

export default function OptionsPage() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  function handleResetClick() {
    dispatch(reset());
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
        <span>
          Time played this payout: {gameState.stats.firstLayerTimePlayed}{' '}
          seconds
        </span>
        <span>
          Total time played: {gameState.stats.totalTimePlayed} seconds
        </span>
        <span>
          Start time:{' '}
          {new Date(gameState.stats.startTime * 1000).toLocaleString('ru-RU')}
        </span>
      </div>
    </>
  );
}
