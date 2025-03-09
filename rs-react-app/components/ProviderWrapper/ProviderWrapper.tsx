'use client';
import { Provider } from 'react-redux';
import store from '../../store/store';
import React from 'react';
import { ThemeProvider } from '../../context/ThemeContext';

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
