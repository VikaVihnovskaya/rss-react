import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Searcher from './Searcher';
import { Provider } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetItemsQuery } from '../../slices/itemsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { itemSlice } from '../../slices/itemsSlice';
import { itemDetailsSlice } from '../../slices/itemDetailsSlice.ts';


vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

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
  let mockRouter;
  let mockSearchParams;
  let store;
  beforeEach(() => {
    mockRouter = {
      push: vi.fn(),
    };
    store = configureStore({
      reducer: {
        [itemSlice.reducerPath]: itemSlice.reducer,
        [itemDetailsSlice.reducerPath]: itemDetailsSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(itemSlice.middleware, itemDetailsSlice.middleware),
    });
    mockSearchParams = new URLSearchParams('?page=1');

    useRouter.mockReturnValue(mockRouter);
    useSearchParams.mockReturnValue(mockSearchParams);
    useGetItemsQuery.mockReturnValue({ data: { results: mockResults }, isLoading: false, error: null });
  });


  it.skip('renders Searcher component', () => {
    render(
        <Provider store={store}>
          <Searcher />
        </Provider>

    );
    // expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.textContent?.includes('Search');
    })).toBeInTheDocument();
  });

  it.skip('updates search term', () => {
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

  it.skip('handles item selection', () => {
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
