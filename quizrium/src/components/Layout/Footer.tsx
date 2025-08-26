"use client";

import { useState } from "react";
import Link from "next/link";
import DisclaimerModal from "@/components/Modal/DisclaimerModal";
import TermsModal from "@/components/Modal/TermsModal";
import PrivacyPolicyModal from "@/components/Modal/PrivacyPolicyModal";

export default function Footer() {

  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "disclaimer" | null>(null);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="bg-lightPrimary dark:bg-darkPrimary text-white py-10 relative">
         {/* 草原の装飾（ライトモードのみ） */}
        <div className="dark:hidden absolute -top-12 -left-4 w-0 h-0 border-l-[33px] border-l-transparent border-r-[33px] border-r-transparent border-b-[70px] border-b-lightPrimary"></div>
        <div className="dark:hidden absolute -top-16 left-8 w-0 h-0 border-l-[33px] border-l-transparent border-r-[33px] border-r-transparent border-b-[70px] border-b-lightPrimary"></div>
        <div className="dark:hidden absolute -top-10 left-20 w-0 h-0 border-l-[33px] border-l-transparent border-r-[33px] border-r-transparent border-b-[70px] border-b-lightPrimary"></div>
        <ul className="container mx-auto px-4 flex justify-center gap-2 lg:gap-8 mb-4 flex-wrap">
          <li
            className="text-sm lg:text-base cursor-pointer duration-300 hover:text-lightAccent dark:hover:text-darkSecondary"
            onClick={() => setActiveModal("privacy")}
          >
            プライバシーポリシー
          </li>
          <li
            className="text-sm lg:text-base cursor-pointer duration-300 hover:text-lightAccent dark:hover:text-darkSecondary"
            onClick={() => setActiveModal("terms")}
          >
            利用規約
          </li>
          <li
            className="text-sm lg:text-base cursor-pointer duration-300 hover:text-lightAccent dark:hover:text-darkSecondary"
            onClick={() => setActiveModal("disclaimer")}
          >
            免責事項
          </li>
          <li>
            <Link target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSe5RJxhW1gDHo5JDDYZaLQrQS8Ip2kTloIIk4l9EhR2yrfHUA/viewform?usp=sf_link">
              お問い合わせ
            </Link>
          </li>
        </ul>
        <div className="container mx-auto px-4">
          <p className="text-xs text-center font-light">
            &copy; since 2025 Quizrium / Quizoo. All rights reserved.
          </p>
        </div>
      </footer>

      {activeModal === "privacy" && <PrivacyPolicyModal onClose={closeModal} />}
      {activeModal === "terms" && <TermsModal onClose={closeModal} />}
      {activeModal === "disclaimer" && <DisclaimerModal onClose={closeModal} />}

    </>
  )
}