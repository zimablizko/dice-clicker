import { Dispatch } from "redux";
import { changeChips } from "../../store/game-state.js";
import { GameState } from "../../store/model/game-state.model.js";
import { CardEffectType } from "../enums/card-effect.enum.js";
import { Card } from "../model/card.model.js";

export const applyInstantEffect = (gameState: GameState, dispatch: Dispatch,  card: Card) => {
  const { effect } = card;
  if (effect.effectType === CardEffectType.InstantChips) {
    const currentChips = gameState.resources.chips;
    const bonusChips = Math.round(currentChips * effect.value!);
    dispatch(changeChips(bonusChips));
  }
}