import { GameState } from '../../store/model/game-state.model.js';
import { COMBO_VALUES } from '../consts/combo-values.const.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { Combo } from '../enums/combo.enum.js';
import { ShopUpgrade } from '../enums/shop-upgrade.enum.js';
import { Upgrade } from '../enums/upgrade.enum.js';
import { CalculationResult } from '../model/calculation.model.js';

export const calculateChips = (
  baseValue: number,
  combo: Combo,
  gameState: GameState,
): CalculationResult => {
  let result = baseValue;
  const comboProperties = COMBO_VALUES.get(combo)!;
  const comboMultiplier = getComboMultiplier(gameState, combo);
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
  UPGRADE_MAP.get(Upgrade.SmallChipsMultiplier)!.value! *
    gameState.upgradeLevels[Upgrade.SmallChipsMultiplier] +
  UPGRADE_MAP.get(Upgrade.BigChipsMultiplier)!.value! *
    gameState.upgradeLevels[Upgrade.BigChipsMultiplier] +
  UPGRADE_MAP.get(Upgrade.MediumChipsMultiplier)!.value! *
    gameState.upgradeLevels[Upgrade.MediumChipsMultiplier];

export const getComboMultiplier = (
  gameState: GameState,
  combo: Combo,
): number => {
  const comboProperties = COMBO_VALUES.get(combo)!;
  let comboMultiplier = comboProperties.multiplier + 1;
  switch (combo) {
    case Combo.Pair:
      comboMultiplier +=
        UPGRADE_MAP.get(ShopUpgrade.PairMultiplier)!.value! *
        gameState.shopUpgradeLevels[ShopUpgrade.PairMultiplier];
      break;
  }
  return comboMultiplier;
};
