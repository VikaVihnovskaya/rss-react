import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ResultsList, { Item } from './ResultsList';

describe('ResultsList Component', () => {
  let items: Item[];
  let onItemClick: ReturnType<typeof vi.fn>;
  let onItemSelect: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    items = [
      { name: 'Luke Skywalker', gender: 'male', url: '1' },
      { name: 'Leia Organa', gender: 'female', url: '2' },
    ];
    onItemClick = vi.fn();
    onItemSelect = vi.fn();
  });

  it('renders the ResultsList component', () => {
    render(
      <ResultsList
        items={items}
        loading={false}
        error={null}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
        selectedItems={[]}
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
  });

  it('displays loading indicator when loading', () => {
    render(
      <ResultsList
        items={[]}
        loading={true}
        error={null}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
        selectedItems={[]}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'An error occurred';

    render(
      <ResultsList
        items={[]}
        loading={false}
        error={errorMessage}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
        selectedItems={[]}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays items when there are items', () => {
    render(
      <ResultsList
        items={items}
        loading={false}
        error={null}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
        selectedItems={[]}
      />
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('handles item click', () => {
    render(
      <ResultsList
        items={items}
        loading={false}
        error={null}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
        selectedItems={[]}
      />
    );

    const firstItem = screen.getByText('Luke Skywalker');
    fireEvent.click(firstItem);

    expect(onItemClick).toHaveBeenCalledWith(items[0], expect.any(Object));
  });

  it('handles item selection', () => {
    render(
      <ResultsList
        items={items}
        loading={false}
        error={null}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
        selectedItems={[]}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(onItemSelect).toHaveBeenCalledWith(items[0], true);
  });

  it('indicates selected items with checked checkboxes', () => {
    render(
      <ResultsList
        items={items}
        loading={false}
        error={null}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
        selectedItems={[items[0]]}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    const secondCheckbox = screen.getAllByRole('checkbox')[1];

    expect(firstCheckbox).toBeChecked();

    expect(secondCheckbox).not.toBeChecked();
  });
});
