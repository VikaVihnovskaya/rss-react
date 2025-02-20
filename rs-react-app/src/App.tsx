import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext.tsx';
import ThemeSelector from './components/ThemeSelector/ThemeSelector.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Searcher from './components/Searcher/Searcher.tsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <ThemeSelector />
          <Routes>
            <Route path="/*" element={<Searcher />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
