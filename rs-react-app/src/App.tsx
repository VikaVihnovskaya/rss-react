import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'https://swapi.dev/api/films/';

interface Item {
  title: string;
  director: string;
  episode_id: number;
}

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleReset = () => {
    setHasError(false);
    window.location.reload();
  };

  return hasError ? (
      <div className="error-container">
        <p>Something went wrong.</p>
        <button onClick={handleReset}>Reload</button>
      </div>
  ) : (
      <React.Fragment>
        {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement, { onError: setHasError })
        )}
      </React.Fragment>
  );
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData(searchTerm);
  }, []); // Fetch data once on mount

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]); // Save search term whenever it changes

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
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData(searchTerm.trim());
  };

  return (
      <ErrorBoundary>
        <div className="container">
          <div className="search-bar">
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="results-container">
            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div>
                  <div className="result-header">
                    <span className="header-title">Movie Title</span>
                    <span className="header-director">Director</span>
                  </div>
                  {items.length > 0 ? (
                      items.map((item) => (
                          <div key={item.episode_id} className="result-item">
                            <span className="movie-title">{item.title}</span>
                            <span className="movie-director">({item.director})</span>
                          </div>
                      ))
                  ) : (
                      <p>No results found.</p>
                  )}
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
      </ErrorBoundary>
  );
};

export default App;
