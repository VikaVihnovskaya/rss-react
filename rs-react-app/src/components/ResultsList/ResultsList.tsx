import React from 'react';

interface Item {
  title: string;
  director: string;
  episode_id: number;
}

interface ResultsListProps {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const ResultsList: React.FC<ResultsListProps> = ({ items, loading, error }) => {
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="results-container">
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
  );
};

export default ResultsList;
