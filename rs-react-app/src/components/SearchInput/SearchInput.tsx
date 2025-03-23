import React from 'react';

interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <input
      type="text"
      placeholder="Search countries..."
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
    />
  );
};

export default SearchInput;
