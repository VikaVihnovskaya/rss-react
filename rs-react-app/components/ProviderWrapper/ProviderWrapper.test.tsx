import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import React from 'react';
import ProviderWrapper from './ProviderWrapper';

describe('ProviderWrapper', () => {
    it('renders children within the Provider and ThemeProvider', () => {
        render(
            <ProviderWrapper>
                <div>Child Component</div>
            </ProviderWrapper>
        );


        expect(screen.getByText('Child Component')).toBeInTheDocument();
    });
});
