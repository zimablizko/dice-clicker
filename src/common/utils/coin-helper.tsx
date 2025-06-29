import { GameState } from '../../store/model/game-state.model.js';
import { GAME_SETTINGS } from '../consts/game-settings.const.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { ShopUpgrade } from '../enums/shop-upgrade.enum.js';

const flatCoinRewardUpgrades = [ShopUpgrade.CoinGainMultiplier];

export const getCoinReward = (gameState: GameState): number =>
  Math.round(
    GAME_SETTINGS.baseCoinReward *
      flatCoinRewardUpgrades.reduce(
        (acc, upgrade) =>
          acc *
          (gameState.shopUpgradeLevels[upgrade] > 0
            ? UPGRADE_MAP.get(upgrade)!.valueFn(gameState)
            : 1),
        1,
      ),
  );
