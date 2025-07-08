import { GameState } from '../../store/model/game-state.model.js';
import { UPGRADE_MAP } from '../consts/upgrade-values.const.js';
import { Upgrade } from '../enums/upgrade.enum.js';

export const getDiceAmount = (gameState: GameState): number =>
  UPGRADE_MAP.get(Upgrade.DiceAmount)!.valueFn(gameState);
