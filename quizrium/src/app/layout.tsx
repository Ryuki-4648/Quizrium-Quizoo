import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Providers } from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'React 19とNext.js 15で構築されたクイズアプリケーション',
};

export default function RootLayout({
  children,
  }: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
  }