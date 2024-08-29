import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from '../common/consts/initial-state.const.js';
import { Achievement } from '../common/enums/achievement.enum.js';
import { Upgrade } from '../common/enums/upgrade.enum.js';
import { saveManager } from '../common/utils/save-manager.js';
import { GameState, GameStats, StateAction } from './model/game-state.model.js';

const initialState = INITIAL_STATE;

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: saveManager.load('dc_gameState') ?? (initialState as GameState),
  reducers: {
    changeChips: (state, action: StateAction<number>) => {
      const newChips = state.chips + action.payload;
      if (newChips < 0) return;
      state.chips = newChips;
      saveManager.save('dc_gameState', state);
    },
    changeDiceAmount: (state, action: StateAction<number>) => {
      const newDiceAmount = state.diceAmount + action.payload;
      if (newDiceAmount < 1) return;
      state.diceAmount = newDiceAmount;
      saveManager.save('dc_gameState', state);
    },
    changeStats: (state, action: StateAction<GameStats>) => {
      state.stats = action.payload;

      saveManager.save('dc_gameState', state);
    },
    changeRollCooldown: (state, action: StateAction<number>) => {
      const newCooldown = state.rollCooldown + action.payload;
      if (newCooldown < 0) return;
      state.rollCooldown = newCooldown;
      saveManager.save('dc_gameState', state);
    },
    changeUpgradeCost: (state, action: StateAction<number>) => {
      state.upgradeCost = action.payload;
      saveManager.save('dc_gameState', state);
    },
    unlockAchievement: (state, action: StateAction<Achievement>) => {
      state.achievements[action.payload] = true;
      saveManager.save('dc_gameState', state);
    },
    increaseUpgradeLevel: (state, action: StateAction<Upgrade>) => {
      state.upgradeLevels[action.payload]++;
      saveManager.save('dc_gameState', state);
    },
    reset: (state) => {
      state = initialState;
      saveManager.save('dc_gameState', state);
    },
  },
});

export default gameStateSlice.reducer;
export const {
  changeChips,
  changeDiceAmount,
  changeStats,
  changeRollCooldown,
  changeUpgradeCost,
  unlockAchievement,
  increaseUpgradeLevel,
  reset,
} = gameStateSlice.actions;
