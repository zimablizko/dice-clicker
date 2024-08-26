import { useDispatch, useSelector } from 'react-redux';
import { UPGRADE_VALUES } from '../common/consts/upgrade-values.const.js';
import { UpgradeProperties } from '../common/model/upgrade.model.js';
import { changePoints, increaseUpgradeLevel } from '../store/game-state.js';
import { GameState } from '../store/model/game-state.model.js';

export default function UpgradesPage() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );
  const checkUpgradeBtnDisabled = (upgrade: UpgradeProperties) =>
    gameState.points < getUpgradeCost(upgrade);

  const getUpgradeCost = (upgrade: UpgradeProperties) =>
    upgrade.baseCost *
    upgrade.costMultiplier ** (gameState.upgradeLevels[upgrade.id] + 1);

  const handleUpgradeClick = (upgrade: UpgradeProperties) => {
    const upgradeCost = getUpgradeCost(upgrade);
    if (gameState.points >= upgradeCost) {
      // dispatch(changeDiceAmount(1));

      dispatch(changePoints(-upgradeCost));
      dispatch(increaseUpgradeLevel(upgrade.id));
      // dispatch(changeUpgradeCost(getUpgradeCost()));
    }
  };

  return (
    <>
      <div className="row">
        <div className="upgrades-container">
          {UPGRADE_VALUES.map((upgrade) => (
            <div className="upgrade" key={upgrade.id}>
              <p className="name">
                {upgrade.name}: {gameState.upgradeLevels[upgrade.id]}
              </p>

              <button
                className="btn upgrade-btn"
                disabled={checkUpgradeBtnDisabled(upgrade)}
                onClick={() => handleUpgradeClick(upgrade)}
              >
                Cost: {getUpgradeCost(upgrade)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
