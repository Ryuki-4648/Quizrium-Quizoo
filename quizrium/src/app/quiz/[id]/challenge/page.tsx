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

  // クイズデータを取得
  const quiz = await fetchQuizById(parseInt(id, 10));

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

    return null;

  } catch(e) {
    console.error('Error fetching quiz:', e);
    return null;
  }
}