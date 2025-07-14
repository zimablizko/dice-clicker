import { configureStore } from '@reduxjs/toolkit';

import gamestateReducer from './game-state.js';
import snackbarReducer from './snackbar-state.js';
import uiReducer from './ui-state.js';

const store = configureStore({
  reducer: {
    gamestate: gamestateReducer,
    snackbar: snackbarReducer,
    ui: uiReducer,
  },
});

export default store;
