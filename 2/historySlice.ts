import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HistoryState = {
  prevPages: string[];
  nextPages: string[];
  currentIndex: number;
  restoreNextFlag: boolean;
  nextPage: string | null;
};

const initialState: HistoryState = {
  prevPages: [],
  nextPages: [],
  currentIndex: -1,
  restoreNextFlag: false,
  nextPage: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<{ currLocation: string }>) => {
      const { currLocation } = action.payload;

      if (state.prevPages[state.currentIndex] === currLocation) return;

      if (state.prevPages[state.currentIndex] !== currLocation) {
        state.prevPages.push(currLocation);
        state.currentIndex = state.prevPages.length - 1;
        state.nextPage = currLocation;
        if (!state.restoreNextFlag) {
          state.nextPages = [];
        }
        state.restoreNextFlag = false;
      }
    },
    restore: (state, action: PayloadAction<{direction: 'next' | 'prev'}>) => {
      switch (action.payload.direction) {
        case 'next': 
          if (state.nextPages.length) {
            state.restoreNextFlag = true;
            state.currentIndex = state.nextPages.length - 1;
            state.nextPage = state.nextPages[state.currentIndex];
            state.nextPages = state.nextPages.slice(0, state.currentIndex);
          }
          break;
        case 'prev':
          if (state.prevPages.length) {
            state.currentIndex = state.prevPages.length - 2;
            state.nextPage = state.prevPages[state.currentIndex];
            state.nextPages.push(state.prevPages[state.currentIndex + 1]);
            state.prevPages = state.prevPages.slice(0, state.currentIndex + 1);
          }
          break;
      }
    }
  },
});

export default historySlice.reducer;
export const { navigate, restore } = historySlice.actions;
