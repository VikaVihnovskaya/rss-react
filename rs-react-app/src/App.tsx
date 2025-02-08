import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Searcher from './components/Searcher/Searcher.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Searcher />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
