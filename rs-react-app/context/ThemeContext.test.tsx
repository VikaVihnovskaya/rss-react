import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => toggleTheme('light')}>Set Light Theme</button>
      <button onClick={() => toggleTheme('dark')}>Set Dark Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('provides the default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });

  it('toggles to dark theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Dark Theme'));

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
  });

  it('toggles to light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Dark Theme'));

    fireEvent.click(screen.getByText('Set Light Theme'));

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });

  it('throws an error if used outside ThemeProvider', () => {
    const consoleError = console.error;
    console.error = vi.fn();

    const renderOutsideProvider = () => render(<TestComponent />);

    expect(renderOutsideProvider).toThrow(
      'useTheme must be used within a ThemeProvider'
    );

    console.error = consoleError;
  });
});
