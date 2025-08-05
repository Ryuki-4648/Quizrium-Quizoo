import Link from "next/link";
import { Quiz } from "./api/quizzes/route";

export default async function Home() {

  // データ取得関数の呼び出し
  const quizzes = await fetchQuizzes();
  console.log(quizzes);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Quizrium / Quizoo</h1>
      <p className="text-center mb-20">「クイズをつくる」から新しいクイズを作成できます。<br />
        作成したクイズは「クイズのひろば」に表示されます。
      </p>

      <h2 className="text-2xl font-bold mb-8">クイズのひろば</h2>

      {quizzes.length > 0 ? (
        <ul className="flex gap-12 flex-wrap justify-between">
          {quizzes.map((quizItem) => (
            <li key={quizItem.id} className="border-1 rounded-xl px-4 py-6 w-88">
              <p className="font-bold mb-2 text-xl">{quizItem.title}</p>
              <span className="text-sm bg-gray-500 text-white rounded-full py-1 px-2">{quizItem.genre}</span>
              <p className="mt-4">作成日：{quizItem.createdAt}</p>
              <p className="mb-6">問題数：{quizItem.questions.length}問</p>
              <Link href={`/quiz/${quizItem.id}/challenge`} className="flex justify-center rounded-full bg-gray-700 text-white py-2">クイズにこたえる</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>まだクイズがありません</p>
      )}
    </main>
  );
}

async function fetchQuizzes(): Promise<Quiz[]> {
  // TODO: APIからデータを取得する
  // ヒント: fetch関数を使用し、絶対URLを構築する

  // ベースURLの取得 (Next.jsの環境変数)
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/';

  const response = await fetch(`${baseURL}/api/quizzes`, {
    // オプション: キャッシュの制御
    cache: 'no-store' // SSRと同様、リクエストごとに新しいデータを取得
    // または { next: { revalidate: 60 } } でISR (60秒ごとにデータを再検証)
  });
  console.log(response);

  // エラーハンドリング
  if(!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }

  // JSONデータの取得と返却
  return response.json();

  // 返り値がない場合、 Promise<Quiz[]>で「"A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value." (ts2355)」のエラーが発生する
  // 理由：返り値を明示的に定義しているのに、return文がないため
}

