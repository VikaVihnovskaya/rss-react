import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import SearchBar from './SearchBar';

const mockOnSearchTermChange = vitest.fn();
const mockOnSearch = vitest.fn();

test('renders search bar with initial state', () => {
  render(
    <SearchBar
      searchTerm=""
      onSearchTermChange={mockOnSearchTermChange}
      onSearch={mockOnSearch}
    />
  );
  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  expect(screen.getByText('Search')).toBeInTheDocument();
});

test('calls onSearchTermChange when typing in input', () => {
  render(
    <SearchBar
      searchTerm=""
      onSearchTermChange={mockOnSearchTermChange}
      onSearch={mockOnSearch}
    />
  );
  fireEvent.change(screen.getByPlaceholderText('Search...'), {
    target: { value: 'New Term' },
  });
  expect(mockOnSearchTermChange).toHaveBeenCalledWith('New Term');
});

test('calls onSearch when search button is clicked', () => {
  render(
    <SearchBar
      searchTerm="Test Term"
      onSearchTermChange={mockOnSearchTermChange}
      onSearch={mockOnSearch}
    />
  );
  fireEvent.click(screen.getByText('Search'));
  expect(mockOnSearch).toHaveBeenCalled();
});

test('renders with provided searchTerm', () => {
  render(
    <SearchBar
      searchTerm="Initial Term"
      onSearchTermChange={mockOnSearchTermChange}
      onSearch={mockOnSearch}
    />
  );
  expect(screen.getByPlaceholderText('Search...')).toHaveValue('Initial Term');
});
