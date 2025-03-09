import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { itemSlice } from '../../slices/itemsSlice';
import { itemDetailsSlice } from '../../slices/itemDetailsSlice.ts';
import { useRouter } from 'next/router'
import Searcher from './Searcher';
import '@testing-library/jest-dom';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockResults = [
  { name: 'Luke Skywalker', gender: 'Male', url: '1' },
  { name: 'Leia Organa', gender: 'Female', url: '2' },
];

vi.mock('../../slices/itemsSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useGetItemsQuery: vi.fn(() => ({
      data: { results: mockResults },
      isLoading: false,
      error: null,
    })),
  };
});

describe('Searcher Component', () => {
  let store;
  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        [itemSlice.reducerPath]: itemSlice.reducer,
        [itemDetailsSlice.reducerPath]: itemDetailsSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(itemSlice.middleware, itemDetailsSlice.middleware),
    });
    vi.mocked(useRouter).mockReturnValue({
      query: { page: '1' },
      replace: vi.fn(),
    });
  });

  it('renders Searcher component', () => {
    render(
        <Provider store={store}>
          <Searcher />
        </Provider>
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('updates search term', () => {
    render(
        <Provider store={store}>
          <Searcher />
        </Provider>
    );

    const searchInput = screen.getByPlaceholderText(
      'Search...'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });

    expect(searchInput.value).toBe('Luke Skywalker');
  });

  it('handles item selection', () => {
    render(
        <Provider store={store}>
          <Searcher />
        </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
