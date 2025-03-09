'use client';

import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
}) => {
  return (
    <div className="search-bar">
      <input
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
