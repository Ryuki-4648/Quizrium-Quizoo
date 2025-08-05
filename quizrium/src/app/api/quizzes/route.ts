import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * fsモジュール
 * - Node.jsでファイルを操作するための公式モジュール。
 * - ファイルの新規作成、読み込み、書き込み、削除などの操作が可能。
 * - fs.readFile(ファイルのパスを文字列で記述,utf8などの文字コード,ファイル読み込み後に実行したいコールバック関数)でファイル操作を行う。
 * - readFile()が非同期処理、readFileSync()が同期処理。
 * 
 * https://www.sejuku.net/blog/71663
 */

// 質問の型定義
export type Question = {
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

// クイズの型定義
export type Quiz = {
  id: number;
  genre: string;
  title: string;
  createdAt: string;
  questions: Question[];
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

/* サーバーサイドのPOST処理 */
export async function POST(request: Request) {
  try {

    // リクエストボディを取得
    const newQuiz = await request.json();

    // バリデーション
    // タイトル、問題文が空でないか、問題が1問以上あるかチェック
    if (!newQuiz.title || !newQuiz.questions || newQuiz.questions.length === 0) {
      return NextResponse.json(
        { error: 'Title and questions are required' },
        { status: 400 }
      );
    }

    // 各問題のバリデーション
    for (const newQuestionItem of newQuiz.questions) {
      // 問題文が空でないか、選択肢が空でないかつ2つ以上あるか、正解のインデックスが正しく設定されているかチェック
      if (!newQuestionItem.questionText || !newQuestionItem.options || newQuestionItem.options.length < 2 || newQuestionItem.correctIndex === undefined) {
        return NextResponse.json(
          { error: 'Each question must have text, at least 2 options, and a correct answer' },
          { status: 400 }
        );
      }
    }
    
    // JSONファイルのパスを取得
    const filePath = path.join(process.cwd(), 'src', 'data', 'quizzes.json');

    // TODO: 既存のクイズデータを読み込む
    // ヒント: fsモジュールを使用してファイルを読み込み、JSONとしてパース
    const currentJsonFileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonParseQuizzes: Quiz[] = JSON.parse(currentJsonFileContent);
    console.log(jsonParseQuizzes);

    // TODO: 新しいIDを生成（既存の最大ID + 1、または現在時刻）
    // ヒント: reduce関数を使用して最大IDを計算する
    const createdNewId = jsonParseQuizzes.reduce((maxId, quiz) => Math.max(maxId, quiz.id), 0) + 1;
    console.log(createdNewId);

    // TODO: 新しいクイズオブジェクトを作成
    // ヒント: IDと現在の日付を追加したオブジェクトを作成
    const quizToSave: Quiz = {
      id: createdNewId, // 既存の最大ID + 1
      genre: newQuiz.genre || '未分類', // ジャンルが指定されていない場合は「未分類」
      title: newQuiz.title,
      createdAt: new Date().toISOString(), // 現在の日時をISO形式で保存
      questions: newQuiz.questions,
    };
    console.log(quizToSave);

    // TODO: クイズを追加
    // ヒント: 既存の配列に新しいオブジェクトをpush
    jsonParseQuizzes.push(quizToSave);
    console.log(jsonParseQuizzes);

    // TODO: ファイルに書き込む
    // ヒント: JSON.stringifyでオブジェクトを文字列に変換し、ファイルに書き込む
    fs.writeFileSync(filePath, JSON.stringify(jsonParseQuizzes, null, 2), 'utf-8');

    // 成功レスポンスを返す
    return NextResponse.json({
      message: 'Quiz created successfully',
      quiz: quizToSave // 作成したクイズデータをレスポンスに含める
    }, { status: 201 });
      

  } catch(e) {
    console.error('Error creating quiz:', e);
    return NextResponse.json(
      { error: 'Failed to create quiz' },
      { status: 500 }
    );
  }
}