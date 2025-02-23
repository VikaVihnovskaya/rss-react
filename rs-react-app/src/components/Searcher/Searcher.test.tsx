import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { itemSlice } from '../../slices/itemsSlice';
import { itemDetailsSlice } from '../../slices/itemDetailsSlice.ts';
import Searcher from './Searcher';

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
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [itemSlice.reducerPath]: itemSlice.reducer,
        [itemDetailsSlice.reducerPath]: itemDetailsSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          itemSlice.middleware,
          itemDetailsSlice.middleware
        ),
    });
  });

  it('renders Searcher component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Searcher />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('updates search term', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Searcher />
        </BrowserRouter>
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
        <BrowserRouter>
          <Searcher />
        </BrowserRouter>
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
