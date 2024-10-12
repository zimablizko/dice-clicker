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
      const newChips = state.resources.chips + action.payload;
      if (newChips < 0) return;
      state.resources.chips = newChips;
      saveManager.save('dc_gameState', state);
    },
    changeStats: (state, action: StateAction<GameStats>) => {
      state.stats = action.payload;

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
    payout: (state) => {
      //reset state except coins and achievements
      const coins = state.coins;
      const achievements = { ...state.achievements };
      const stats = { ...state.stats };
      console.log('payout', coins, achievements);
      state = initialState;
      state = {
        ...initialState,
        resources: {
          ...initialState.resources,
          coins: state.resources.coins + 1,
        },
        achievements: achievements,
        stats: { ...initialState.stats, payouts: stats.payouts + 1 },
      };
      console.log('payout', state);
      saveManager.save('dc_gameState', state);
    },
  },
});

export default gameStateSlice.reducer;
export const {
  changeChips,
  changeStats,
  unlockAchievement,
  increaseUpgradeLevel,
  reset,
  payout,
} = gameStateSlice.actions;
