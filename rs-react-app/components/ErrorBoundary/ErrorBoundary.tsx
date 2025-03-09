'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
      setHasError(true);
    };

    const resetErrorBoundary = () => {
      setHasError(false);
      window.location.reload();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="error-container">
        <p>Something went wrong.</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
