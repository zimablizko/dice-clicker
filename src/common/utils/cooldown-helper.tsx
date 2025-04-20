import { GameState } from '../../store/model/game-state.model.js';
import { GAME_SETTINGS } from '../consts/game-settings.const.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { CardEffectType } from '../enums/card-effect.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';

export const getCooldown = (gameState: GameState): number => {
  const cooldownReduction = 
    UPGRADE_MAP.get(Upgrade.ReduceCooldown)!.value! **
    gameState.upgradeLevels[Upgrade.ReduceCooldown]
    +
    gameState.cards.filter(
      (card) => card.effect.effectType === CardEffectType.ReduceCooldown,
    ).reduce(
      (acc, card) => acc + card.effect!.value!,
      0,
    );
  const baseCooldown = GAME_SETTINGS.baseRollCooldown;
  return Math.round(baseCooldown / cooldownReduction);
  
}


export const getAutoRollCooldown = (gameState: GameState): number =>
  Math.round(
    GAME_SETTINGS.baseAutoRollCooldown /
      UPGRADE_MAP.get(Upgrade.ReduceAutoRollCooldown)!.value! **
        gameState.upgradeLevels[Upgrade.ReduceAutoRollCooldown],
  );
