'use client';
/**
 * use clientの記述がないと以下のエラーが発生する。
 * Error:   × You're importing a component that needs `useEffect`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.
 * Next.js の App Router (app ディレクトリ) の仕様によるエラー。
 * useEffectを使用しているため、コンポーネントはクライアントコンポーネントである必要がある。
 * デフォルトでは Next.js のコンポーネントはサーバーコンポーネントとして扱われます。
 * サーバーコンポーネントでは useEffect, useState, useRouter などの React クライアントフックは使えません。
 * ThemeToggle.tsx で useEffect を import しているため、「これはクライアントコンポーネントだよ」と明示しないとビルドエラーになります。
 */

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(state => state.theme.darkMode);
  
  useEffect(() => {
    // TODO: darkModeの値に応じてHTMLのルート要素にdarkクラスを付与/削除
    // typeof window !== 'undefined'でクライアントサイドかチェック
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch({ type: 'theme/toggleDarkMode' })}
      className="cursor-pointer p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      aria-label="ダークモード切り替え"
    >
      {/* TODO: darkModeの状態に応じてアイコンを表示 */}
      {/* ヒント: darkMode ? 太陽アイコン : 月アイコン */}
      {darkMode ? 'ライトモード🦁' : 'ダークモード🪼'}
    </button>
  )
}