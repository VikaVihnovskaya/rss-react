import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import ResultsList, { Item } from './ResultsList';

const mockItems: Item[] = [
  { name: 'Luke Skywalker', gender: 'Male', url: '1' },
  { name: 'Leia Organa', gender: 'Female', url: '2' },
];

const mockOnItemClick = vitest.fn();

test('renders loading state', () => {
  render(
    <ResultsList
      items={[]}
      loading={true}
      error={null}
      onItemClick={mockOnItemClick}
    />
  );
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders error state', () => {
  render(
    <ResultsList
      items={[]}
      loading={false}
      error="Error loading data"
      onItemClick={mockOnItemClick}
    />
  );
  expect(screen.getByText('Error loading data')).toBeInTheDocument();
});

test('renders no results state', () => {
  render(
    <ResultsList
      items={[]}
      loading={false}
      error={null}
      onItemClick={mockOnItemClick}
    />
  );
  expect(screen.getByText('No results found.')).toBeInTheDocument();
});

test('renders items and handles item click', () => {
  render(
    <ResultsList
      items={mockItems}
      loading={false}
      error={null}
      onItemClick={mockOnItemClick}
    />
  );
  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Leia Organa')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Luke Skywalker'));
  expect(mockOnItemClick).toHaveBeenCalledWith(
    mockItems[0],
    expect.any(Object)
  );
});
