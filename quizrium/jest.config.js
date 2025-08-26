/* eslint-disable @typescript-eslint/no-require-imports */
// const nextJest = require('next/jest')

/**
 * require('next/jest')に対して以下のエラーあり
 * 「File is a CommonJS module; it may be converted to an ES module.ts(80001) A require() style import is forbidden.eslint@typescript-eslint/no-require-imports」
 * 
 * ESLint のルール (no-require-imports)とJestの設定ファイルの書き方が競合して発生したエラーである。
 * jest.config.jsはNode.js側で実行されるため、通常はCommonJS (require, module.exports) で書いてよい。
 * しかし、本PJではTypeScript + ESLint 環境のためrequire()が使えない。
 * ESLint の警告を無視するか、以下の記述に変更することで解決可能。
 * import nextJest from 'next/jest.js'; ESM 形式
 */

// const createJestConfig = nextJest({
//   // Next.jsアプリケーションのルートディレクトリを指定
//   dir: './',
// })

// const customJestConfig = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   testEnvironment: 'jest-environment-jsdom',
//   moduleNameMapper: {
//   '^@/(.*)$': '<rootDir>/$1',
//   },
  
//   // カバレッジ設定
//   collectCoverageFrom: [
//   'app/**/*.{js,jsx,ts,tsx}',
//   'components/**/*.{js,jsx,ts,tsx}',
//   'lib/**/*.{js,jsx,ts,tsx}',
//   'util/**/*.{js,jsx,ts,tsx}',
//   '!**/*.d.ts',
//   '!**/node_modules/**',
//   '!**/.next/**',
//   ],
// }
// module.exports = createJestConfig(customJestConfig)

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
    {
      // babel.config.jsは削除し、babel-jest用の設定をこのファイルに残す（アプリ本体では SWC（Next.js デフォルト）を使い、テスト実行時だけ Babel を使う構成）
      // babel.config.jsファイルがあると「Syntax error: "next/font" requires SWC although Babel is being used due to a custom babel config being present.」エラーが発生する
      // https://zenn.dev/ma_me/articles/c4ab23f91f2179, https://nextjs.org/docs/messages/babel-font-loader-conflict
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
    },
  ],
  },
  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/$1',
    // 上記の場合、moduleNameMapperが@/lib/hooksを正しく解決できないためnpm testでエラー発生する。
    // @/lib/hooks → <rootDir>/lib/hooks と解釈される。
    '^@/(.*)$': '<rootDir>/src/$1', // src配下を解決
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$))'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};