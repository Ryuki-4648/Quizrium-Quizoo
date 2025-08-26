import Modal from "./BaseModal";

export default function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <h3 className="text-text text-xl lg:text-3xl font-bold mb-4 text-center">利用規約</h3>
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
  )
}