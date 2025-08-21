'use client';

import { useState } from "react";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({children}: ModalProps) {
  const [modalDisplay, setModalDisplay] = useState(false);

  const closeModal = () => {
    setModalDisplay(!modalDisplay);
  }

  return (
    <>
      <div
        className="bg-white py-8 px-12 rounded-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg"
      >
        <button
          className="text-text text-5xl cursor-pointer absolute right-8 top-4 hover:text-lightPrimary dark:hover:text-darkTertiary duration-300" onClick={closeModal}
        >
          ×
        </button>
        <div className="overflow-y-auto max-h-[80vh]">
          {children}
        </div>
        <button className="" onClick={closeModal}>とじる</button>
      </div>
      <div className="fixed z-10 inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center" onClick={closeModal}></div>
      
    </>
  )
};