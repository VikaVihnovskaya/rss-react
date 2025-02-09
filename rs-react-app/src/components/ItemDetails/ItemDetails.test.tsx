import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemDetails from './ItemDetails';
import { describe, it, expect, vi } from 'vitest';

describe('ItemDetails', () => {
  const url = 'https://swapi.dev/api/people/1/';
  const position = { top: 100, left: 100 };
  const mockOnClose = vi.fn();

  it('renders loading state initially', () => {
    render(<ItemDetails url={url} onClose={mockOnClose} position={position} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state on fetch failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Failed to load details')))
    );

    render(<ItemDetails url={url} onClose={mockOnClose} position={position} />);

    await waitFor(() =>
      expect(screen.getByText(/failed to load details/i)).toBeInTheDocument()
    );
  });

  it('renders item details on fetch success', async () => {
    const mockData = {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      mass: '77',
      hairColor: 'blond',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      )
    );

    render(<ItemDetails url={url} onClose={mockOnClose} position={position} />);

    console.log('Mock Data:', mockData);

    await waitFor(() => {
      screen.debug();
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/male/i)).toBeInTheDocument();
      expect(screen.getByText(/172/i)).toBeInTheDocument();
      expect(screen.getByText(/172/i)).toBeInTheDocument();
      expect(screen.getByText(/77/i)).toBeInTheDocument();
      expect(screen.getByText(/blond/i)).toBeInTheDocument();
    });
  });

  it('calls onClose when clicking outside the modal', async () => {
    render(<ItemDetails url={url} onClose={mockOnClose} position={position} />);

    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });

  it('calls onClose when clicking the close button', async () => {
    render(<ItemDetails url={url} onClose={mockOnClose} position={position} />);

    screen.getByText('×').click();

    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });
});
