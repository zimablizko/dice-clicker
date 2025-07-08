import { GameState } from '../../store/model/game-state.model.js';
import { GAME_SETTINGS } from '../consts/game-settings.const.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { CardEffectType } from '../enums/card-effect.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';
import { getCardEffectValue } from './card-helper.js';

const flatCooldownUpgrades = [Upgrade.ReduceCooldown];
const flatAutoRollCooldownUpgrades = [Upgrade.ReduceAutoRollCooldown];

export const getCooldown = (gameState: GameState): number => {
  const cooldownReduction =
    flatCooldownUpgrades.reduce(
      (acc, upgrade) =>
        acc *
        (gameState.upgradeLevels[upgrade] > 0
          ? UPGRADE_MAP.get(upgrade)!.valueFn(gameState)
          : 1),
      1,
    ) * getCardEffectValue(gameState, CardEffectType.ReduceCooldown);
  const baseCooldown = GAME_SETTINGS.baseRollCooldown;
  return Math.round(baseCooldown / cooldownReduction);
};

export const getAutoRollCooldown = (gameState: GameState): number => {
  const cooldownReduction =
    flatAutoRollCooldownUpgrades.reduce(
      (acc, upgrade) =>
        acc *
        (gameState.upgradeLevels[upgrade] > 0
          ? UPGRADE_MAP.get(upgrade)!.valueFn(gameState)
          : 1),
      1,
    ) * getCardEffectValue(gameState, CardEffectType.ReduceAutoRollCooldown);

  const baseCooldown = GAME_SETTINGS.baseAutoRollCooldown;
  return Math.round(baseCooldown / cooldownReduction);
};
