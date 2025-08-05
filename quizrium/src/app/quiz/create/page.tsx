'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
// next/rounterだと「NextRouter was not mounted」のエラーが出るためnext/navigationからimportする

// 問題の型定義
type Question = {
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function CreateQuizPage() {

  const router = useRouter();

  // フォーム状態の管理
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  // 既存の字状態変数に以下を追加
  const [isSubmitting, setIsSubmitting] = useState(false); // フォーム送信中の状態管理
  //const [errorMessage, setErrorMessage] = useState<string | null>(null); // エラーメッセージの状態管理
  const [errorMessage, setErrorMessage] = useState<{ type: string; message: string } | null>(null);
  //const errorMessages: string[] = [];


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
    // TODO: 既存の問題配列に新しい空の問題を追加（setQuestionsに対して行う）
    // ヒント: スプレッド構文を使って新しい配列を作成（既存の問題の配列はquestions）
    setQuestions([...questions, {
      questionText: '',
      options: ['', ''],
      correctIndex: 0,
      explanation: ''
    }]);
  };

  // 問題のテキストを変更する関数（問題文を入力）
  const handleQuestionTextChange = (questionIndex: number, text: string) => {
    // TODO: 指定されたインデックスの問題テキストを更新
    // ヒント: 配列のコピーを作成し、特定の要素だけを更新
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionText = text;
    setQuestions(updatedQuestions);
  };

  // 選択肢を変更する関数
  const handleOptionChange = (questionIndex: number, optionIndex: number, text: string) => {
    // TODO: 指定された問題の特定の選択肢を更新
    // ヒント: ネストされた配列の更新には複数レベルのコピーが必要
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(updatedQuestions);
  };

  // 選択肢を追加する関数
  const addOption = (questionIndex: number) => {
    // TODO: 指定された問題に新しい空の選択肢を追加
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  // 正解を設定する関数
  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    // TODO: 指定された問題の正解インデックスを更新
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctIndex = optionIndex;
    setQuestions(updatedQuestions);
  };

  // 問題を削除する関数（課題にはない追加機能）
  const removeQuestion = (questionIndex: number) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
      setQuestions(updatedQuestions);
    }
  };

  // 選択肢を削除する関数（課題にはない追加機能）
  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length > 2) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      // 正解インデックスを調整
      if (updatedQuestions[questionIndex].correctIndex >= optionIndex) {
        updatedQuestions[questionIndex].correctIndex = Math.max(0, updatedQuestions[questionIndex].correctIndex - 1);
      }
      setQuestions(updatedQuestions);
    }
  };

  // クイズを作成し、送信する関数
  const handleCreateQuiz =  async () => {
    // バリデーション
    if (!title.trim()) {
      //setErrorMessage('クイズのタイトルを入力してください。');
      setErrorMessage({ type: 'title', message: 'クイズのタイトルを入力してください。' });
      return;
    }
    // trim(): 文字列の前後の空白を削除するメソッド。入力フォームでユーザーが余分な空白を入れてしまう可能性があるため。

    // 問題文が入力されているか確認するバリデーション
    const hasEmptyQuestions = questions.some(questionItem => !questionItem.questionText.trim()); // questions: 複数のクイズ問題（Question型）の配列
    if (hasEmptyQuestions) {
      //setErrorMessage('すべての問題文を入力してください');
      setErrorMessage({ type: 'question', message: 'すべての問題文を入力してください' });
      return;
    }
    // some(): 配列の要素の中に、条件を満たすものが1つでもあればtrueを返すメソッド。少なくとも1つの問題文が空であればtrueのためエラーを出す。

    // 選択肢が入力されているか確認するバリデーション
    const hasEmptyOptions = questions.some(questionItem => questionItem.options.some(optionItem => !optionItem.trim()));
    if (hasEmptyOptions) {
      //setErrorMessage('すべての選択肢を入力してください');
      setErrorMessage({ type: 'option', message: 'すべての選択肢を入力してください' });
      return;
    }

    setErrorMessage(null); // エラーメッセージをリセット
    setIsSubmitting(true); // 送信中フラグ

    try {
      // TODO: APIにPOSTリクエストを送信
      // ヒント: fetch API を使用し、適切なヘッダーとボディを設定
      const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/';
      const response = await fetch(`${baseURL}/api/quizzes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          genre: genre || '未分類', // ジャンルが指定されていない場合は「未分類」
          questions,
          explanation: questions.map(q => q.explanation) // 各問題の説明文を配列で送信
        }),
        cache: 'no-store' // キャッシュを無効化
      });
      console.log(response);

      // TODO: レスポンス処理
      // ヒント: レスポンスのステータスコードをチェックし、エラー処理
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'クイズの作成に失敗しました');
        return;
      }

      // TODO: 成功時の処理
      // ヒント: ユーザーにフィードバックを表示し、適切なページに遷移
      const createdQuiz = await response.json();
      console.log('Created Quiz:', createdQuiz);
      router.push(`/quiz/${createdQuiz.id}/challenge`); // 作成したクイズのチャレンジページへ遷移

    } catch (error) {
      console.error('Error creating quiz:', error);
      //setErrorMessage('クイズの作成中にエラーが発生しました');
      setErrorMessage({ type: 'network', message: 'クイズの作成中にエラーが発生しました' });

    } finally {
      setIsSubmitting(false); // 送信中フラグをリセット
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">クイズをつくる</h2>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">

          {/* クイズ基本情報セクション */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">基本情報</h3>
            <div>
              <label className="block text-md font-bold text-gray-700 mb-2">
                タイトル<span className="text-white text-xs p-1 bg-red-500 ml-1 rounded-full">必須</span>
              </label>
              <input 
                type="text" 
                placeholder="クイズのタイトルを入力してください" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            {/* タイトルが未入力の状態で送信ボタンをクリックしたらエラーメッセージを表示する */}
            {errorMessage && errorMessage.type === 'title' && (
              <p className="text-red-500 text-sm mt-2">{errorMessage.message}</p>
            )}
            </div>
            <div>
              <label className="block text-md font-bold text-gray-700 mb-2">
                ジャンル
              </label>
              <input 
                type="text" 
                placeholder="クイズのジャンルを入力してください（未入力の場合は「未分類」になります）" 
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </section>

          {/* 問題フォームセクション */}
          <section className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">問題</h3>
            
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-800">問題 {questionIndex + 1}</h4>
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(questionIndex)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      削除
                    </button>
                  )}
                </div>

                {/* 問題文 */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    問題文<span className="text-white text-xs p-1 bg-red-500 ml-1 rounded-full">必須</span>
                  </label>
                  <textarea
                    placeholder="問題文を入力してください" 
                    value={question.questionText}
                    onChange={(e) => handleQuestionTextChange(questionIndex, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {errorMessage && errorMessage.type === 'question' && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage.message}</p>
                  )}
                </div>

                {/* 選択肢 */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      選択肢<span className="text-white text-xs p-1 bg-red-500 ml-1 rounded-full">必須</span>
                    </label>
                  </div>
                  {errorMessage && errorMessage.type === 'option' && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage.message}</p>
                  )}
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`correct-${questionIndex}`}
                          checked={question.correctIndex === optionIndex}
                          onChange={() => setCorrectAnswer(questionIndex, optionIndex)}
                          className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <input 
                          type="text" 
                          placeholder={`選択肢 ${optionIndex + 1}を入力してください`}
                          value={option}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />

                        {/* 選択肢が2つ以上ある場合は削除ボタンを表示 */}
                        {question.options.length > 2 && (
                          <button
                            onClick={() => removeOption(questionIndex, optionIndex)}
                            className="text-red-500 hover:text-red-700 text-sm px-2 cursor-pointer"
                          >
                            削除
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 pl-6">正解の選択肢を1つ選択してください。選択肢は2つ以上作成してください。</p>
                  <button
                    onClick={() => addOption(questionIndex)}
                    className="text-blue-600 hover:text-blue-800 font-medium ml-6 mt-4 cursor-pointer transition-colors"
                  >
                    + 選択肢を追加
                  </button>

                  {/* 説明文 */}
                  <div className="mt-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      問題の解説
                    </label>
                    <textarea
                      placeholder="問題の解説や説明を入力してください"
                      value={question.explanation}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[questionIndex].explanation = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                </div>
                
              </div>
            ))}

            <button 
              onClick={addQuestion}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 cursor-pointer hover:text-gray-800 transition-colors"
            >
              + 問題を追加
            </button>
          </section>

          {/* アクションボタン */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              disabled={isSubmitting}
              onClick={handleCreateQuiz}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 focus:outline-none transition-colors"
            >
              クイズをつくる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}