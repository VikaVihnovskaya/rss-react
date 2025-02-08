import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.tsx';
import ResultsList, { Item } from '../ResultsList/ResultsList.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import ItemDetails from '../ItemDetails/ItemDetails.tsx';

const API_BASE_URL = 'https://swapi.dev/api/people/';

const Searcher: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    setPage(page);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', page.toString());
      return params;
    });
    fetchData(searchTerm, page);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
    setPage(page);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', page.toString());
      return params;
    });
  }, [searchTerm, page]);

  const fetchData = async (query: string, page: number) => {
    setLoading(true);
    setError(null);

    try {
      const url = query.trim()
        ? `${API_BASE_URL}?search=${encodeURIComponent(query)}`
        : `${API_BASE_URL}?page=${encodeURIComponent(page)}`;

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', newPage.toString());
      return params;
    });
    fetchData(searchTerm, newPage);
  };

  const closeDetails = () => {
    setSelectedItem(null);
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="container">
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={() => fetchData(searchTerm.trim(), page)}
      />
      <div className="content">
        <div
          className={`left-section ${selectedItem ? 'shrink' : ''}`}
          onClick={closeDetails}
        >
          <ResultsList items={items} loading={loading} error={error} />
          <Pagination currentPage={page} onPageChange={handlePageChange} />
        </div>
        {selectedItem && (
          <div className="right-section">
            <ItemDetails url={selectedItem.url} onClose={closeDetails} />
          </div>
        )}
      </div>
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
