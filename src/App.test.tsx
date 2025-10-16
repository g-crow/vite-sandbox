import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders and updates result on click', () => {
    render(<App />);
    expect(screen.getByText(/Waiting for instructions/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Run Example/i }));
    expect(screen.getByText(/Button clicked/i)).toBeInTheDocument();
  });
});
