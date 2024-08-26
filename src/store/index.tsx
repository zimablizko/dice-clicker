import { configureStore } from '@reduxjs/toolkit';

import gamestateReducer from './game-state.js';

const store = configureStore({
  reducer: {
    gamestate: gamestateReducer,
  },
});

export default store;
