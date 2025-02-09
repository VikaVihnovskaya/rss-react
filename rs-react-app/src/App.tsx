import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Searcher from './components/Searcher/Searcher.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/*" element={<Searcher />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
