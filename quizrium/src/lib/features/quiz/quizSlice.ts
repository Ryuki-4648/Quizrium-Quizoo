import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  currentQuestionIndex: number; // 現在の問題のインデックス
  answers: number[]; // ユーザーの回答履歴
  quizId: number | null; // 現在のクイズのID
}

interface StartQuizPayload {
  quizId: number; // クイズのID
  questionCount: number; // クイズの問題数
}

interface AnswerPayload {
  questionIndex: number; // 回答する問題のインデックス
  selectedOptionIndex: number; // 選択されたオプションのインデックス
}

// 初期状態
const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: [],
  quizId: null,
};

// Sliceの作成
export const quizSlice = createSlice({
  name: 'quiz', // スライスの名前を指定、状態の名前
  initialState, // 初期状態
  reducers: { // 状態を変更するための関数（リデューサー）を定義。関数名はそのままアクション名となり、対応するアクションタイプも自動的に生成される
    // TODO: クイズを開始する
    startQuiz: (state, action: PayloadAction<StartQuizPayload>) => {
      // クイズIDを設定
      // 回答配列を初期化（ヒント: -1で埋めた配列）
      // currentQuestionIndexを0に
      state.quizId = action.payload.quizId;
      state.answers = Array(action.payload.questionCount).fill(-1); // -1で初期化
      state.currentQuestionIndex = 0;
    },

    // TODO: 回答を記録する
    setAnswer: (state, action: PayloadAction<AnswerPayload>) => {
      // answers配列の適切な位置に回答を保存
      state.answers[action.payload.questionIndex] = action.payload.selectedOptionIndex;
      // currentQuestionIndexを更新
      state.currentQuestionIndex += 1; // 次の問題へ進む
      if (state.currentQuestionIndex >= state.answers.length) {
        state.currentQuestionIndex = state.answers.length - 1; // 最後の問題に留まる
      }
    },

    // TODO: 次の問題へ進む
    nextQuestion: (state) => {
      // currentQuestionIndexを増やす
      state.currentQuestionIndex += 1;
    },

    // TODO: クイズをリセット
    resetQuiz: (state) => {
      // 初期状態に戻す
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.quizId = null;
    }
  },
})

// 定義されたリデューサーに対応するアクションをエクスポート
export const { startQuiz, setAnswer, nextQuestion, resetQuiz } = quizSlice.actions;

// Reduxストアに登録するためのリデューサーをエクスポート
export default quizSlice.reducer;


/**
 * Redux Toolkit
 * Sliceを使用して、クイズの状態管理を行う。
 * createSlice: 状態管理を簡単に行うための主要な機能。アクションとリデューサーを同時に定義できる。
 */