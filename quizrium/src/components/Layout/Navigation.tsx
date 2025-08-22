"use client";
// クライアントコンポーネントにするために必要。usePathnameのようなクライアントサイドフックを使用するコンポーネントには必ずuse clientが必要。

import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/Modal";
// import { usePathname } from "next/navigation";

export default function Navigation() {

  const [displayModal, setDisplayModal] = useState(false);
  const handleHowToPlay = () => setDisplayModal(true);
  const closeModal = () => setDisplayModal(false);

  // 現在のパスを取得
  // const pathname = usePathname(); // usePathnameフックを使用

  return (
    <>
      <nav className="space-y-5 lg:space-y-0 lg:space-x-8 flex items-center justify-center w-full lg:w-auto flex-wrap lg:flex-nowrap">
        <Link
          href=""
          className="text-lg lg:text-md text-white duration-300 hover:text-lightAccent dark:hover:text-darkTertiary w-full lg:w-auto"
          onClick={handleHowToPlay}
        >
          あそびかた
        </Link>
        <Link
          href="/"
          className="text-lg lg:text-md text-white duration-300 hover:text-lightAccent dark:hover:text-darkTertiary w-full lg:w-auto"
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

      {displayModal && (
        <Modal onClose={closeModal}>
          <h2 className="text-text text-3xl font-bold mb-4 text-center">あそびかた</h2>
          <p className="text-text mb-4 font-bold text-center text-lg">
            Quizrium / Quizoo の世界へようこそ！
          </p>
          <span className="flex w-[64px] h-1 bg-lightPrimary dark:bg-darkSecondary rounded-lg text-center mx-auto mb-8"></span>
          <p className="text-text mb-8">
            新しくクイズをつくるときは「クイズをつくる」をクリックしてください。<br />
            つくったクイズは「クイズのひろば」に表示されます。<br /><br />
            「クイズのひろば」では、他の人がつくったクイズを見ることができます。<br />
            「クイズにこたえる」をクリックしてチャレンジしてみよう。
          </p>
          <h2 className="text-text text-xl font-bold mb-4 text-center">モードの説明</h2>
          <p className="text-text">
            このサイトでは、ダークモード<span className="text-darkSecondary mx-0.5">Quizrium</span>とライトモード<span className="text-lightPrimary mx-0.5">Quizoo</span>を切り替えることができます。<br />
            ダークモードでは「夜空に浮かぶ水族館」、ライトモードでは「幻想的な動物園」をイメージしたデザインになっています。<br />
            気分に合わせてモードを切り替えてみてください。
          </p>
        </Modal>
      )}
    </>
  ) 
}