import quizReducer, {
  startQuiz,
  setAnswer,
  nextQuestion,
  resetQuiz
} from '../quizSlice';

describe('quizSlice', () => {
  const initialState = {
    currentQuestionIndex: 0,
    answers: [],
    quizId: null,
  };

  it('初期状態を返す', () => {
    expect(quizReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('クイズを開始できる', () => {
    const actual = quizReducer(initialState, startQuiz({
      quizId: 1,
      questionCount: 3
    }));
    expect(actual.quizId).toEqual(1);
    expect(actual.answers).toEqual([-1, -1, -1]);
    expect(actual.currentQuestionIndex).toEqual(0);
  });

  it('回答を記録できる', () => {
    const startedState = {
      currentQuestionIndex: 0,
      answers: [-1, -1, -1],
      quizId: 1,
    };
    const actual = quizReducer(startedState, setAnswer({
      questionIndex: 0,
      selectedOptionIndex: 2
    }));
    expect(actual.answers[0]).toEqual(2);
  });

  it('次の問題へ進める', () => {
    const state = {
      currentQuestionIndex: 0,
      answers: [1, -1, -1],
      quizId: 1,
    };
    const actual = quizReducer(state, nextQuestion());
    expect(actual.currentQuestionIndex).toEqual(1);
  });

  it('クイズをリセットできる', () => {
    const state = {
      currentQuestionIndex: 2,
      answers: [1, 0, 2],
      quizId: 1,
    };
    const actual = quizReducer(state, resetQuiz());
    expect(actual).toEqual(initialState);
  });
});

describe('quizSlice', () => {
  const initialState = {
    currentQuestionIndex: 0,
    answers: [],
    quizId: null,
  };

  it('初期状態を返す', () => {
    expect(quizReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('クイズを開始できる', () => {
    const actual = quizReducer(initialState, startQuiz({
      quizId: 1,
      questionCount: 3
    }));
    expect(actual.quizId).toEqual(1);
    expect(actual.answers).toEqual([-1, -1, -1]);
    expect(actual.currentQuestionIndex).toEqual(0);
  });

  it('回答を記録できる', () => {
    const startedState = {
      currentQuestionIndex: 0,
      answers: [-1, -1, -1],
      quizId: 1,
    };
    const actual = quizReducer(startedState, setAnswer({
      questionIndex: 0,
      selectedOptionIndex: 2
    }));
    expect(actual.answers[0]).toEqual(2);
  });
});
