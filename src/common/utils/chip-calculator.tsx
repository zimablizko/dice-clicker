import { GameState } from '../../store/model/game-state.model.js';
import { COMBO_VALUES } from '../consts/combo-values.const.js';
import { UPGRADE_VALUES } from '../consts/upgrade-values.const.js';
import { Combo } from '../enums/combo.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';
import { CalculationResult } from '../model/calculation.model.js';

export const calculateChips = (
  baseValue: number,
  combo: Combo,
  gameState: GameState,
): CalculationResult => {
  let result = baseValue;
  const comboProperties = COMBO_VALUES.get(combo)!;
  const comboMultiplier = comboProperties?.multiplier + 1;
  const upgradeMultiplier = getFlatMultiplier(gameState);
  const finalMultiplier = comboMultiplier * upgradeMultiplier;
  result = Math.round(result * finalMultiplier);
  return {
    baseValue,
    comboProperties,
    upgradeMultiplier: finalMultiplier,
    result,
  };
};

export const getFlatMultiplier = (gameState: GameState): number =>
  1 +
  UPGRADE_VALUES[Upgrade.SmallChipsMultiplier].value! *
    gameState.upgradeLevels[Upgrade.SmallChipsMultiplier] +
  UPGRADE_VALUES[Upgrade.BigChipsMultiplier].value! *
    gameState.upgradeLevels[Upgrade.BigChipsMultiplier] +
  UPGRADE_VALUES[Upgrade.MediumChipsMultiplier].value! *
    gameState.upgradeLevels[Upgrade.MediumChipsMultiplier];
