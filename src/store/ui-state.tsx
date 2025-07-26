import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabType =
  | 'home'
  | 'upgrades'
  | 'store'
  | 'achievements'
  | 'options';

export interface UIState {
  activeTab: TabType;
  visibleTabs: TabType[];
}

const initialState: UIState = {
  activeTab: 'home',
  visibleTabs: ['home'],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload;
      if (window.innerWidth <= 768) {
        state.visibleTabs = [action.payload];
      } else {
        if (!state.visibleTabs.includes(action.payload)) {
          if (state.visibleTabs.length >= 2) {
            state.visibleTabs.pop();
          }
          state.visibleTabs.push(action.payload);
        }
      }
    },
    closeTab: (state, action: PayloadAction<TabType>) => {
      state.visibleTabs = state.visibleTabs.filter(
        (tab) => tab !== action.payload,
      );
      if (state.activeTab === action.payload && state.visibleTabs.length > 0) {
        state.activeTab = state.visibleTabs[0];
      }
    },
    setVisibleTabs: (state, action: PayloadAction<TabType[]>) => {
      state.visibleTabs = action.payload;
    },
  },
});

export const { setActiveTab, closeTab, setVisibleTabs } = uiSlice.actions;
export default uiSlice.reducer;
