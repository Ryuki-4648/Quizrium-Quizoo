import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
  // 後で各機能のreducerを追加する場所
  // ここが空の場合「Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.」のエラーが発生する
  // クライアントとサーバーで状態が一致せず、Hydration Error が起きることがある。以下のエラー文参照。
  // Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:
},
  // 開発環境ではDevToolsを有効化
  devTools: process.env.NODE_ENV !== 'production',
  });
  // TypeScriptでReduxを使うための型定義
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;