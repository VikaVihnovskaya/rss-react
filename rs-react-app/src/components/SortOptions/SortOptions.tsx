import React from 'react';

interface SortOptionsProps {
  sortOption: string;
  onSortOptionChange: (option: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortOption, onSortOptionChange }) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => onSortOptionChange(e.target.value)}
    >
      <option value="">No Sorting</option>
      <option value="name-asc">Sort by Name (A-Z)</option>
      <option value="name-desc">Sort by Name (Z-A)</option>
      <option value="population-asc">Sort by Population (Low to High)</option>
      <option value="population-desc">Sort by Population (High to Low)</option>
    </select>
  );
};

export default SortOptions;
