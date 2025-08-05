import { notFound } from "next/navigation";
import { Quiz } from "@/app/api/quizzes/route";
import QuizForm from "@/components/QuizForm";

interface QuizChallengePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizChallengePage({ params }: QuizChallengePageProps) {
  const { id } = await params;
  console.log('Quiz ID:', id);

  // クイズデータを取得
  const quiz = await fetchQuizById(parseInt(id, 10));
  console.log(quiz);

  // クイズデータがない場合
  if(!quiz) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
      {/* クライアントコンポーネントにクイズデータを渡す */}
      <QuizForm quiz={quiz} />
    </div>
  );
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

    const quiz = quizzes.find((item) => item.id === id);
    return quiz ?? null;

  } catch(e) {
    console.error('Error fetching quiz:', e);
    return null;
  }
}