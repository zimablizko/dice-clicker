import { useDispatch, useSelector } from 'react-redux';
import { UPGRADE_VALUES } from '../common/consts/upgrade-values.const.js';
import { ResourceType } from '../common/enums/resource-type.enum.js';
import { ShopUpgrade } from '../common/enums/shop-upgrade.enum.js';
import { UpgradeProperties } from '../common/model/upgrade.model.js';
import { formatBigNumber, formatDecimal } from '../common/utils/formatter.js';
import { changeCoins, increaseShopUpgradeLevel } from '../store/game-state.js';
import { GameState } from '../store/model/game-state.model.js';

export default function StorePage() {
  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );

  const checkUpgradeBtnDisabled = (upgrade: UpgradeProperties) =>
    gameState.resources.coins < getUpgradeCost(upgrade) ||
    gameState.shopUpgradeLevels[upgrade.id as ShopUpgrade] >= upgrade.levels;

  const checkUpgradeAcquired = (upgrade: UpgradeProperties) => {
    return (
      gameState.shopUpgradeLevels[upgrade.id as ShopUpgrade] >= upgrade.levels
    );
  };

  const getUpgradeCost = (upgrade: UpgradeProperties) =>
    upgrade.baseCost *
    upgrade.costMultiplier **
      gameState.shopUpgradeLevels[upgrade.id as ShopUpgrade];

  const handleUpgradeClick = (upgrade: UpgradeProperties) => {
    const upgradeCost = getUpgradeCost(upgrade);
    if (gameState.resources.coins >= upgradeCost) {
      dispatch(changeCoins(-upgradeCost));
      dispatch(increaseShopUpgradeLevel(upgrade.id as ShopUpgrade));
    }
  };

  return (
    <>
      <div className="row">
        <p>Coins: {gameState.resources.coins}</p>
      </div>
      <div className="row">
        <div className="upgrades-container">
          {UPGRADE_VALUES.filter(
            (u) =>
              u.resourceType === ResourceType.Coins &&
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
              <p className="name">{upgrade.name}</p>
              {upgrade.valueFn(gameState) !== 0 && (
                <p className="name">
                  Current: {formatDecimal(upgrade.valueFn(gameState))}
                </p>
              )}

              {/* {upgrade.levels > 1 && (
                            <p className="name">
                              (LVL {gameState.shopUpgradeLevels[upgrade.id as ShopUpgrade]})
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
