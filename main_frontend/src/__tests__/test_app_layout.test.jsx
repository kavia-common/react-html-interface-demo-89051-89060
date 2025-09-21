import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

/**
 * Integration tests verifying the SPA layout renders correctly:
 * - Header container exists and contains key elements
 * - Main content presence is validated by copy/CTA
 * - Footer semantics (we don't have a dedicated <footer>, so we verify external link text)
 */
describe('App Layout Rendering', () => {
  test('renders the root app container', () => {
    const { container } = render(<App />);
    const appRoot = container.querySelector('.App');
    expect(appRoot).toBeInTheDocument();
  });

  test('renders the header container and core UI elements', () => {
    const { container } = render(<App />);
    const header = container.querySelector('.App-header');
    expect(header).toBeInTheDocument();

    // Toggle button should be present with accessible label
    const toggleBtn = screen.getByRole('button', { name: /switch to dark mode|switch to light mode/i });
    expect(toggleBtn).toBeInTheDocument();

    // Logo image
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();

    // Learn React link acting as a footer-like external link in single-page template
    const learnLink = screen.getByRole('link', { name: /learn react/i });
    expect(learnLink).toHaveAttribute('href', 'https://reactjs.org');
  });

  test('renders copy that references the main content', () => {
    render(<App />);
    // This serves as our "main content" copy for the single-page template
    expect(screen.getByText(/edit .*src\/App\.js.* and save to reload\./i)).toBeInTheDocument();
    expect(screen.getByText(/current theme:/i)).toBeInTheDocument();
  });
});
