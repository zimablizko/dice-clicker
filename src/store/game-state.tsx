import { createSlice } from '@reduxjs/toolkit';
import { GAME_SETTINGS } from '../common/consts/game-settings.const.js';
import { INITIAL_STATE } from '../common/consts/initial-state.const.js';
import { UPGRADE_MAP } from '../common/consts/upgrade-values.const.js';
import { Achievement } from '../common/enums/achievement.enum.js';
import { ResourceType } from '../common/enums/resource-type.enum.js';
import { Upgrade } from '../common/enums/upgrade.enum.js';
import { Card } from '../common/model/card.model.js';
import { saveManager } from '../common/utils/save-manager.js';
import { GameState, GameStats, StateAction } from './model/game-state.model.js';

const initialState = INITIAL_STATE;

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: saveManager.load('dc_gameState') ?? (initialState as GameState),
  reducers: {
    changeChips: (state: GameState, action: StateAction<number>) => {
      const newChips = state.resources.chips + action.payload;
      if (newChips < 0) return;
      state.resources.chips = newChips;
      saveManager.save('dc_gameState', state);
    },
    changeCoins: (state: GameState, action: StateAction<number>) => {
      const newCoins = state.resources.coins + action.payload;
      if (newCoins < 0) return;
      state.resources.coins = newCoins;
      saveManager.save('dc_gameState', state);
    },
    changeStats: (state: GameState, action: StateAction<GameStats>) => {
      state.stats = action.payload;
      saveManager.save('dc_gameState', state);
    },
    unlockAchievement: (state: GameState, action: StateAction<Achievement>) => {
      if (state.achievements[action.payload]) {
        console.warn(`Achievement ${action.payload} already unlocked.`);
        return;
      }
      state.achievements[action.payload] = true;
      state.stats.achievementsUnlocked++;
      saveManager.save('dc_gameState', state);
    },
    increaseUpgradeLevel: (state: GameState, action: StateAction<Upgrade>) => {
      state.upgradeLevels[action.payload]++;
      saveManager.save('dc_gameState', state);
    },
    reset: (state: GameState) => {
      state = initialState;
      saveManager.save('dc_gameState', state);
    },
    payout: (state: GameState, action: StateAction<number>) => {
      //reset state except coins, achievements, and shop upgrades
      const achievements = { ...state.achievements };
      const savedUpgradeLevels = { ...state.upgradeLevels };
      for (const upgrade in state.upgradeLevels) {
        if (
          UPGRADE_MAP.get(upgrade as Upgrade)?.resourceType !==
          ResourceType.Chips
        ) {
          savedUpgradeLevels[upgrade as Upgrade] = 0;
        }
      }
      const stats = { ...state.stats };
      const coinReward = action.payload;
      const coins = state.resources.coins + coinReward;

      state = initialState;
      state = {
        ...initialState,
        upgradeLevels: savedUpgradeLevels,
        achievements,
        resources: {
          ...initialState.resources,
          coins: coins,
        },
        stats: {
          ...initialState.stats,
          payouts: stats.payouts + 1,
          totalTimePlayed: stats.totalTimePlayed,
          startTime: stats.startTime,
          achievementsUnlocked: stats.achievementsUnlocked,
        },
        cards: [], // Reset cards on payout
        cardDrawPrice: 10, // Reset card draw price on payout
      };

      saveManager.save('dc_gameState', state);
    },
    addCard: (state: GameState, action: StateAction<Card>) => {
      state.cards.push(action.payload);
      saveManager.save('dc_gameState', state);
    },
    increaseCardDrawPrice: (state: GameState) => {
      state.cardDrawPrice = Math.round(
        GAME_SETTINGS.baseCardCost *
          GAME_SETTINGS.baseCardCostIncrease ** state.cards.length,
      ); // 15% increase per draw
      saveManager.save('dc_gameState', state);
    },
    setTotalTimePlayed: (state: GameState, action: StateAction<number>) => {
      state.stats.totalTimePlayed = action.payload;
      saveManager.save('dc_gameState', state);
    },
    setFirstLayerTimePlayed: (
      state: GameState,
      action: StateAction<number>,
    ) => {
      state.stats.firstLayerTimePlayed = action.payload;
      saveManager.save('dc_gameState', state);
    },
  },
});

export default gameStateSlice.reducer;
export const {
  changeChips,
  changeCoins,
  changeStats,
  unlockAchievement,
  increaseUpgradeLevel,
  reset,
  payout,
  addCard,
  increaseCardDrawPrice,
  setTotalTimePlayed,
  setFirstLayerTimePlayed,
} = gameStateSlice.actions;
