import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Smoke tests
describe('App', () => {
  it('renders initial state and updates result on click', () => {
    render(<App />);
    expect(screen.getByText(/result displays here/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /run code!/i }));
    expect(screen.getByText(/button clicked!/i)).toBeInTheDocument();
  });
});
