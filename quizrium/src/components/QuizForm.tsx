'use client';

import { Quiz } from "@/app/api/quizzes/route";
import { setAnswer } from "@/lib/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface QuizFormProps {
  quiz: Quiz;
}

export default function QuizForm({ quiz }: QuizFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch()

  // TODO: 必要な状態を定義
  // ヒント: 現在の問題インデックス、選択された選択肢、全回答履歴
  const [currentQuestionIndexNumber, setCurrentQuestionIndexNumber] = useState(0); // 最初の問題から開始
  const [selectedOption, setSelectedOption] = useState<number | null>(null); //　ローカルステート
  const [allAnswers, setAllAnswers] = useState<number[]>([]); // 各問題の選択肢インデックスを格納

  // 現在の問題を取得
  const currentQuestion = quiz.questions[currentQuestionIndexNumber];

  // Reduxステートから値を取得
  const currentQuestionIndex = useAppSelector(state => state.quiz.currentQuestionIndex);
  const answers = useAppSelector(state => state.quiz.answers);

  // クイズ開始時に初期化
  useEffect(() => {
    //TODO: startQuizアクションをdispatch
    dispatch({
      type: 'quiz/startQuiz',
      payload: {
        quizId: quiz.id,
        questionCount: quiz.questions.length
      }
    });
    // 初期状態を設定
    setCurrentQuestionIndexNumber(0);
    setSelectedOption(null);
    setAllAnswers(Array(quiz.questions.length).fill(-1)); // -1で初期化
  }, [dispatch, quiz.id, quiz.questions.length]);

  // 現在の問題が変わったときに選択状態をリセットまたは復元
  useEffect(() => {
    const savedAnswer = answers[currentQuestionIndex];
    setSelectedOption(savedAnswer >= 0 ? savedAnswer : null);
  }, [currentQuestionIndex, answers]);

  // 既存の関数とJSXはそのまま使用
  // const currentQuestionFunction = quiz.questions[currentQuestionIndex];

  // TODO: 選択された選択肢を状態に保存
  // 選択肢を選択したときの処理
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  // TODO: 選択が未選択の場合は処理を中断
  // TODO: 回答を記録
  // TODO: 次の問題へ進むか、結果ページへ遷移する処理
  // ヒント: 最後の問題かどうか.length]);を条件分岐

  // 回答を送信する処理
  const handleSubmitAnswer = () => {
    // TODO: Reduxに回答を保存する処理
    // setAnswerアクションをdispatch
    if (selectedOption === null) return; // 選択されていない場合は何もしない
    dispatch(setAnswer({
      questionIndex: currentQuestionIndexNumber,
      selectedOptionIndex: selectedOption
    }));

    // TODO: 次の問題へ進むか、結果ページへ遷移する処理
    // 1. 最後の問題でなければnextQuestionをdispatch
    // 2. 最後なら結果ページへ遷移
    if (selectedOption === null) return; // 選択されていない場合は何もしない
    dispatch(setAnswer({
      questionIndex: currentQuestionIndexNumber,
      selectedOptionIndex: selectedOption
    }));
    if (currentQuestionIndexNumber < quiz.questions.length - 1) {
      // 次の問題へ進む
      setCurrentQuestionIndexNumber(currentQuestionIndexNumber + 1);
      setSelectedOption(null); // 次の問題に進むので選択肢の状態をリセット
    } else {
      // 最後の問題の場合は結果ページへ遷移（回答履歴をクエリパラメータで渡す例）
      const answersParam = encodeURIComponent(JSON.stringify(allAnswers));
      router.push(`/quiz/${quiz.id}/result?answers=${answersParam}`);
    }
  };

  // 最後の問題か確認するための変数isLastQuestionを定義
  // const isLastQuestion = currentQuestionIndexNumber === quiz.questions.length - 1;

  return (
    <section className="">

      <div className="">
        {/* TODO: 問題番号表示 */}
        <h2 className="text-md font-medium mb-4">問題 {currentQuestionIndexNumber + 1} / 全 {quiz.questions.length} 問</h2>

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
          {currentQuestionIndexNumber < quiz.questions.length - 1 ? '次のクイズへ' : 'こたえを送る'}
        </button>
      </div>

    </section>
  );

}