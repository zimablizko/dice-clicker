import { Dispatch } from 'redux';
import { changeChips } from '../../store/game-state.js';
import { GameState } from '../../store/model/game-state.model.js';
import { showSnackbar } from '../../store/snackbar-state.js';
import { CardEffectType } from '../enums/card-effect.enum.js';
import { Card } from '../model/card.model.js';
import { formatBigNumber } from './formatter.js';

export const applyInstantEffect = (
  gameState: GameState,
  dispatch: Dispatch,
  card: Card,
) => {
  const { effect } = card;
  if (effect.effectType === CardEffectType.InstantChips) {
    const currentChips = gameState.resources.chips;
    const bonusChips = Math.round(currentChips * effect.value!);
    dispatch(changeChips(bonusChips));
    dispatch(showSnackbar(`Gained ${formatBigNumber(bonusChips)} chips!`));
  }
};

export const getCardEffectValue = (
  gameState: GameState,
  cardEffect: CardEffectType,
): number => {
  return gameState.cards
    .filter((card) => card.effect.effectType === cardEffect)
    .reduce((acc, card) => acc + card.effect.value, 1);
};
