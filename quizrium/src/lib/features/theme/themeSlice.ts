import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false, // 初期状態はライトモード
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      // TODO: 状態を反転させ、ローカルストレージに保存
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', JSON.stringify(state.darkMode));
    },

    setDarkMode: (state, action: PayloadAction<boolean>) => {
    // TODO: 指定された値を設定し、ローカルストレージに保存
      state.darkMode = action.payload;
      localStorage.setItem('theme', JSON.stringify(action.payload));
    }
  }
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;