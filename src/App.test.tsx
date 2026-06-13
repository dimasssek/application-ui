import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { AppThemeProvider } from './theme/AppThemeProvider';

function renderApp() {
  return render(
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  );
}

test('renders main menu with BSPS sections', () => {
  renderApp();
  expect(
    screen.getByRole('heading', { name: /главное меню/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/ведение базы данных/i)).toBeInTheDocument();
  expect(screen.getByText(/обработка заявлений/i)).toBeInTheDocument();
  expect(screen.getByText(/отчёты и статистика/i)).toBeInTheDocument();
});

test('navigates to section from main menu tile', async () => {
  renderApp();

  const tiles = screen.getAllByRole('button', {
    name: /обработка заявлений/i,
  });
  userEvent.click(tiles[0]);

  expect(
    await screen.findByText(/раздел в разработке/i)
  ).toBeInTheDocument();
});
