import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import React from 'react';

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children without error', () => {
    render(
        <ErrorBoundary>
          <div>Child Component</div>
        </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it.skip('resets error state and reloads page when reload button is clicked', () => {
    const ThrowError = () => {
      throw new Error('Test Error');
    };

    render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
    );

    const reloadButton = screen.getByText('Reload');
    expect(reloadButton).toBeInTheDocument();


    const reloadMock = vi.fn();
    vi.spyOn(window.location, 'reload').mockImplementation(reloadMock);

    fireEvent.click(reloadButton);
    expect(reloadMock).toHaveBeenCalled();
  });
});
