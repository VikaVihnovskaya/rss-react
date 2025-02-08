import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';
import ResultsList from '../ResultsList/ResultsList.tsx';

const API_BASE_URL = 'https://swapi.dev/api/films/';

interface Item {
  title: string;
  director: string;
  episode_id: number;
}

const Searcher: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData(searchTerm);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const fetchData = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = query.trim()
        ? `${API_BASE_URL}?search=${encodeURIComponent(query)}`
        : API_BASE_URL;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setItems(data.results || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={() => fetchData(searchTerm.trim())}
      />
      <ResultsList items={items} loading={loading} error={error} />
      <button
        className="error-button"
        onClick={() => {
          setError('Test Error is thrown');
          throw new Error('Test Error is thrown');
        }}
      >
        Throw Error
      </button>
    </div>
  );
};

export default Searcher;
