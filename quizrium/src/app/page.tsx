import Link from "next/link";
import { Quiz } from "@/app/api/quizzes/route";
import { formatDate } from './utils/formatDate';

export default async function Home() {

  // データ取得関数の呼び出し
  const quizzes = await fetchQuizzes();
  console.log(quizzes);

  console.log(quizzes.map(item => item.genre))

  return (
    <div className="flex w-full xl:w-[1100px] 2xl:w-[1400px] mx-auto min-h-screen flex-col items-center justify-center">
      {/* <h1 className="text-4xl font-light mb-4 dark:text-white">Quizrium / Quizoo</h1> */}

      <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8 dark:text-white">クイズのひろば</h2>
      <p className="text-md text-center mb-12 lg:mb-20 lg:tracking-wider leading-8 dark:text-white">
        「クイズをつくる」から<br className="lg:hidden" />新しいクイズを作成できます。<br />
        作成したクイズは<br className="lg:hidden" />「クイズのひろば」に表示されます。
      </p>

      <section className="">
        絞り込み検索
        <input type="radio" id="" name="search" className="" />
        <label htmlFor="" className="">すべて</label>
        
        <input type="radio" id="" name="search" className="" />
        <label htmlFor="" className=""></label>
      </section>

      {quizzes.length > 0 ? (
        <ul className="gap-12 2xl:gap-20 flex-wrap justify-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex-box">
          {quizzes.map((quizItem) => (
            <li
              key={quizItem.id}
              className="flex flex-col border-2 dark:border-1 border-lightPrimary dark:border-white bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,104,136,0.4)] rounded-xl px-4 py-8 w-88"
            >
              <p className="font-bold mb-2 text-xl dark:text-white">
                {quizItem.title}
              </p>
              <span
                className="w-fit inline-block text-sm bg-lightAccent dark:bg-darkSecondary text-white rounded-full py-0.5 px-3"
              >
                {quizItem.genre}
              </span>
              <p className="mt-4 dark:text-white">
                作成日：{formatDate(quizItem.createdAt)}
              </p>
              <p className="mb-6 dark:text-white">
                問題数：{quizItem.questions.length}問
              </p>
              <Link
                href={`/quiz/${quizItem.id}/challenge`}
                className="mt-auto flex justify-center text-center rounded-full bg-lightPrimary hover:bg-lightSecondary gradient-sky-blue text-white font-bold py-2 duration-300"
              >
                クイズにこたえる
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>まだクイズがありません</p>
      )}
    </div>
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

