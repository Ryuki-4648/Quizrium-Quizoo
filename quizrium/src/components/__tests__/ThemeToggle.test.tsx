import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ThemeToggle from '../ThemeToggle';
import themeReducer from '@/lib/features/theme/themeSlice';

// テスト用のストアを作成
function renderWithProviders(component: React.ReactElement) {
  const store = configureStore({
    reducer: {
      theme: themeReducer,
    },
  });

  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
}

describe('ThemeToggle', () => {
  it('ボタンが表示される', () => {
    renderWithProviders(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'ダークモード切り替え' });
    expect(button).toBeInTheDocument();
  });
  /*
    テストコードと実際のコードで「ダークモード切り替え」の文言が異なると、テスト時に
    Unable to find an accessible element with the role "button" and name "ダークモード切替"
    のエラーが発生する。表記揺れでボタンが見つからず、テストが落ちる。
  */

  it('クリックでダークモードが切り替わる', () => {
    renderWithProviders(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'ダークモード切り替え' });

    // 初期状態では月アイコン（SVGの一部）が表示される
    expect(screen.getByRole('button')).toBeInTheDocument();

    // クリック後はHTMLクラスが追加される
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // 再度クリックすると元に戻る
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
