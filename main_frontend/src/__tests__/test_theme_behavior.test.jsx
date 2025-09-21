import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

/**
 * Tests focus on theme behavior:
 * - Initial theme is light
 * - Toggling switches to dark and back
 * - aria-label text updates accordingly
 * - documentElement data-theme attribute reflects current theme
 */
describe('Theme Toggle Behavior', () => {
  function getDocumentTheme() {
    return document.documentElement.getAttribute('data-theme');
  }

  test('initial theme is light and aria-label suggests switching to dark', () => {
    render(<App />);

    // Initial theme should be applied to the document root
    expect(getDocumentTheme()).toBe('light');

    // Button label indicates the next action (switch to dark)
    const toggleBtn = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggleBtn).toBeInTheDocument();

    // UI text shows current theme
    expect(screen.getByText(/current theme:/i)).toHaveTextContent(/light/i);
  });

  test('clicking toggle switches theme to dark and updates aria-label and UI', () => {
    render(<App />);
    const toggleBtn = screen.getByRole('button', { name: /switch to dark mode/i });

    // Perform toggle
    fireEvent.click(toggleBtn);

    // Data attribute should switch
    expect(getDocumentTheme()).toBe('dark');

    // Button now should indicate switching back to light
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();

    // UI text shows current theme
    expect(screen.getByText(/current theme:/i)).toHaveTextContent(/dark/i);
  });

  test('toggling twice returns to light theme', () => {
    render(<App />);
    const toDark = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(toDark);
    const toLight = screen.getByRole('button', { name: /switch to light mode/i });
    fireEvent.click(toLight);

    expect(getDocumentTheme()).toBe('light');
    expect(screen.getByText(/current theme:/i)).toHaveTextContent(/light/i);
  });
});
