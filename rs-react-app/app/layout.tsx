import '../styles/App.css';
import '../styles/index.css';
import ProviderWrapper from '../components/ProviderWrapper/ProviderWrapper.tsx';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <ProviderWrapper>{children}</ProviderWrapper>
        </div>
      </body>
    </html>
  );
}
