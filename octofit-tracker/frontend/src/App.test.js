import { render, screen } from '@testing-library/react';
import App from './App';

test('renders octofit tracker home screen', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /octofit tracker/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /witamy w/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /activities/i })).toBeInTheDocument();
});
