'use client';

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Navigation from "./Navigation";
import { useState } from "react";

export default function Header() {

    const [navDisplay, setNavDisplay] = useState(false);
    const toggleNavClick = () => {
      setNavDisplay(!navDisplay);
    }

  return (
    <header className="bg-lightPrimary dark:bg-darkPrimary text-white pt-4 pb-4 lg:pt-4 lg:pb-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between flex-wrap lg:flex-nowrap">
        <Link href="/">
          <h1 className="text-lg lg:text-2xl tracking-wide font-light duration-300 dark:hover:text-darkTertiary">
            Quizrium / Quizoo
            <span className="text-sm text-white font-light lg:font-normal ml-4">ふしぎなクイズのせかい</span>
          </h1>
        </Link>
        <div
          className={`items-center mt-8 lg:mt-0 mb-4 lg:mb-0 gap-6 lg:gap-8 flex-wrap lg:flex-nowrap ${navDisplay ? 'flex' : 'hidden'} lg:flex`}
        >
          <ThemeToggle />
          <Navigation />
        </div>

        <div className="w-8 h-8 nav-toggle lg:hidden absolute right-4 top-5 grid gap-y-2 cursor-pointer" onClick={toggleNavClick}>
          <span className={`flex w-8 absolute border-1  right-0 border-white ${navDisplay ? 'rotate-45 top-2' : 'top-0'}`}></span>
          <span className={`flex w-8 absolute border-1 top-3 right-0 border-white ${navDisplay ? 'opacity-0' : ''}`}></span>
          <span className={`flex w-8 absolute border-1 right-0 border-white ${navDisplay ? '-rotate-45 top-2' : 'top-6 '}`}></span>
        </div>
      </div>
    </header>
  )
}