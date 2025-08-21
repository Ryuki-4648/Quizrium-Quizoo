import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-lightPrimary dark:bg-darkPrimary text-white py-10 relative">
      <div className="dark:hidden absolute -top-12 -left-4 w-0 h-0 border-l-[33px] border-l-transparent border-r-[33px] border-r-transparent border-b-[70px] border-b-lightPrimary"></div>
      <div className="dark:hidden absolute -top-16 left-8 w-0 h-0 border-l-[33px] border-l-transparent border-r-[33px] border-r-transparent border-b-[70px] border-b-lightPrimary"></div>
      <div className="dark:hidden absolute -top-10 left-20 w-0 h-0 border-l-[33px] border-l-transparent border-r-[33px] border-r-transparent border-b-[70px] border-b-lightPrimary"></div>
      <ul className="container mx-auto px-4 flex justify-center gap-2 lg:gap-8 mb-4 flex-wrap">
        <li className="text-sm lg:text-md">プライバシーポリシー</li>
        <li className="text-sm lg:text-md">利用規約</li>
        <li className="text-sm lg:text-md">
          <Link target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSe5RJxhW1gDHo5JDDYZaLQrQS8Ip2kTloIIk4l9EhR2yrfHUA/viewform?usp=sf_link">
            お問い合わせ
          </Link>
        </li>
        <li className="text-sm lg:text-md">免責事項</li>
      </ul>
      <div className="container mx-auto px-4">
        <p className="text-xs text-center font-light">
          &copy; since 2025 Quizrium / Quizoo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}