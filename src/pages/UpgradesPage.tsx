import { useDispatch, useSelector } from 'react-redux';
import { UPGRADE_VALUES } from '../common/consts/upgrade-values.const.js';
import { UpgradeProperties } from '../common/model/upgrade.model.js';
import { changeChips, increaseUpgradeLevel } from '../store/game-state.js';
import { GameState } from '../store/model/game-state.model.js';

export default function UpgradesPage() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );
  const checkUpgradeBtnDisabled = (upgrade: UpgradeProperties) =>
    gameState.chips < getUpgradeCost(upgrade) ||
    gameState.upgradeLevels[upgrade.id] >= upgrade.levels;
  const checkUpgradeAcquired = (upgrade: UpgradeProperties) => {
    return gameState.upgradeLevels[upgrade.id] >= upgrade.levels;
  };

  const getUpgradeCost = (upgrade: UpgradeProperties) =>
    upgrade.baseCost *
    upgrade.costMultiplier ** (gameState.upgradeLevels[upgrade.id] + 1);

  const handleUpgradeClick = (upgrade: UpgradeProperties) => {
    const upgradeCost = getUpgradeCost(upgrade);
    if (gameState.chips >= upgradeCost) {
      dispatch(changeChips(-upgradeCost));
      dispatch(increaseUpgradeLevel(upgrade.id));
    }
  };

  return (
    <>
      <div className="row">
        <div className="upgrades-container">
          {UPGRADE_VALUES.filter((u) => u.levels > 1).map((upgrade) => (
            <div className="upgrade" key={upgrade.id}>
              <p className="name">{upgrade.name}</p>
              <p className="name">
                (LVL {gameState.upgradeLevels[upgrade.id]})
              </p>
              <p className="name">Cost: {getUpgradeCost(upgrade)}</p>
              <button
                className="btn upgrade-btn"
                disabled={checkUpgradeBtnDisabled(upgrade)}
                onClick={() => handleUpgradeClick(upgrade)}
              >
                Upgrade
              </button>
            </div>
          ))}
          <div className="upgrade">
            {UPGRADE_VALUES.filter((u) => u.levels === 1).map((upgrade) => (
              <button
                key={upgrade.id}
                className={
                  checkUpgradeAcquired(upgrade)
                    ? 'btn upgrade-btn acquired'
                    : 'btn upgrade-btn'
                }
                disabled={checkUpgradeBtnDisabled(upgrade)}
                onClick={() => handleUpgradeClick(upgrade)}
              >
                {upgrade.name}
                <br />
                {checkUpgradeAcquired(upgrade) && '(Acquired)'}
                {!checkUpgradeAcquired(upgrade) &&
                  `Cost: ${getUpgradeCost(upgrade)}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
