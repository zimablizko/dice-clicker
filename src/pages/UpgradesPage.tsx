import { useDispatch, useSelector } from 'react-redux';
import {
  changeDiceAmount,
  changePoints,
  changeUpgradeCost,
} from '../store/game-state';
import { GameState } from '../store/model/game-state.model';

export default function UpgradesPage() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );
  const checkUpgradeBtnDisabled = () =>
    gameState.points < gameState.upgradeCost;

  const getUpgradeCost = () => gameState.diceAmount * 10;

  function handleUpgradeClick() {
    if (gameState.points >= gameState.upgradeCost) {
      dispatch(changeDiceAmount(1));
      dispatch(changePoints(-gameState.upgradeCost));
      dispatch(dispatch(changeUpgradeCost(getUpgradeCost())));
    }
  }
  return (
    <>
      <div className="row">
        <label>🎲 amount: {gameState.diceAmount}</label>
        <button
          className="btn upgrade-btn"
          disabled={checkUpgradeBtnDisabled()}
          onClick={handleUpgradeClick}
        >
          +1 🎲 (Cost: {gameState.upgradeCost})
        </button>
      </div>
    </>
  );
}
