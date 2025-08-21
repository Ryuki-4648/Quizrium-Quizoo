'use client';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;  // 閉じるボタンを押した時に親に通知
}

export default function Modal({children, onClose}: ModalProps) {

  return (
    <>
      <div
        className="bg-white py-8 px-12 rounded-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg"
      >
        <button
          className="text-text text-5xl cursor-pointer absolute right-8 top-4 hover:text-lightPrimary dark:hover:text-darkTertiary duration-300"
          onClick={onClose}
        >
          ×
        </button>
        <div className="overflow-y-auto max-h-[80vh]">
          {children}
        </div>
        <button className="" onClick={onClose}>とじる</button>
      </div>

      {/* 背景オーバーレイ */}
      <div className="fixed z-10 inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer" onClick={onClose}></div>
    </>
  )
};