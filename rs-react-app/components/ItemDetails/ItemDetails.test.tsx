import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import {
  itemDetailsSlice,
  useGetItemDetailsQuery,
} from '../../slices/itemDetailsSlice';
import ItemDetails from './ItemDetails';

const mockData = {
  name: 'Luke Skywalker',
  gender: 'male',
  height: '172',
  mass: '77',
  hairColor: 'blond',
};

vi.mock('../../slices/itemDetailsSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useGetItemDetailsQuery: vi.fn(() => ({
      data: { results: mockData },
      isLoading: false,
      error: null,
    })),
  };
});

describe('ItemDetails Component', () => {
  const position = { top: 100, left: 100 };
  const mockClose = vi.fn();
  let store: EnhancedStore;
  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        [itemDetailsSlice.reducerPath]: itemDetailsSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(itemDetailsSlice.middleware),
    });
  });

  it('renders the ItemDetails component', () => {
    vi.mocked(useGetItemDetailsQuery).mockReturnValue({
      data: {
        name: 'Luke Skywalker',
        gender: 'male',
        height: '172',
        mass: '77',
        hairColor: 'blond',
      },
      error: null,
      isLoading: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemDetails url="1" onClose={mockClose} position={position} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('displays loading indicator when loading', () => {
    vi.mocked(useGetItemDetailsQuery).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemDetails url="1" onClose={mockClose} position={position} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles outside click to close the modal', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemDetails url="1" onClose={mockClose} position={position} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(mockClose).toHaveBeenCalled();
    });
  });

  it('handles close button click to close the modal', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemDetails url="1" onClose={mockClose} position={position} />
        </BrowserRouter>
      </Provider>
    );

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalled();
  });
});
