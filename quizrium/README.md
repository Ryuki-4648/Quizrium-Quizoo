# 環境構築

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# テストの実行方法

単体テスト（local環境版とStackBlitz対応版がある）

```bash
## 全てのテストを実行
npm test

## ウォッチモードでテストを実行
npm run test:watch

## カバレッジレポートを生成
npm test -- --coverage
```



# 本サイトについて
## サイトのコンセプトやイメージ
- だれでも簡単に作れるクイズアプリ。
- ライトモード「幻想的な動物園」、ダークモード「夜空に浮かぶ水族館」をイメージし、気分に合わせてモードの切り替えが可能。
- ふしぎなクイズのせかいがコンセプト。

## フォント
- Kiwi Maru（キウイ丸）
- 丸みのある可愛らしいマルゴシック系のフォント。
- ユニークで不思議な世界観を出したかったのでこちらのフォントを採用。

## 画像
- 背景画像：生成AIサイトの「Whisk」を利用。（https://labs.google/fx/ja/tools/whisk）

## クイズ
- 問題や解説は主にWikipediaから引用。




# スキルアッププロジェクトの課題の概要
## 要約
React 19.1.0、TypeScript 5.8.3、Redux Toolkit 2.8.2を使用した、最新のNext.js 15.3.1環境でクイズアプリの基本プロジェクトを作成し、適切な初期設定を行う。

## 目的
- 最新のReactエコシステムと状態管理の設定方法を理解する
- フロントエンド開発のセットアップ経験を得る
- TypeScript、Redux、Tailwindを統合したモダンな開発環境の構築方法を学ぶ
- アプリケーション全体で一貫した状態管理基盤を作る

## 注意点
- Redux Toolkitの初期設定はシンプルに保ち、後の課題で機能を拡張できるようにする
- TypeScriptとReduxの型定義を適切に連携させる
- App Routerの構造に合わせてRedux Providerを配置する
- Server ComponentsとClient Componentsの区別を理解し、Reduxを適切に使用する

# クイズ
## サンプルデータ
各クイズには以下のプロパティを含める。
各問題には問題文、選択肢の配列、正解インデックスを含める。
- id (一意の識別子)
- title (クイズのタイトル)
- createdAt (作成日付)
- questions (問題の配列)

## JSONデータの構造設計
- クイズデータは配列として定義します（ [] で囲む）
- 各クイズはオブジェクトとして定義します（ {} で囲む）
- 各問題もオブジェクトとして、問題の配列内に定義します
- 正解の選択肢は、選択肢配列のインデックス（0から始まる）で指定します

## サンプルデータの作成
- 少なくとも2つのクイズを作成し、各クイズには2問以上の問題を含めます
- 各問題には少なくとも2つ以上の選択肢を用意します
- 問題の難易度や種類に変化をつけると、より実践的なアプリになります

## JSONの書式と注意点
- JSON内ではJavaScriptのコメント（ // や/* */）は使用できません
- すべてのプロパティ名は二重引用符（ "）で囲む必要があります（シングルクォートは使用不可）
- 文字列値も二重引用符で囲みます
- 数値、真偽値（ true / false）、nullは引用符なしで記述します
- 配列やオブジェクトの最後の要素の後にはカンマを付けないようにします
- 日付は文字列として"YYYY-MM-DD"形式で格納するのが一般的です

## クイズ挑戦ページ
1. クイズ挑戦ページの作成:
- app/quiz/[id]/challenge/page.tsxファイルを作成
- Server Componentでクイズデータを取得し、Client Componentに渡す構造を実装

2. クイズ回答インターフェースの実装:
- 問題を1問ずつ表示するUI
- 選択肢をラジオボタンまたはカード形式で表示
- 「次へ」ボタンで次の問題へ進む機能
- 最後の問題では「回答を送信」ボタン表示

3. 状態管理の実装:
- 現在の問題インデックス、選択された回答、すべての回答履歴を管理するステート


# 必要な知識 / 課題のヒント
- Redux Providerは`app/providers.tsx`のような専用ファイルでクライアントコンポーネントとして実装するとよい
- `'use client'`ディレクティブを理解し、Reduxを使用するコンポーネントで適切に使用する
- 最初はシンプルなストア設定から始め、アプリケーションの成長に合わせて拡張する
- TypeScriptでのカスタムフック（`useAppDispatch`、`useAppSelector`など）を早期に定義しておくと便利

1. 'use client' ディレクティブ
- usePathname のようなクライアントサイドフックを使用するコンポーネントには必ず'use client'ディレクティブが必要です
    Server Componentでは使用できない機能:
    React hooks ( useState , useEffect , usePathname 等)
    ブラウザAPI ( window , document等)
    イベントハンドラー ( onClick , onChange等)

2. Link コンポーネント
- aタグの代わりにLinkコンポーネントを使用することで、ページ全体をリロードせずにナビゲーションできます
- href属性にURLパスを指定します
- その他の属性は通常のaタグと同様に使用できます


3. 条件付きスタイリング
- usePathname で取得した現在のパスと各リンクのパスを比較することで、アクティブなリンクのスタイルを変更できます
    例: pathname === '/' ? 'text-white font-bold' : 'text-gray-300 hover:text-white'

4. レイアウトとの統合
- ナビゲーションコンポーネントはヘッダー内に配置し、すべてのページで共通して表示されるようにします
- Flexboxを使用してタイトルとナビゲーションを水平に配置するとよいでしょう

5. Server ComponentsとClient Components
- ページファイル（ page.tsx）はデフォルトでServer Componentsです
- ナビゲーションは状態を持つため、Client Componentとして実装します
- 適切な使い分けにより、パフォーマンスの最適化が可能です
