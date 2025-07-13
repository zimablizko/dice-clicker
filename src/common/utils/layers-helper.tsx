import { GameState } from '../../store/model/game-state.model.js';
import { GAME_SETTINGS } from '../consts/game-settings.const.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { CardEffectType } from '../enums/card-effect.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';
import { getCardEffectValue } from './card-helper.js';

const payoutConditionReductionUpgrades = [Upgrade.PayoutReduction];

export const getPayoutCondition = (gameState: GameState): number => {
  const basePayoutCondition = GAME_SETTINGS.payoutCondition;
  const payoutReduction =
    payoutConditionReductionUpgrades.reduce(
      (acc, upgrade) =>
        acc *
        (gameState.upgradeLevels[upgrade] > 0
          ? UPGRADE_MAP.get(upgrade)!.valueFn(gameState)
          : 1),
      1,
    ) * getCardEffectValue(gameState, CardEffectType.ReducePayoutCondition);

  return Math.round(basePayoutCondition / payoutReduction);
};
