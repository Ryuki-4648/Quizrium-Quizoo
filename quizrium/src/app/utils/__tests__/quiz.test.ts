import { calculateScore, getScoreMessage } from '../quiz';

describe('calculateScore', () => {
  it('正解数を正しく計算する', () => {
    const answers = [0, 1, 2];
    const correctAnswers = [0, 1, 2];
    expect(calculateScore(answers, correctAnswers)).toBe(3);
  });

  it('部分的に正解の場合も正しく計算する', () => {
    const answers = [0, 1, 1];
    const correctAnswers = [0, 1, 2];
    expect(calculateScore(answers, correctAnswers)).toBe(2);
  });

  it('全問不正解の場合は0を返す', () => {
    const answers = [1, 2, 3];
    const correctAnswers = [0, 0, 0];
    expect(calculateScore(answers, correctAnswers)).toBe(0);
  });

  it('配列の長さが異なる場合はエラーを投げる', () => {
    const answers = [0, 1];
    const correctAnswers = [0, 1, 2];
    expect(() => calculateScore(answers, correctAnswers)).toThrow(
      '回答数と問題数が一致しません'
    );
  });
});

describe('getScoreMessage', () => {
  it('満点の場合のメッセージ', () => {
    expect(getScoreMessage(5, 5)).toBe('満点です！素晴らしい！');
  });

  it('70%以上の場合のメッセージ', () => {
    expect(getScoreMessage(7, 10)).toBe('よくできました！');
  });

  it('50%以上の場合のメッセージ', () => {
    expect(getScoreMessage(5, 10)).toBe('合格です！');
  });
  
  it('50%未満の場合のメッセージ', () => {
    expect(getScoreMessage(4, 10)).toBe('もう一度チャレンジしてみましょう！');
  });
});