import ThemeSelector from '../components/ThemeSelector/ThemeSelector.tsx';
import Searcher from '../components/Searcher/Searcher.tsx';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.tsx';

const Home = () => (
  <div>
    <ErrorBoundary>
      <ThemeSelector />
      <Searcher />
    </ErrorBoundary>
  </div>
);

export default Home;
