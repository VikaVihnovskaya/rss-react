import ThemeSelector from '../components/ThemeSelector/ThemeSelector';
import Searcher from '../components/Searcher/Searcher';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const Home = () => (
  <div>
    <ErrorBoundary>
      <ThemeSelector />
      <Searcher />
    </ErrorBoundary>
  </div>
);

export default Home;
