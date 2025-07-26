import { GameState } from '../../store/model/game-state.model.js';
import { COMBO_VALUES } from '../consts/combo-values.const.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { CardEffectType } from '../enums/card-effect.enum.js';
import { Combo } from '../enums/combo.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';
import { CalculationResult } from '../model/calculation.model.js';
import { Dice } from '../model/dice.model.js';
import { getCardEffectValue } from './card-helper.js';

const flatMultiplierUpgrades = [
  Upgrade.ChipsMultiplierFromTotalRolls,
  Upgrade.ChipsMultiplierFromTotalAchievements,
  Upgrade.ChipsMultiplierFromBestRoll,
  Upgrade.ChipsMultiplierFromTotalPlaytime,
];

const flatComboMultiplierUpgrades = [Upgrade.ComboMultiplier];

const pairComboUpgrades = [Upgrade.PairMultiplier];

export const calculateChips = (
  diceArray: Dice[],
  combo: Combo,
  gameState: GameState,
): CalculationResult => {
  const baseValue = diceArray.reduce((prev, curr) => prev + curr.diceValue, 0);
  const comboProperties = COMBO_VALUES.get(combo)!;
  const comboMultiplier = getComboMultiplier(gameState, combo);
  const upgradeMultiplier = getFlatMultiplier(gameState);
  const specialMultiplier = getSpecialMultiplier(gameState, diceArray);
  const finalMultiplier =
    Math.round(comboMultiplier * upgradeMultiplier * specialMultiplier * 100) /
    100;
  const result = Math.round(baseValue * finalMultiplier);
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
  let comboMultiplier =
    comboProperties.multiplier *
    flatComboMultiplierUpgrades.reduce(
      (acc, upgrade) =>
        acc *
        (gameState.upgradeLevels[upgrade] > 0
          ? UPGRADE_MAP.get(upgrade)!.valueFn(gameState)
          : 1),
      1,
    );
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

export const getSpecialMultiplier = (
  gameState: GameState,
  diceArray: Dice[],
): number => {
  let specialMultiplier = 1;
  if (gameState.upgradeLevels[Upgrade.ChipsMultiplierForEachSixValue] > 0) {
    const sixesCount = diceArray.filter((dice) => dice.diceValue === 6).length;
    if (sixesCount > 0) {
      specialMultiplier *=
        UPGRADE_MAP.get(Upgrade.ChipsMultiplierForEachSixValue)!.valueFn(
          gameState,
        ) * sixesCount;
    }
  }

  return specialMultiplier;
};
