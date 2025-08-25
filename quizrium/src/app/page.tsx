import { Quiz } from "@/app/api/quizzes/route";
import HomeClient from "./HomeClient";

export default async function Home() {

  // データ取得関数の呼び出し
  const quizzes = await fetchQuizzes();

  // ジャンル
  const quizzesGenre = quizzes.map(item => item.genre);
  // 重複しているジャンルを除去
  const filterQuizzesGenre = quizzesGenre.filter((value, index, self) =>
    self.indexOf(value) === index
  );

  // 「未分類」を最後に移動。空のジャンルは表示しない。
  const changeFilterQuizzesGenre = filterQuizzesGenre.filter(item => item !== "未分類");
  if (filterQuizzesGenre.includes("未分類")) {
    changeFilterQuizzesGenre.push("未分類");
  } else if (filterQuizzesGenre.includes("")) {
    changeFilterQuizzesGenre.push("");
  }

  return (
    <div className="flex w-full xl:w-[1150px] 2xl:w-[1400px] mx-auto min-h-screen flex-col items-center justify-center">
      {/* <h1 className="text-4xl font-light mb-4 dark:text-white">Quizrium / Quizoo</h1> */}

      <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8 dark:text-white">クイズのひろば</h2>
      <p className="text-base text-center mb-12 lg:mb-16 lg:tracking-wider leading-8 dark:text-white">
        「クイズをつくる」から<br className="lg:hidden" />新しいクイズを作成できます。<br />
        作成したクイズは<br className="lg:hidden" />「クイズのひろば」に表示されます。
      </p>

    <HomeClient
      quizzes={quizzes}
      changeFilterQuizzesGenre={changeFilterQuizzesGenre}
    />
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

