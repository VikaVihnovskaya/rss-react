import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { describe, it, expect } from 'vitest';

describe('NotFoundPage', () => {
  it('renders 404 message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 - Page Not Found!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The page you are looking for does not exist./i)
    ).toBeInTheDocument();
  });

  it('renders link to home page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('link', { name: /Go Back to Home/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Go Back to Home/i })
    ).toHaveAttribute('href', '/');
  });
});
