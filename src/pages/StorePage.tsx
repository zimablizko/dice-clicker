import { useDispatch, useSelector } from 'react-redux';
import { UPGRADE_VALUES } from '../common/consts/upgrade-values.const.js';
import { ResourceType } from '../common/enums/resource-type.enum.js';
import { ShopUpgrade } from '../common/enums/shop-upgrade.enum.js';
import { UpgradeProperties } from '../common/model/upgrade.model.js';
import { formatNumber } from '../common/utils/formatter.js';
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
              u.levels > 1 &&
              u.resourceType === ResourceType.Coins &&
              u.conditions?.(gameState) !== false,
          ).map((upgrade) => (
            <div className="upgrade" key={upgrade.id}>
              <p className="name">{upgrade.name}</p>
              <p className="name">
                (LVL {gameState.shopUpgradeLevels[upgrade.id as ShopUpgrade]})
              </p>
              <p className="name">
                Cost: {formatNumber(getUpgradeCost(upgrade))}
              </p>
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
            {UPGRADE_VALUES.filter(
              (u) =>
                u.levels === 1 &&
                u.resourceType === ResourceType.Coins &&
                u.conditions?.(gameState) !== false,
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
                {upgrade.name}
                <br />
                {checkUpgradeAcquired(upgrade) && '(Acquired)'}
                {!checkUpgradeAcquired(upgrade) &&
                  `Cost: ${formatNumber(getUpgradeCost(upgrade))}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
