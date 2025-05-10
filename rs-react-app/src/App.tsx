import React from 'react';
import './App.css';

const API_BASE_URL = 'https://swapi.dev/api/films/';
const API_SEARCH_URL = 'https://swapi.dev/api/films/?search';

interface Item {
  title: string;
  director: string;
  episode_id: number;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <p>Something went wrong.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

class App extends React.Component<
  unknown,
  { searchTerm: string; items: Item[]; loading: boolean; error: string | null }
> {
  constructor(props: unknown) {
    super(props);
    const savedSearch = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearch,
      items: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData(this.state.searchTerm);
  }

  fetchData = async (query: string) => {
    this.setState({ loading: true, error: null });
    try {
      const searchQuery = query.trim();
      let response;
      if (searchQuery == '') {
        response = await fetch(`${API_BASE_URL}`);
      } else {
        response = await fetch(`${API_SEARCH_URL}=${searchQuery}`);
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      } else {
        const data = await response.json();
        const items: Item[] = data.results as Item[];
        this.setState({
          searchTerm: query.trim(),
          items: items,
          error: null,
          loading: false,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        this.setState({ error: err.message });
      } else {
        this.setState({ error: 'An unknown error occurred' });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = () => {
    const trimmedSearch = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedSearch);
    this.fetchData(trimmedSearch);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="container">
          <div className="search-bar">
            <input
              value={this.state.searchTerm}
              onChange={this.handleChange}
              placeholder="Search..."
            />
            <button onClick={this.handleSearch}>Search</button>
          </div>
          <div className="results-container">
            {this.state.loading ? (
              <div className="loading">Loading...</div>
            ) : this.state.error ? (
              <div className="error">{this.state.error}</div>
            ) : (
              <div>
                <div className="result-header">
                  <span className="header-title">Movie Title</span>
                  <span className="header-director">Director</span>
                </div>
                {this.state.items.length > 0 ? (
                  this.state.items.map((item) => (
                    <div key={item.episode_id} className="result-item">
                      <span className="movie-title">{item.title}</span>
                      <span className="movie-director">({item.director})</span>
                    </div>
                  ))
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            )}
          </div>
          <button
            className="error-button"
            onClick={() => {
              try {
                throw new Error('Test Error is thrown');
              } catch (error) {
                console.error('Caught error:', error);
                this.setState({ error: 'An test error is thrown.' });
              }
            }}
          >
            Throw Error
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
