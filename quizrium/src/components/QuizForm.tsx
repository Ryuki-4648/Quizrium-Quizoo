'use client';

import { Quiz } from "@/app/api/quizzes/route";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface QuizFormProps {
  quiz: Quiz;
}

export default function QuizForm({ quiz }: QuizFormProps) {
  const router = useRouter();

  // TODO: 必要な状態を定義
  // ヒント: 現在の問題インデックス、選択された選択肢、全回答履歴
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(quiz.id);
  const [selectedOption, setSelectedOption] = useState();
  const [allAnswers, setAllAnswers] = useState();

  // 現在の問題を取得
  const currentQuestion = quiz.questions[currentQuestionIndex];

  // 選択肢を選択したときの処理
  const handleOptionSelect = (optionIndex: number) => {
    // TODO: 選択された選択肢を状態に保存
  };

  // 回答を送信する処理
  const handleSubmitAnswer = () => {
    // TODO: 選択が未選択の場合は処理を中断
    // TODO: 回答を記録
    // TODO: 次の問題へ進むか、結果ページへ遷移する処理
    // ヒント: 最後の問題かどうかを条件分岐
  };

  return (
    <div className="">
      <div className="">
        {/* TODO: 問題番号表示 */}

        {/* TODO: 問題文表示 */}

        {/* TODO: 選択肢の表示とイベントハンドリング */}

        {/* TODO: 「次へ」または「回答を送信」ボタンの実装 */}
        <button onClick={handleSubmitAnswer}>答えを送る</button>
      </div>
    </div>
  );

}