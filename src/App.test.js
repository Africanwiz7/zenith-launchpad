import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the timer to avoid waiting in tests
jest.useFakeTimers();

test('renders Zenith Launchpad title after loading', async () => {
  render(<App />);

  // Fast-forward the loading timer
  jest.advanceTimersByTime(600);

  // Wait for the loading to complete and Zenith Launchpad to appear
  await waitFor(() => {
    const titleElement = screen.getByText(/Zenith Launchpad/i);
    expect(titleElement).toBeInTheDocument();
  });
});

test('renders tech role categories after loading', async () => {
  render(<App />);

  // Fast-forward the loading timer
  jest.advanceTimersByTime(600);

  // Wait for AI button to appear
  await waitFor(() => {
    const aiButton = screen.getByText(/AI & Machine Learning/i);
    expect(aiButton).toBeInTheDocument();
  });

  // Wait for Cybersecurity button to appear
  await waitFor(() => {
    const cyberButton = screen.getByText(/Cybersecurity/i);
    expect(cyberButton).toBeInTheDocument();
  });
});

test('shows loading spinner initially', () => {
  render(<App />);

  // Should show loading spinner immediately
  const loadingText = screen.getByText(/Launching Zenith/i);
  expect(loadingText).toBeInTheDocument();
});

test('renders skip link for accessibility', async () => {
  render(<App />);

  jest.advanceTimersByTime(600);

  await waitFor(() => {
    const skipLink = screen.getByText(/Skip to main content/i);
    expect(skipLink).toBeInTheDocument();
  });
});
