"use client";
// クライアントコンポーネントにするために必要。usePathnameのようなクライアントサイドフックを使用するコンポーネントには必ずuse clientが必要。

import { useState } from "react";
import Link from "next/link";
import HowToEnjoyModal from "../Modal/HowToEnjoyModal";

export default function Navigation() {

  const [activeModal, setActiveModal] = useState<"howto" | null>(null);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <nav className="space-y-5 lg:space-y-0 lg:space-x-8 flex items-center justify-center w-full lg:w-auto flex-wrap lg:flex-nowrap">
        <Link
          href=""
          className="text-lg lg:text-base text-white duration-300 hover:text-lightAccent dark:hover:text-darkSecondary w-full lg:w-auto"
          onClick={() => setActiveModal("howto")}
        >
          あそびかた
        </Link>
        <Link
          href="/"
          className="text-lg lg:text-base text-white duration-300 hover:text-lightAccent dark:hover:text-darkSecondary w-full lg:w-auto"
        >
          クイズのひろば
        </Link>
        <Link
          href="/quiz/create"
          className="flex items-center justify-center tracking-wider duration-300 text-text border-2 border-lightAccent dark:border-none hover:text-lightAccent hover:bg-white dark:text-white dark:hover:text-white w-[200px] bg-lightAccent gradient-sky-blue rounded-full px-4 py-2 font-bold"
        >
          クイズをつくる
        </Link>
      </nav>

      {activeModal === "howto" && <HowToEnjoyModal onClose={closeModal} />}
    </>
  ) 
}