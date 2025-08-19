import { notFound } from 'next/navigation';
import { Quiz } from '@/app/api/quizzes/route';
import ResultClient from './ResultClient';

interface ResultPageProps {
  params: Promise<{
    id: string;
  }>;
}

/* 結果表示用クライアントコンポーネント */
export default async function ResultPage({ params }: ResultPageProps) {
  // TODO: 以下を実装
  // 1. paramsからidを取得
  const { id } = await params; // URLパラメータからIDを取得
  
  // 2. fetchQuizById関数でクイズデータを取得（問題8と同じ方法）
  async function fetchQuizById(id: number): Promise<Quiz | null> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/';
      const response = await fetch(`${baseURL}/api/quizzes`, { cache: 'no-store' }); // まず全件取得する
  
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

  // 3. クイズが存在しない場合はnotFound()
  const quiz = await fetchQuizById(parseInt(id, 10));
  if (!quiz) {
    notFound(); // クイズが見つからない場合は404ページを表示
  }


  // 4. ResultClientコンポーネントにquizを渡す
  return <ResultClient quiz={quiz} />;


}