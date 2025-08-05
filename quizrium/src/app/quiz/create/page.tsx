'use client';

import { useState } from "react";

// 問題の型定義
type Question = {
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function CreateQuizPage() {

  // フォーム状態の管理
  const [title, setTitle] = useState('');

  // 問題の配列を管理（少なくとも1つの問題を初期状態で持つ）
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionText: '',
      options: ['', ''], // 最低2つの選択肢
      correctIndex: 0,
      explanation: ''
    }
  ]);

  // 問題を追加する関数
  const addQuestion = () => {
    // TODO: 既存の問題配列に新しい空の問題を追加
    // ヒント: スプレッド構文を使って新しい配列を作成
  };

  // 問題のテキストを変更する関数
  const handleQuestionTextChange = (questionIndex: number, text: string) => {
    // TODO: 指定されたインデックスの問題テキストを更新
    // ヒント: 配列のコピーを作成し、特定の要素だけを更新
  };

  // 選択肢を変更する関数
  const handleOptionChange = (questionIndex: number, optionIndex: number, text: string) => {
    // TODO: 指定された問題の特定の選択肢を更新
    // ヒント: ネストされた配列の更新には複数レベルのコピーが必要
  };

  // 選択肢を追加する関数
  const addOption = (questionIndex: number) => {
    // TODO: 指定された問題に新しい空の選択肢を追加
  };

  // 正解を設定する関数
  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    // TODO: 指定された問題の正解インデックスを更新
  };

  return (
    <div className="">
      <h2 className="">クイズをつくる</h2>

      <div className="">
        <section className="">
          <label className="">問題文のタイトル<span className="">必須</span></label>
          <input type="text" placeholder="問題のタイトルを入力してください" required></input>
        </section>

        <section className="">

          <div className="">
            <h3 className="">問題No:</h3>

            <label className="">問題文<span className="">必須</span></label>
            <input type="text" placeholder="問題文を入力してください" required></input>

            <label className="">選択肢<span className="">必須</span></label>

            <button className="">選択肢を追加</button>
          </div>

          <button className="" onClick={addQuestion}>問題を追加</button>
        </section>
        {/* TODO: クイズ基本情報セクションを実装 */}
        {/*
        要件:
        ・タイトル入力欄（必須）
        */}
        {/* TODO: 問題フォームセクションを実装 */}
        {/*
        要件:
        ・questions配列をmap関数で展開
        ・各問題に「問題 N」の見出し
        ・問題文の入力欄
        ・選択肢の入力欄
        ・選択肢を追加するボタン
        ・正解選択用のラジオボタン
        */}

        {/* TODO: アクションボタンを配置 */}
        {/*
        要件:
        ・問題追加ボタン
        ・クイズ作成ボタン
        */}
      </div>
    </div>
  );
}