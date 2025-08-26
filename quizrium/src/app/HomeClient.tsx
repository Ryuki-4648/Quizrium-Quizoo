"use client";

import { useState } from "react";
import { Quiz } from "./api/quizzes/route";
import Link from "next/link";
import { formatDate } from "./utils/formatDate";

export default function HomeClient({ quizzes, changeFilterQuizzesGenre }: {
  quizzes: Quiz[];
  changeFilterQuizzesGenre: string[];
}
) {

  const [selectedGenre, setSelectedGenre] = useState("all");

  // const [sortedQuizzes, setSortedQuizzes] = useState<Quiz[]>(quizzes);
  // 初期状態で作成日の降順で並べる
  const [sortedQuizzes, setSortedQuizzes] = useState<Quiz[]>(
    [...quizzes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // ジャンル別絞り込みだけの場合
  // const filteredQuizzes = selectedGenre === "all" ? quizzes : quizzes.filter(quiz => quiz.genre === selectedGenre);
  
  const filteredQuizzes = selectedGenre === "all"
    ? sortedQuizzes
    : sortedQuizzes.filter(quiz => quiz.genre === selectedGenre);

  const handleNewestOrderCreatedAt = () => {
    const newSorted = [...sortedQuizzes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setSortedQuizzes(newSorted);
    setSortOrder("newest"); // 状態を更新
  }

  const handleOldestOrderCreatedAt = () => {
    const newSorted = [...sortedQuizzes].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    setSortedQuizzes(newSorted);
    setSortOrder("oldest");
  }

  return (
    <>
      <section className="w-full mb-12">
        <div
          className="w-full bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,104,136,0.4)] border-1 border-lightPrimary dark:border-white rounded-lg p-4 flex flex-wrap gap-5"
        >
          {/* ジャンル絞り込み */}
          <div className="flex flex-wrap gap-3">
            <p className="font-bold text-base mr-2 dark:text-white w-full lg:w-auto mb-2 lg:mb-0">絞り込み検索</p>
            <input
              type="radio"
              id="all"
              name="search"
              className="hidden"
              checked={selectedGenre === "all"}
              onChange={() => setSelectedGenre("all")}
            />
            <label
              htmlFor="all"
              className={`text-sm lg:text-base cursor-pointer hover:bg-lightAccent dark:hover:bg-darkSecondary duration-300 py-0.5 px-4 rounded-full ${selectedGenre === "all" ? 'bg-lightPrimary dark:bg-darkTertiary text-white' : 'bg-white'}`}
            >
              すべて
            </label>
            {changeFilterQuizzesGenre.map((genre, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`genre-${index}`}
                  name="search"
                  className="hidden"
                  checked={selectedGenre === genre}
                  onChange={() => setSelectedGenre(genre)}
                />
                <label
                  htmlFor={`genre-${index}`}
                  className={`text-sm lg:text-base cursor-pointer hover:bg-lightAccent dark:hover:bg-darkSecondary duration-300 py-0.5 px-3 rounded-full ${selectedGenre === genre ? 'bg-lightPrimary dark:bg-darkTertiary text-white' : 'bg-white'}`}
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>

          {/* 並び替え */}
          <div className="flex w-full">
            <p className="font-bold text-base mr-12 dark:text-white w-full lg:w-auto mb-2 lg:mb-0">並び替え</p>
            <div className="flex gap-4">
              <button
                className={`cursor-pointer hover:bg-lightAccent dark:hover:bg-darkSecondary duration-300 py-0.5 px-3 rounded-full ${sortOrder === "newest" ? 'bg-lightPrimary dark:bg-darkTertiary text-white' : 'bg-white'}`}
                onClick={handleNewestOrderCreatedAt}
              >
                作成日が新しい順
              </button>
              <button
                className={`text-sm lg:text-base cursor-pointer hover:bg-lightAccent dark:hover:bg-darkSecondary duration-300 py-0.5 px-3 rounded-full ${sortOrder === "oldest" ? 'bg-lightPrimary dark:bg-darkTertiary text-white' : 'bg-white'}`}
                onClick={handleOldestOrderCreatedAt}
              >
                作成日が古い順
              </button>
            </div>
          </div>

        </div>
      </section>

      {quizzes.length > 0 ? (
        <ul className="gap-12 2xl:gap-20 flex-wrap justify-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex-box">
          {filteredQuizzes.map((quizItem) => (
            <li
              key={quizItem.id}
              className="flex flex-col border-2 dark:border-1 border-lightPrimary dark:border-white bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,104,136,0.4)] rounded-xl px-4 py-8 w-88"
            >
              <p className="font-bold mb-2 text-xl dark:text-white">{quizItem.title}</p>
              <span className="w-fit inline-block text-sm bg-lightAccent dark:bg-darkSecondary text-white rounded-full py-0.5 px-3">
                {quizItem.genre}
              </span>
              <p className="mt-4 dark:text-white">作成日：{formatDate(quizItem.createdAt)}</p>
              <p className="mb-6 dark:text-white">問題数：{quizItem.questions.length}問</p>
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
    </>

  )
}