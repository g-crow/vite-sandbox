import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Smoke tests
describe('App', () => {
  it('renders initial state and updates result on click', () => {
    render(<App />);
    // Initial state copy
    expect(screen.getByText(/no result yet/i)).toBeInTheDocument();

    // Click the Run Code button
    fireEvent.click(screen.getByRole('button', { name: /run code/i }));

    // Result message
    expect(screen.getByText(/code executed/i)).toBeInTheDocument();
  });
});
