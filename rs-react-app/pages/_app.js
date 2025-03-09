// pages/_app.js
import '../styles/App.css';
import '../styles/index.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import store from '../store/store';

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <ErrorBoundary>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
  );
}

export default MyApp;
