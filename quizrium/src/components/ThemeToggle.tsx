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

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

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
      className="flex items-center cursor-pointer py-0.5 px-4 rounded border-1 border-white bg-lightPrimary hover:bg-lightAccent dark:bg-darkPrimary duration-200 dark:hover:bg-darkTertiary text-white"
      aria-label="ダークモード切り替え"
    >
      {/* TODO: darkModeの状態に応じてアイコンを表示 */}
      {/* ヒント: darkMode ? 太陽アイコン : 月アイコン */}
      {darkMode ? 'ライトモード 🦁' : 'ダークモード 🪼'}
    </button>
  )
}