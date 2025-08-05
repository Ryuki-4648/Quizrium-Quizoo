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
  // 必要な状態を定義
  // 現在の問題インデックス、選択された選択肢、全回答履歴
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 最初の問題から開始
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [allAnswers, setAllAnswers] = useState<number[]>([]); // 各問題の選択肢インデックスを格納

  // 現在の問題を取得
  const currentQuestion = quiz.questions[currentQuestionIndex];

  // TODO: 選択された選択肢を状態に保存
  // 選択肢を選択したときの処理
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  // TODO: 選択が未選択の場合は処理を中断
  // TODO: 回答を記録
  // TODO: 次の問題へ進むか、結果ページへ遷移する処理
  // ヒント: 最後の問題かどうかを条件分岐

  // 回答を送信する処理
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    // 回答を記録
    const updatedAnswers = [...allAnswers]; // 現在の回答履歴をコピー
    updatedAnswers[currentQuestionIndex] = selectedOption; // 現在の問題の選択肢を更新
    setAllAnswers(updatedAnswers);

    // 次の問題へ進むか結果ページへ
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // 次の問題に進むので選択肢の状態をリセット
    } else {
      // 最後の問題の場合は結果ページへ遷移（回答履歴をクエリパラメータで渡す例）
      const answersParam = encodeURIComponent(JSON.stringify(updatedAnswers));
      router.push(`/quiz/${quiz.id}/result?answers=${answersParam}`);
    }
  };

  return (
    <section className="">

      <div className="">
        {/* TODO: 問題番号表示 */}
        <h2 className="text-md font-medium mb-4">問題 {currentQuestionIndex + 1} / 全 {quiz.questions.length} 問</h2>

        {/* TODO: 問題文表示 */}
        <p className="text-xl mb-4 font-bold">{currentQuestion.questionText}</p>

        {/* TODO: 選択肢の表示とイベントハンドリング */}
        <ul className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <li key={index} className={`p-2 border rounded ${selectedOption === index ? 'bg-blue-100' : 'bg-white'}`}>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="quiz-option"
                  checked={selectedOption === index}
                  onChange={() => handleOptionSelect(index)}
                  className="mr-2"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmitAnswer}
          disabled={selectedOption === null}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? '次のクイズへ' : 'こたえを送る'}
        </button>
      </div>

    </section>
  );

}