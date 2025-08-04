import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 質問の型定義
export type Question = {
  questionText: string;
  options: [];
  correctIndex: number;
  explanation: string;

};

// クイズの型定義
export type Quiz = {
  id: number;
  gente: string;
  title: string;
  createdAt: string;
  quiestions: Question[];
};

export async function GET() {
  try {
    // TODO: JSONファイルを読み込んでパースする
    // ヒント:
    // 1. process.cwd()でプロジェクトルートを取得
    // 2. path.join()でファイルパスを構築
    // 3. fs.readFileSync()でファイルを読み込み
    // 4. JSON.parse()でパース
    // TODO: 成功レスポンスを返す
    // ヒント: NextResponse.json(data)を使用

    // エラーが出る例
    // プロジェクトルートから quizzes.json を読み込む
    // const filePath = path.join(process.cwd(), 'src', 'data', 'quizzes.json');
    // const fileContent = await fs.readFile(filePath, 'utf-8');
      // 上記はfs/promises モジュールを使っている場合に限る。
      // fs.readFile をそのまま使うと、これは コールバック形式（古いスタイル） の関数。
      // つまり、Promiseを返さないため、await は使えない。
    // const data: Quiz[] = JSON.parse(fileContent);
    // return NextResponse.json(data);

    // 1. process.cwd()でプロジェクトルートを取得
    // 現在の作業ディレクトリ（Current Working Directory）のパスを文字列として返す
    const projectCurrentRoot = process.cwd();
    console.log(projectCurrentRoot);

    // 2. path.join()でファイルパスを構築
    const filePath = path.join(projectCurrentRoot, 'src', 'data', 'quizzes.json');
    console.log(filePath);

    // 3. fs.readFileSync()でファイルを読み込み
    // awaitを使わない同期で、APIの実装が簡単な場合や読み込みが軽い場合に有効
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // 4. JSON.parse()でパース
    // 結果に対して型を明示的に指定することで、型チェックが有効になる
    const data: Quiz[] = JSON.parse(fileContent);

    // ヒント: NextResponse.json(data)を使用
    return NextResponse.json(data);

  } catch(e) {
    console.error('Error reading quizzes:', e);
    return NextResponse.json(
      { e: 'Failed to fetch quizzes'},
      { status: 500 }
    );
  }
}