import Modal from "./BaseModal";

export default function HowToEnjoyModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-text text-xl lg:text-3xl font-bold mb-4 text-center">あそびかた</h2>
        <p className="text-text mb-4 lg:font-bold text-center text-sm lg:text-lg">
          Quizrium / Quizoo <br className="block sm:hidden" />の世界へようこそ！
        </p>
        <span className="flex w-[64px] h-1 bg-lightPrimary dark:bg-darkSecondary rounded-lg text-center mx-auto mb-8 lg:mb-12"></span>
        <p className="text-text mb-8 text-sm lg:text-base">
          新しくクイズをつくるときは<span className="font-bold">「クイズをつくる」</span>をクリックしてください。<br />
          つくったクイズは<span className="font-bold">「クイズのひろば」</span>に表示されます。<br /><br />
          「クイズのひろば」では、他の人がつくったクイズを見ることができます。<br />
          「クイズにこたえる」をクリックしてチャレンジしてみよう。
        </p>
        <h2 className="text-text text-xl font-bold mb-4 text-center">モードの説明</h2>
        <p className="text-text text-sm lg:text-base">
          このサイトでは、ダークモード<span className="text-darkSecondary mx-0.5">Quizrium</span>とライトモード<span className="text-lightPrimary mx-0.5">Quizoo</span>を切り替えることができます。<br />
          ダークモードでは「夜空に浮かぶ水族館」、ライトモードでは「幻想的な動物園」をイメージしたデザインになっています。<br />
          気分に合わせてモードを切り替えてみてください。
        </p>
    </Modal>
  )
}