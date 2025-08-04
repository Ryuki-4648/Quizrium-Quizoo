"use client";
// クライアントコンポーネントにするために必要。usePathnameのようなクライアントサイドフックを使用するコンポーネントには必ずuse clientが必要。

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {

  // 現在のパスを取得
  const pathname = usePathname(); // usePathnameフックを使用

  return (
    <nav className="space-x-8">
      <Link href="/" className={`${pathname === "/" ? "text-gray-500" : "text-white"}`}>Home</Link>
      <Link href="/" className="w-124 bg-white text-black rounded-full px-4 py-2 font-bold">クイズをつくる</Link>
    </nav>
  )
}