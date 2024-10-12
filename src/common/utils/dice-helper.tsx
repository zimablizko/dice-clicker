import { GameState } from '../../store/model/game-state.model.js';
import { GAME_SETTINGS } from '../consts/game-settings.const.js';
import { UPGRADE_VALUES } from '../consts/upgrade-values.const.js';
import { Upgrade } from '../enums/upgrade.enum.js';

export const getDiceAmount = (gameState: GameState): number =>
  GAME_SETTINGS.diceInitAmount +
  gameState.upgradeLevels[Upgrade.DiceAmount] *
    UPGRADE_VALUES[Upgrade.DiceAmount].value!;
