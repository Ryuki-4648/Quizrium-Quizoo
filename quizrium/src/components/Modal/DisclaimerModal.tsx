import Modal from "./BaseModal";

export default function DisclaimerModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <h3 className="text-text text-xl lg:text-3xl font-bold mb-4 text-center">免責事項</h3>
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
  )
}