import { GameState } from '../../store/model/game-state.model.js';
import { COMBO_VALUES } from '../consts/combo-values.const.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { CardEffectType } from '../enums/card-effect.enum.js';
import { Combo } from '../enums/combo.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';
import { CalculationResult } from '../model/calculation.model.js';
import { getCardEffectValue } from './card-helper.js';

const flatMultiplierUpgrades = [
  Upgrade.ChipsMultiplierFromTotalRolls,
  Upgrade.ChipsMultiplierFromTotalAchievements,
  Upgrade.ChipsMultiplierFromBestRoll,
  Upgrade.ChipsMultiplierFromTotalPlaytime,
];

const pairComboUpgrades = [Upgrade.PairMultiplier];

export const calculateChips = (
  baseValue: number,
  combo: Combo,
  gameState: GameState,
): CalculationResult => {
  let result = baseValue;
  const comboProperties = COMBO_VALUES.get(combo)!;
  const comboMultiplier = getComboMultiplier(gameState, combo);
  const upgradeMultiplier = getFlatMultiplier(gameState);
  const finalMultiplier =
    Math.round(comboMultiplier * upgradeMultiplier * 100) / 100;
  result = Math.round(result * finalMultiplier);
  return {
    baseValue,
    comboProperties,
    upgradeMultiplier: finalMultiplier,
    result,
  };
};

export const getFlatMultiplier = (gameState: GameState): number =>
  1 *
  flatMultiplierUpgrades.reduce(
    (acc, upgrade) =>
      acc *
      (gameState.upgradeLevels[upgrade] > 0
        ? UPGRADE_MAP.get(upgrade)!.valueFn(gameState)
        : 1),
    1,
  ) *
  getCardEffectValue(gameState, CardEffectType.IncreaseRollMultiplier);

export const getComboMultiplier = (
  gameState: GameState,
  combo: Combo,
): number => {
  const comboProperties = COMBO_VALUES.get(combo)!;
  let comboMultiplier = comboProperties.multiplier;
  switch (combo) {
    case Combo.Pair:
      comboMultiplier *= pairComboUpgrades.reduce(
        (acc, upgrade) =>
          acc *
          (gameState.upgradeLevels[upgrade] > 0
            ? UPGRADE_MAP.get(upgrade)!.valueFn(gameState)
            : 1),
        1,
      );
      break;
    case Combo.TwoPairs:
      comboMultiplier +=
        UPGRADE_MAP.get(Upgrade.TwoPairsMultiplier)!.valueFn() *
        gameState.upgradeLevels[Upgrade.TwoPairsMultiplier];
      break;
    case Combo.ThreeOfAKind:
      comboMultiplier +=
        UPGRADE_MAP.get(Upgrade.ThreeOfAKindMultiplier)!.valueFn() *
        gameState.upgradeLevels[Upgrade.ThreeOfAKindMultiplier];
      break;
  }
  return comboMultiplier;
};
