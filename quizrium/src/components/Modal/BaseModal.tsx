'use client';

interface ModalProps {
  children: React.ReactNode; // Reactが描画できるすべてのものを表す型
  onClose: () => void; // Modal コンポーネントは自分自身では「表示/非表示」を管理していない。モーダルを閉じる時に親へ通知するコールバック関数の型定義（状態を持っているのは 親コンポーネント）
}

export default function BaseModal({children, onClose}: ModalProps) {

  return (
    <>
      <div
        className="h-9/10 w-5/6 lg:w-3/4 bg-white pt-12 lg:pt-16 pb-6 lg:pb-8 pl-4 pr-4 lg:pl-8 lg:pr-12 rounded-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 shadow-lg border-2 border-lightPrimary dark:border-darkSecondary flex flex-col"
      >
        <button
          className="text-5xl cursor-pointer absolute right-3 lg:right-4 top-1 lg:top-4 text-lightPrimary hover:text-lightAccent dark:text-darkSecondary dark:hover:text-darkTertiary duration-300"
          onClick={onClose}
        >
          ×
        </button>
        <div className="overflow-y-auto max-h-[80vh] pr-2">
          {children}
        </div>
        <button
          className="border-2 border-lightPrimary dark:border-darkSecondary rounded-full px-12 py-1 text-lg lg:text-xl cursor-pointer mt-4 flex justify-center text-center mx-auto text-lightPrimary dark:text-darkSecondary hover:text-white hover:bg-lightPrimary dark:hover:bg-darkSecondary duration-300"
          onClick={onClose}
        >
          とじる
        </button>
      </div>

      {/* 背景オーバーレイ */}
      <div className="fixed z-50 inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer" onClick={onClose}></div>
    </>
  )
};