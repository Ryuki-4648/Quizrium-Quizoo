'use client';

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "./Navigation";

export default function Header() {

    const [navDisplay, setNavDisplay] = useState(false);
    const [navOverlay, setNavOverlay] = useState(false);
    const toggleNavAndOverlay = () => {
      setNavDisplay(!navDisplay);
      setNavOverlay(!navOverlay);
    }

  return (
    <>
      <header className="bg-lightPrimary dark:bg-darkPrimary text-white pt-4 pb-4 lg:pt-4 lg:pb-4 fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto px-4 flex items-center justify-between flex-wrap lg:flex-nowrap">
          <Link href="/">
            <h1 className="text-md md:text-lg lg:text-2xl sm:tracking-wide font-light duration-300 hover:text-lightAccent dark:hover:text-darkTertiary">
              Quizrium / Quizoo
              <span className="text-xs sm:text-sm text-white font-light lg:font-normal ml-2 lg:ml-0 xl:ml-4 inline lg:block xl:inline">ふしぎなクイズのせかい</span>
            </h1>
          </Link>
          <div
            className={`items-center mt-8 lg:mt-0 mb-4 lg:mb-0 gap-6 xl:gap-8 flex-wrap lg:flex-nowrap ${navDisplay ? 'flex' : 'hidden'} lg:flex`}
          >
            <ThemeToggle />
            <Navigation />
          </div>

          <div className="w-8 h-8 nav-toggle lg:hidden absolute right-4 top-4 grid gap-y-2 cursor-pointer" onClick={toggleNavAndOverlay}>
            <span className={`flex w-8 absolute border-1  right-0 border-white ${navDisplay ? 'rotate-45 top-2' : 'top-0'}`}></span>
            <span className={`flex w-8 absolute border-1 top-3 right-0 border-white ${navDisplay ? 'opacity-0' : ''}`}></span>
            <span className={`flex w-8 absolute border-1 right-0 border-white ${navDisplay ? '-rotate-45 top-2' : 'top-6 '}`}></span>
          </div>
        </div>
      </header>
      <div className={`fixed z-10 inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer ${navOverlay ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleNavAndOverlay}></div>
    </>
  )
}