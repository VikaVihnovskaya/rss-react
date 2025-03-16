import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import Main from './components/mainPage.tsx';
import UncontrolledForm from './forms/UncontrolledForm/UncontrolledForm.tsx';
import ReactHookForm from './forms/ReactHookForm/ReactHookForm.tsx';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/uncontrolled">Uncontrolled Form</Link>
          <Link to="/hook-form">Hook Form</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/uncontrolled" element={<UncontrolledForm />} />
          <Route path="/hook-form" element={<ReactHookForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
