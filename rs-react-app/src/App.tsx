import React from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Searcher from './components/Searcher/Searcher.tsx';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Searcher />
    </ErrorBoundary>
  );
};

export default App;
