import { useDispatch, useSelector } from 'react-redux';
import { UPGRADE_VALUES } from '../common/consts/upgrade-values.const.js';
import { ResourceType } from '../common/enums/resource-type.enum.js';
import { Upgrade } from '../common/enums/upgrade.enum.js';
import { UpgradeProperties } from '../common/model/upgrade.model.js';
import { formatBigNumber, formatDecimal } from '../common/utils/formatter.js';
import { changeChips, increaseUpgradeLevel } from '../store/game-state.js';
import { GameState } from '../store/model/game-state.model.js';

export default function UpgradesPage() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );
  const checkUpgradeBtnDisabled = (upgrade: UpgradeProperties) =>
    gameState.resources.chips < getUpgradeCost(upgrade) ||
    gameState.upgradeLevels[upgrade.id as Upgrade] >= upgrade.levels;
  const checkUpgradeAcquired = (upgrade: UpgradeProperties) => {
    return gameState.upgradeLevels[upgrade.id as Upgrade] >= upgrade.levels;
  };

  const getUpgradeCost = (upgrade: UpgradeProperties) =>
    upgrade.baseCost *
    upgrade.costMultiplier ** gameState.upgradeLevels[upgrade.id as Upgrade];

  const handleUpgradeClick = (upgrade: UpgradeProperties) => {
    const upgradeCost = getUpgradeCost(upgrade);
    if (gameState.resources.chips >= upgradeCost) {
      dispatch(changeChips(-upgradeCost));
      dispatch(increaseUpgradeLevel(upgrade.id as Upgrade));
    }
  };

  return (
    <>
      <div className="row">
        <div className="upgrades-container">
          {UPGRADE_VALUES.filter(
            (u) =>
              u.resourceType === ResourceType.Chips &&
              u.conditionsFn?.(gameState) !== false,
          ).map((upgrade) => (
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
              <p className="name">
                {upgrade.descriptionFn?.(gameState)
                  ? upgrade.descriptionFn?.(gameState)
                  : upgrade.name}
              </p>
              {upgrade.valueFn(gameState) !== 0 && !upgrade.descriptionFn && (
                <p className="name">
                  Current: x{formatDecimal(upgrade.valueFn(gameState))}
                </p>
              )}

              {/* {upgrade.levels > 1 && (
                <p className="name">
                  (LVL {gameState.upgradeLevels[upgrade.id as Upgrade]})
                </p>
              )} */}

              <p className="name">
                {checkUpgradeAcquired(upgrade) && '(Acquired)'}
                {!checkUpgradeAcquired(upgrade) &&
                  `Cost: ${formatBigNumber(getUpgradeCost(upgrade))}`}
              </p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
