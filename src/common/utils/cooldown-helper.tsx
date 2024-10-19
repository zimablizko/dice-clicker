import { GameState } from '../../store/model/game-state.model.js';
import { GAME_SETTINGS } from '../consts/game-settings.const.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { Upgrade } from '../enums/upgrade.enum.js';

export const getCooldown = (gameState: GameState): number =>
  Math.round(
    GAME_SETTINGS.baseRollCooldown /
      UPGRADE_MAP.get(Upgrade.ReduceCooldown)!.value! **
        gameState.upgradeLevels[Upgrade.ReduceCooldown],
  );

export const getAutoRollCooldown = (gameState: GameState): number =>
  Math.round(
    GAME_SETTINGS.baseAutoRollCooldown /
      UPGRADE_MAP.get(Upgrade.ReduceAutoRollCooldown)!.value! **
        gameState.upgradeLevels[Upgrade.ReduceAutoRollCooldown],
  );
