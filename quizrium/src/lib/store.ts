import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
  // 後で各機能のreducerを追加する場所
  },
  // 開発環境ではDevToolsを有効化
  devTools: process.env.NODE_ENV !== 'production',
  });
  // TypeScriptでReduxを使うための型定義
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;