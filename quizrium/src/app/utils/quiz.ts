export function calculateScore(answers: number[], correctAnswers: number[]): number {
  if (answers.length !== correctAnswers.length) {
    throw new Error('回答数と問題数が一致しません');
  }
  return answers.reduce((score, answer, index) => {
    return score + (answer === correctAnswers[index] ? 1 : 0);
  }, 0);
}

export function getScoreMessage(score: number, total: number): string {
  const percentage = (score / total) * 100;
  if (percentage === 100) return '満点です！素晴らしい！';
  if (percentage >= 70) return 'よくできました！';
  if (percentage >= 50) return '合格です！';
  return 'もう一度チャレンジしてみましょう！';
}