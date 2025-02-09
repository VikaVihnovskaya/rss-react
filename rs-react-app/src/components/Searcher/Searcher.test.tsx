import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Searcher from './Searcher';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const API_BASE_URL = 'https://swapi.dev/api/people/';
const mockResults = [
  { name: 'Luke Skywalker', gender: 'Male', url: '1' },
  { name: 'Leia Organa', gender: 'Female', url: '2' },
];

export const handlers = [
  http.get(API_BASE_URL, () => {
    return HttpResponse.json({ results: mockResults });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Searcher component with initial state', () => {
  render(
    <MemoryRouter>
      <Searcher />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders items and handles item click', async () => {
  render(
    <MemoryRouter>
      <Searcher />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Luke Skywalker'));
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('handles search', async () => {
  render(
    <MemoryRouter>
      <Searcher />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText('Search...'), {
    target: { value: 'Leia' },
  });
  fireEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });
});

test('displays error message', async () => {
  server.use(
    http.get(API_BASE_URL, () => {
      return HttpResponse.error();
    })
  );

  render(
    <MemoryRouter>
      <Searcher />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });
});
