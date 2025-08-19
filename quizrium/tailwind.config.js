// npx tailwindcss initでファイル作成

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#2e2e2e', // ブラック
        'lightPrimary': '#033557', // ダークブルー
        'lightSecondary': '#3ccaff', // スカイブルー
        'lightAccent': '#FFEF00', // レモンイエロー
        'lightBackground': '#FFFFFF', // White     
        'darkPrimary': '#006888', // マリンブルー
        'darkSecondary': '#13bed0', // ライトマリンブルー
        'darkAccent': '#FEF236', // レモンイエロー
        'darkBackground': '#fafafa', // ホワイト
      }
    },
  },
  plugins: [],
}

