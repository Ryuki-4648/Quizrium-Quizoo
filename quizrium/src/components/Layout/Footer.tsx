"use client";

import Link from "next/link";
import Modal from "../Modal";
import { useState } from "react";

export default function Footer() {

  const [displayPrivacyPolicyModal, setDisplayPrivacyPolicyModal] = useState(false);
  const [displayTermsOfServiceModal, setDisplayTermsOfServiceModal] = useState(false);
  const [displayDisclaimerModal, setDisplayDisclaimerModal] = useState(false);

  const handleOpenPrivacyPolicy = () => setDisplayPrivacyPolicyModal(true);
  const handleOpenTermsOfService = () => setDisplayTermsOfServiceModal(true);
  const handleOpenDisclaimer = () => setDisplayDisclaimerModal(true);

  const closeModal = () => {
    setDisplayPrivacyPolicyModal(false);
    setDisplayTermsOfServiceModal(false);
    setDisplayDisclaimerModal(false);
  };

  return (
    <>
      <footer className="bg-lightPrimary dark:bg-darkPrimary text-white py-10 relative">
        <div className="dark:hidden absolute -top-12 -left-4 w-0 h-0 border-l-[33px] border-l-transparent border-r-[33px] border-r-transparent border-b-[70px] border-b-lightPrimary"></div>
        <div className="dark:hidden absolute -top-16 left-8 w-0 h-0 border-l-[33px] border-l-transparent border-r-[33px] border-r-transparent border-b-[70px] border-b-lightPrimary"></div>
        <div className="dark:hidden absolute -top-10 left-20 w-0 h-0 border-l-[33px] border-l-transparent border-r-[33px] border-r-transparent border-b-[70px] border-b-lightPrimary"></div>
        <ul className="container mx-auto px-4 flex justify-center gap-2 lg:gap-8 mb-4 flex-wrap">
          <li className="text-sm lg:text-base cursor-pointer duration-300 hover:text-lightAccent dark:hover:text-darkSecondary" onClick={handleOpenPrivacyPolicy}>プライバシーポリシー</li>
          <li className="text-sm lg:text-base cursor-pointer duration-300 hover:text-lightAccent dark:hover:text-darkSecondary" onClick={handleOpenTermsOfService}>利用規約</li>
          <li className="text-sm lg:text-base cursor-pointer duration-300 hover:text-lightAccent dark:hover:text-darkSecondary">
            <Link target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSe5RJxhW1gDHo5JDDYZaLQrQS8Ip2kTloIIk4l9EhR2yrfHUA/viewform?usp=sf_link">
              お問い合わせ
            </Link>
          </li>
          <li className="text-sm lg:text-base cursor-pointer duration-300 hover:text-lightAccent dark:hover:text-darkSecondary" onClick={handleOpenDisclaimer}>免責事項</li>
        </ul>
        <div className="container mx-auto px-4">
          <p className="text-xs text-center font-light">
            &copy; since 2025 Quizrium / Quizoo. All rights reserved.
          </p>
        </div>
      </footer>

      {displayPrivacyPolicyModal && (
        <Modal onClose={closeModal}>
          <h3 className="text-text text-xl lg:text-2xl font-bold mb-4 text-center">プライバシーポリシー</h3>
          <p className="text-text mb-8 text-sm lg:text-base">
            Quizrium（クイズリウム） / Quizoo（クイズー）（以下「本サービス」）は、誰でも簡単にクイズを作成・公開できるWebアプリです。<br />
            本プライバシーポリシー（以下「本ポリシー」）は、本サービスにおけるユーザーの個人情報等の取扱いについて定めるものです。
          </p>
          <h4 className="font-bold text-lg text-center mb-2">収集する情報</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            当サイトでは、個人を特定できる情報（氏名、メールアドレス、電話番号、住所など）は収集しません。サービスの利用状況を把握するために、アクセスログ（IP を匿名化した統計データ等）やブラウザのローカルストレージを利用してクイズの一時保存を行うことがあります。これらは個人情報を目的としたものではありません。
          </p>
          <h4 className="font-bold text-lg text-center mb-2">Cookie / ローカルストレージ</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            動作のためにブラウザの Cookie や localStorage を使用することがあります。これらは主にユーザー設定や作成中のクイズの一時保存に利用します。ブラウザ側で Cookie・ローカルストレージを無効にすると、一部機能が制限される場合があります。
          </p>
          <h4 className="font-bold text-lg text-center mb-2">第三者サービス</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            当サイトで外部の解析サービスや広告を利用している場合は、そのサービスが別途データを収集することがあります。現状では個人情報を送信する仕様はありませんが、利用する外部サービスがある場合はその旨を別途明示します。
          </p>
          <h4 className="font-bold text-lg text-center mb-2">情報の管理・保護</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            収集したデータは適切な方法で管理し、不正アクセスや漏えいを防ぐために合理的な安全対策を講じます。ただし、インターネットを通じた送受信にはリスクが伴うため、完全な安全性を保証するものではありません。
          </p>
          <h4 className="font-bold text-lg text-center mb-2">免責・変更</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            本ポリシーは予告なく変更されることがあります。変更後は当ページにて更新日時とともに公表します。最終更新日：2025-08-25
          </p>
          <p className="text-text text-sm lg:text-base">
            お問い合わせはサイト内のフィードバック機能をご利用ください（個人情報を送る必要はありません）。
          </p>
        </Modal>
      )}
      {displayTermsOfServiceModal && (
        <Modal onClose={closeModal}>
          <h3 className="text-text text-xl lg:text-2xl font-bold mb-4 text-center">利用規約</h3>
          <p className="text-text mb-8 text-sm lg:text-base">
            Quizrium（クイズリウム） / Quizoo（クイズー）（以下「本サービス」）は、誰でも簡単にクイズを作成・公開・回答できるWebアプリです。<br />
            本利用規約（以下「本規約」）は、本サービスの利用条件を定めるものです。ユーザーは、本サービスを利用することで本規約に同意したものとみなされます。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">第1条（適用）</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            本規約は、ユーザーと本サービスの提供者との間の一切の関係に適用されます。本サービスに関して、本規約のほかにガイドライン等が定められる場合、これらも本規約の一部を構成します。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">第2条（禁止事項）</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。<br />
            ・法令または公序良俗に違反する行為<br />
            ・他のユーザーまたは第三者の権利を侵害する行為<br />
            ・本サービスの運営を妨害する行為<br />
            ・不正アクセスやシステムに対する不正利用<br />
            ・その他、本サービスが不適切と判断する行為
          </p>

          <h4 className="font-bold text-lg text-center mb-2">第3条（サービスの提供・変更・中断）</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            本サービスは、ユーザーへの事前の通知なく、サービス内容の変更や提供の停止を行うことがあります。これによりユーザーまたは第三者が被った損害について、本サービスは責任を負いません。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">第4条（免責事項）</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            本サービスの利用に関連してユーザーに発生した損害について、本サービスは責任を負いません。また、本サービスにおいて提供される情報の正確性や有用性について保証するものではありません。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">第5条（著作権・利用権）</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            ユーザーが作成したクイズの著作権は原則としてユーザーに帰属します。ただし、ユーザーは本サービス上での表示や運営に必要な範囲で本サービスが利用することを許諾するものとします。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">第6条（規約の変更）</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            本規約は予告なく変更されることがあります。変更後の規約は、本サービス上で告知した時点から効力を生じます。<br />
            最終更新日：2025/8/25
          </p>

          <p className="text-text text-sm lg:text-base">
            本規約に関するお問い合わせは、サイト内のフィードバック機能をご利用ください。
          </p>
        </Modal>

      )}
      {displayDisclaimerModal && (
        <Modal onClose={closeModal}>
          <h3 className="text-text text-xl lg:text-2xl font-bold mb-4 text-center">免責事項</h3>
          <p className="text-text mb-8 text-sm lg:text-base">
            Quizrium（クイズリウム） / Quizoo（クイズー）（以下「本サービス」）は、誰でも簡単にクイズを作成・公開・利用できるWebアプリです。<br />
            本免責事項は、本サービスの利用に関して生じ得る責任の範囲を定めるものです。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">情報の正確性について</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            本サービス上に掲載されるクイズや情報の内容について、正確性・完全性・有用性を保証するものではありません。利用者は自己の判断と責任において本サービスを利用するものとします。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">利用による影響</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            本サービスの利用により発生した損害（データ消失、学習結果、トラブル等）について、運営者は一切の責任を負いません。  
            また、他のユーザーが作成したクイズの内容によって発生した問題についても、運営者は責任を負わないものとします。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">外部リンク・第三者サービス</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            本サービスからリンクされた外部サイトや、利用している第三者サービスの内容について、運営者は一切責任を負いません。  
            外部サービスの利用は各サービス提供者の利用規約・ポリシーに従うものとします。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">サービスの提供・変更・停止</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            運営者は、事前の通知なく本サービスの内容を変更・停止・終了することがあります。これにより発生した損害についても責任を負いません。
          </p>

          <h4 className="font-bold text-lg text-center mb-2">免責事項の変更</h4>
          <p className="text-text mb-3 text-sm lg:text-base">
            本免責事項は予告なく変更される場合があります。変更後は当ページにて更新日時とともに公表します。<br />
            最終更新日：2025/8/25
          </p>

          <p className="text-text text-sm lg:text-base">
            本サービスをご利用いただくことで、本免責事項に同意いただいたものとみなします。
          </p>
        </Modal>
      )}
    </>
  )
}