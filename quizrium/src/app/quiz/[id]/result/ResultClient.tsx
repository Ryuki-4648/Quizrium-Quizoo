'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { resetQuiz } from '@/lib/features/quiz/quizSlice';
import { Quiz } from '@/app/api/quizzes/route';

interface ResultClientProps {
  quiz: Quiz;
}

export default function ResultClient({ quiz }: ResultClientProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  console.log(quiz)

  // TODO: Reduxから必要なデータを取得
  // ヒント: answersとquizIdが必要
  const [score, setScore] = useState(0);
  const answers = useAppSelector(state => state.quiz.answers);
  const quizId = useAppSelector(state => state.quiz.quizId);
  const totalQuestions = quiz.questions.length;
  const correctAnswers = quiz.questions.map(q => q.correctIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidAccess, setIsInvalidAccess] = useState(false);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [scoreMessage, setScoreMessage] = useState('');

  // 不正なアクセスのチェック
  useEffect(() => {
    // TODO: 回答データがない、またはquizIdが一致しない場合はホームへリダイレクト
    if (answers.length === 0 || quizId !== quiz.id) {
      setIsInvalidAccess(true);
      router.push('/'); // ホームへリダイレクト
    } else {
      setIsLoading(false);
    }
  }, [
    answers,
    quizId,
    quiz.id,
    router
  ]);

  // 結果の計算
  useEffect(() => {
    // TODO: 正解数を計算してscoreに設定
    // ヒント: answersの各要素とquiz.questions[i].correctIndexを比較
    const correctCount = answers.filter((answer, index) => answer === correctAnswers[index]).length;
    setScore(correctCount);
    setScoreMessage(` ${correctCount}問正解しました！`);
    setIsScoreCalculated(true);
  }, [
    answers,
    correctAnswers
  ]);

  const handleBackToHome = () => {
    // TODO:
    // 1. Redux状態をリセット
    // 2. ホームページへ遷移
    dispatch(resetQuiz());
    router.push('/');
  };

  // TODO: UIを実装
  // 要件:
  // - クイズタイトルの表示
  // - スコア表示（大きく、見やすく）
  // - 「○問正解しました！」のメッセージ
  // - ホームに戻るボタン
  return (
    <div>
      {/* UIを実装 */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isInvalidAccess ? (
        <p>不正なアクセスです。ホームに戻ります。</p>
      ) : (
        <section className='flex flex-col items-center justify-center min-h-screen p-4'>
          <div className='w-4/5 bg-[rgba(255,255,255,0.8)] shadow-md rounded-lg py-12 px-8 mx-auto'>
            <h1 className="text-4xl text-center font-bold mb-6">結果</h1>
            {isScoreCalculated ? (
              <div>
                <h2 className='text-2xl mb-3'>{quiz.title}</h2>
                <span className="inline text-sm bg-lightAccent dark:bg-darkSecondary text-white rounded-full py-1 px-2">
                  {quiz.genre}
                </span>
                <p className="mt-8 mb-2">あなたのスコア: <span className="text-3xl font-bold mr-2">{score} / {totalQuestions}</span>問</p>
                <p className="text-lg mb-8">{scoreMessage}</p>
                
                <ul className="mb-12">
                  {quiz.questions.map((question, index) => (
                    <li key={index} className="mb-8 bg-white shadow-md rounded-lg p-6 mx-auto">
                      <p className="font-bold">問題 {index + 1}</p>
                      <p className="mb-4 text-md">{question.questionText}</p>
                      <dl className="flex gap-x-1 mb-2">
                        <dt className="mr-2 min-w-[60px] bg-lightPrimary dark:bg-darkPrimary text-white flex align-center justify-center h-[24px] rounded-sm">回答</dt>
                        <dd>{question.options[answers[index]]}</dd>
                      </dl>
                      <dl className="flex gap-x-1 mb-2">
                        <dt className="mr-2 min-w-[60px] bg-lightPrimary dark:bg-darkPrimary text-white flex align-center justify-center h-[24px] rounded-sm">正解</dt>
                        <dd>{question.options[question.correctIndex]}</dd>
                      </dl>
                      <dl className="flex gap-x-1">
                        <dt className="mr-2 min-w-[60px] bg-lightPrimary dark:bg-darkPrimary text-white flex align-center justify-center h-[24px] rounded-sm">解説</dt>
                        <dd>{question.explanation}</dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>結果を集計しています</p>
            )}
            <button
              onClick={handleBackToHome}
              className="w-[200px] flex justify-center mx-auto mt-4 px-4 py-2 bg-lightPrimary hover:bg-lightAccent duration-300 gradient-sky-blue text-white rounded-full cursor-pointer"
            >
              ホームに戻る
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
