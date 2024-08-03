import { createSlice } from '@reduxjs/toolkit';
import { saveManager } from '../utils/save-manager';
import { GameState, GameStats, StateAction } from './model/game-state.model';

let initialState: GameState = {
  points: 0,
  diceAmount: 1,
  upgradeCost: 10,
  rollCooldown: 1500,
  stats: { diceRolls: 0, bestRoll: 0 },
};

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: saveManager.load('dc_gameState') ?? (initialState as GameState),
  reducers: {
    changePoints: (state, action: StateAction<number>) => {
      const newPoints = state.points + action.payload;
      if (newPoints < 0) return;
      state.points = newPoints;
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
    reset: (state) => {
      state = initialState;
      saveManager.save('dc_gameState', state);
    },
  },
});

export default gameStateSlice.reducer;
export const { changePoints, changeDiceAmount, changeStats, changeRollCooldown, changeUpgradeCost, reset } =
  gameStateSlice.actions;
