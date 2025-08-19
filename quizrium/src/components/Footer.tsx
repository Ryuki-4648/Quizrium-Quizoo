export default function Footer() {
  return (
    <footer className="bg-lightSecondary dark:bg-darkPrimary text-white py-10">
      <ul className="container mx-auto px-4 flex justify-center gap-8 mb-4">
        <li>プライバシーポリシー</li>
        <li>利用規約</li>
        <li>お問い合わせ</li>
        <li>免責事項</li>
      </ul>
      <div className="container mx-auto px-4">
        <p className="text-sm text-center">
          &copy; since 2025 Quizrium / Quizoo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}