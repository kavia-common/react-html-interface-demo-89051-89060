import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Backward-compatible smoke test retained at root level.
 * Comprehensive tests live under src/__tests__.
 */
test('renders the Learn React link and theme toggle', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /learn react/i })).toBeInTheDocument();
  // Button aria-label indicates next theme to switch to
  expect(
    screen.getByRole('button', { name: /switch to dark mode|switch to light mode/i })
  ).toBeInTheDocument();
});
