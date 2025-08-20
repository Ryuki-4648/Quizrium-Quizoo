/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require('next/jest')

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

const createJestConfig = nextJest({
  // Next.jsアプリケーションのルートディレクトリを指定
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
  },
  
  // カバレッジ設定
  collectCoverageFrom: [
  'app/**/*.{js,jsx,ts,tsx}',
  'components/**/*.{js,jsx,ts,tsx}',
  'lib/**/*.{js,jsx,ts,tsx}',
  'util/**/*.{js,jsx,ts,tsx}',
  '!**/*.d.ts',
  '!**/node_modules/**',
  '!**/.next/**',
  ],
}
module.exports = createJestConfig(customJestConfig)