import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';
import { describe, it, expect, vi } from 'vitest';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the current page number', () => {
    render(<Pagination currentPage={2} onPageChange={mockOnPageChange} />);
    expect(screen.getByText(/page 2/i)).toBeInTheDocument();
  });

  it('disables the "Previous" button on the first page', () => {
    render(<Pagination currentPage={1} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('enables the "Previous" button when not on the first page', () => {
    render(<Pagination currentPage={2} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled();
  });

  it('calls onPageChange with the previous page number when "Previous" button is clicked', () => {
    render(<Pagination currentPage={2} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with the next page number when "Next" button is clicked', () => {
    render(<Pagination currentPage={2} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('enables the "Next" button when not on the last page', () => {
    render(<Pagination currentPage={2} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
  });
});
