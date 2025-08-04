import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Providers } from '@/app/providers';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

/* メタデータ（Metadata型を使用する） */
export const metadata: Metadata = {
  title: 'Quizrium（クイズリウム） / Quizoo（クイズー）',
  description: 'QuizriumはReact(v19)とNext.js(v15)で構築されたクイズアプリです。ライトモードは動物園（Quizoo）、ダークモードでは水族館（Quizrium）をイメージしたデザインに変化します。',
};

/* レイアウトの型定義を行う */
// childrenプロパティの型にはReact.ReactNode を使用 → どのようなReactコンテンツも子要素として受け入れることができる
interface RootLayoutProps {
  children: React.ReactNode;
}

/* ルートレイアウト（ app/layout.tsx ）はアプリ全体の構造を定義する。htmlとbodyタグを必ず含める。 */
export default function RootLayout({children}: RootLayoutProps) {
    return (
      <html lang="ja">
        <body className={inter.className}>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <header className="bg-gray-800 text-white py-4 fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4 flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Quizrium<span className="text-sm text-gray-400 font-normal ml-4">クイズアプリ</span></h1>
                  <Navigation />
                </div>
              </header>
              {/* メインコンテンツ部分はchildrenプロパティを使用 */}
              <main className="flex-grow">
                {children}
              </main>
              <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4">
                  <p className="text-sm text-center">
                    &copy; since 2025 Quizrium / Quizoo. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </Providers>
        </body>
      </html>
    );
  }