import { GameState } from '../../store/model/game-state.model.js';
import { GAME_SETTINGS } from '../consts/game-settings.const.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { ShopUpgrade } from '../enums/shop-upgrade.enum.js';

export const getCoinReward = (gameState: GameState): number =>
  Math.round(
    GAME_SETTINGS.baseCoinReward *
      UPGRADE_MAP.get(ShopUpgrade.CoinGainMultiplier)!.value! **
        gameState.shopUpgradeLevels[ShopUpgrade.CoinGainMultiplier],
  );
