import Modal from "./BaseModal";

export default function PrivacyPolicyModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <h3 className="text-text text-xl lg:text-3xl font-bold mb-4 text-center">プライバシーポリシー</h3>
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
  )
}

/**

＜勉強用のメモ＞

・パターン１）基本形：Props という型を作りprops.onCloseを分割代入で取り出す
type Props = {
  onClose: () => void;
};

export default function PrivacyPolicyModal(props: Props) {
  const { onClose } = props;
  return ());
}

・パターン２）短縮形：パターン１と意味は同じで、propsの分割代入 + 型注釈を同時に行っている
{ onClose }: { onClose: () => void }
onClose: () => void は「引数を取らずに void を返す関数型」＝クリックされたら呼び出されるコールバック関数という意味。

→ まとめると、{ onClose }: { onClose: () => void } は
　「props の onClose という関数を受け取る。その関数は引数を取らず、何も返さない関数である」という型注釈つきの分割代入である。
*/