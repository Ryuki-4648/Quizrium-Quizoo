import { notFound } from "next/navigation";
import { Quiz } from "@/app/api/quizzes/route";
import QuizForm from "@/components/QuizForm";

interface QuizChallengePageProps {
  params: Promise<{
    id: string;
  }>;
}

// クイズデータを取得する関数
async function fetchQuizById(id: number): Promise<Quiz | null> {
  try {
    // TODO: APIからクイズデータを取得する処理を実装
    // ヒント: 作成したAPIエンドポイントを使用
    // ヒント: 全クイズを取得してから、指定IDのクイズをfindで探す
    
    //const response = await fetch(`/api/quizzes/${id}`); これは不可
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/';
    const response = await fetch(`${baseURL}/api/quizzes`, { cache: 'no-store' }); // まず全件取得する

    /**
     * const response = await fetch('/api/quizzes', { cache: 'no-store' });だとエラーになる。
     * 例）Server Error fetching quiz: TypeError: Failed to parse URL from /api/quizzes
     * 　GET http://localhost:3000/quiz/1/challenge 404 (Not Found)Understand this error
     * 
     * 原因：
     * サーバーコンポーネント内で相対パス(/api/quizzes)でfetchしているため、URL解決に失敗しているため。
     * サーバーコンポーネント（page.tsx）で 相対パスfetch('/api/quizzes') を使うと、Next.jsのサーバー側では絶対パスが必要になる。
     * クライアント側なら相対パスでOKだが、サーバー側では http://localhost:3000/api/quizzes のような絶対パスでfetchする必要がある。
     * サーバーコンポーネントでは、fetch はNode.jsのサーバー上で実行される。
     * Node.js は /api/quizzes を「どこかの外部サイト」とは認識できず、ホスト情報（ドメインやポート）がないため失敗する。
     */

    console.log(response);

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz with id: ${id}`);
    }

    const quizzes: Quiz[] = await response.json();
    console.log(quizzes)

    // 指定のIDと一致するクイズを探す
    const quizWithMatchingId = quizzes.find((item) => item.id === id);
    return quizWithMatchingId ?? null;

  } catch(e) {
    console.error('Error fetching quiz:', e);
    return null;
  }
}

export default async function QuizChallengePage({ params }: QuizChallengePageProps) {
  const { id } = await params; // URLパラメータからIDを取得
  console.log(id, typeof id); // string

  // 指定したIDから該当のクイズデータを取得
  const getQuizData = await fetchQuizById(parseInt(id, 10));
  // parseInt：文字列を数値に変換する。第1引数に文字列の値、第2引数に基数（省略可）を指定。
  // 基数に10を指定すると10進数として処理される。
  
  console.log(getQuizData);

  // クイズデータがない場合
  if(!getQuizData) {
    notFound();
  }

  return (
    <section>
      <div className="bg-[rgba(255,255,255,0.9)] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-12">タイトル：{getQuizData.title}</h1>
        {/* クライアントコンポーネントにクイズデータを渡す */}
        <QuizForm quiz={getQuizData} />
      </div>
    </section>
  );
}