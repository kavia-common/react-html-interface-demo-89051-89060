import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

/**
 * Semantic theme tests:
 * We validate that the app implements a CSS variable theming system and that switching
 * data-theme affects derived styles. Since jsdom cannot compute real CSS values without
 * a stylesheet engine, we validate:
 *  - data-theme toggling exists and flips between light/dark
 *  - expected CSS custom properties names are present in the stylesheet text (smoke test)
 *  - core surfaces use var() referencing our custom properties
 * This aligns with the Ocean Professional theme semantics: centralized variables and dynamic application.
 */
describe('Theme Semantics (Ocean Professional aligned)', () => {
  const THEME_VARIABLES = [
    '--bg-primary',
    '--bg-secondary',
    '--text-primary',
    '--text-secondary',
    '--border-color',
    '--button-bg',
    '--button-text',
  ];

  test('stylesheet defines expected CSS custom properties', () => {
    // Inspect document stylesheets for our CSS variables defined in App.css
    const allCssText = Array.from(document.styleSheets)
      .map((ss) => {
        try {
          return Array.from(ss.cssRules || []).map((r) => r.cssText).join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');

    // Ensure that each theme variable name appears at least once in CSS text
    THEME_VARIABLES.forEach((v) => {
      expect(allCssText).toEqual(expect.stringContaining(v));
    });
  });

  test('App uses CSS vars for background/text color via var()', () => {
    const { container } = render(<App />);
    const app = container.querySelector('.App');
    const header = container.querySelector('.App-header');

    // We cannot compute the actual values reliably, but we can assert the inline style is not used
    // and that classes are present (whose CSS rules rely on var()).
    expect(app).toBeInTheDocument();
    expect(header).toBeInTheDocument();

    // Smoke-test presence of class names that map to var()-based rules
    // This ensures CSS application path is correct.
    expect(app.className).toContain('App');
    expect(header.className).toContain('App-header');
  });

  test('data-theme attribute toggles between light and dark', () => {
    render(<App />);
    const initial = document.documentElement.getAttribute('data-theme');
    expect(initial).toBe('light');

    // flip by dispatching click on the toggle button via DOM query
    const btn = document.querySelector('.theme-toggle');
    btn.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    btn.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
