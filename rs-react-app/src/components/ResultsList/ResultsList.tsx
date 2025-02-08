import React from 'react';

export interface Item {
  name: string;
  gender: string;
  url: string;
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
        <span className="header-title">Name</span>
        <span className="header-director">Gender</span>
      </div>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.url} className="result-item">
            <span className="people-title">{item.name}</span>
            <span className="people-gender">{item.gender}</span>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultsList;
