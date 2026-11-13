import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the E M E R Technical Services landing page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /Specialists in Laundry & Commercial Kitchen Engineering/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /E M E R Technical Services home/i })).toBeInTheDocument();
});
