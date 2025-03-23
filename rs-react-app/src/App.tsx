import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import CountrySearcher from './components/CountrySearcher/CountrySearcher.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<CountrySearcher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
