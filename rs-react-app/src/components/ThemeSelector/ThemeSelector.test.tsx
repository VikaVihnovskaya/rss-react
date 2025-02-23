import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeSelector from './ThemeSelector';
import { useTheme } from '../../context/ThemeContext';

vi.mock('../../context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeSelector Component', () => {
  it('renders the ThemeSelector component', () => {
    const mockUseTheme = vi.mocked(useTheme);
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(<ThemeSelector />);

    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('selects the light theme', () => {
    const mockToggleTheme = vi.fn();
    const mockUseTheme = vi.mocked(useTheme);
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSelector />);

    const lightRadio = screen.getByLabelText('Light') as HTMLInputElement;
    fireEvent.click(lightRadio);

    expect(lightRadio.checked).toBe(true);
  });

  it('selects the dark theme', () => {
    const mockToggleTheme = vi.fn();
    const mockUseTheme = vi.mocked(useTheme);
    mockUseTheme.mockReturnValue({
      theme: 'dark', // Set the initial theme to light
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSelector />);

    const darkRadio = screen.getByLabelText('Dark') as HTMLInputElement;
    fireEvent.click(darkRadio);

    expect(darkRadio.checked).toBe(true);
  });
});
