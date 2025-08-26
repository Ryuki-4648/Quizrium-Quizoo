import type { Metadata } from 'next';
import { Kiwi_Maru } from 'next/font/google';
import '@/app/globals.css';
import { Providers } from '@/app/providers';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

const kiwiMaru = Kiwi_Maru({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

/* メタデータ（Metadata型を使用する） */
export const metadata: Metadata = {
  title: 'ふしぎなクイズのせかい  | Quizrium（クイズリウム） / Quizoo（クイズー） | だれでもクイズ作成アプリ。',
  description: '誰でもクイズが作成できるアプリです。QuizriumはReact(v19)とNext.js(v15)で構築されています。ライトモードは動物園（Quizoo）、ダークモードでは水族館（Quizrium）をイメージしたデザインに変化します。',
  icons: {
    icon: "/assets/favicon.ico",
  },
};

/* レイアウトの型定義を行う */
// childrenプロパティの型にはReact.ReactNode を使用 → どのようなReactコンテンツも子要素として受け入れることができる
interface RootLayoutProps {
  children: React.ReactNode;
}

/* ルートレイアウト（ app/layout.tsx ）はアプリ全体の構造を定義する。htmlとbodyタグを必ず含める。 */
export default function RootLayout({children}: RootLayoutProps) {

    return (
      <html lang="ja" suppressHydrationWarning>
        <body className={kiwiMaru.className}>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Header />
              {/* メインコンテンツ部分はchildrenプロパティを使用 */}
              <main className="main-bg flex-grow pt-40 pb-24 px-4 lg:pt-56 lg:pb-56 lg:px-24">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    );
  }