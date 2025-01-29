import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@components/Navbar/Navbar';

vi.mock('@stores/useDarkModeStore', () => ({
  default: () => ({
    darkMode: false,
    toggleDarkMode: vi.fn()
  })
}));

describe('Navbar', () => {
  it('renders logo and toggle button', () => {
    render(<Navbar />);
    expect(screen.getByText('MovieGrid')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays correct theme icon based on dark mode state', () => {
    render(<Navbar />);
    expect(screen.getByText('🌙 Dark')).toBeInTheDocument();
  });

  it('handles toggle click', () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(toggleButton).toBeInTheDocument();
  });
}); 